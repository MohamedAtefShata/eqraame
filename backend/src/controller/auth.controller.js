const User = require("../models/User.model");
const BadRequestError = require("../utils/BadRequestError");

const getUserData = async (req, res, next) => {
  try {
    let user = req.user;

    user = await User.findById(user.id).select("-password");
    if (!user) throw new BadRequestError("Token is not valid.", 401);

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne().byEmail(email);

    // check email/password
    let valid = true;
    if (!user) valid = false;
    else valid = await user.comparePassword(password);

    if (!valid) throw new BadRequestError("invalid email or password.", 401);

    return res.json({ msg: "login succuffuly", token: user.getToken() });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserData, authUser };
