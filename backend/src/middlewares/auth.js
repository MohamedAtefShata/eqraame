/**
 * auth middleware
 * @desc middlerware for verify authentication
 * @author Mahmoud Atef
 */

const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/config");
const BadRequestError = require("../utils/BadRequestError");

module.exports = async function (req, res, next) {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      throw new BadRequestError("No token , Authentcation denided.", 401);

    const decode = jwt.verify(token, JWT_SECRET_KEY);

    user = await User.findById(decode.user.id).select("-password");

    if (!user) throw new BadRequestError("Token is not valid.", 401);

    req.user = decode.user;
    next();
  } catch (err) {
    if (
      err.name === "JsonWebTokenError" ||
      err.name === "TokenExpiredError" ||
      err.kind == "ObjectId"
    )
      err = new BadRequestError("Token is not valid.", 401);

    if (err.name === "BadRequest") return res.status(err.status).json(err.json);

    console.log("error in authntication", `< ${err.name} >:${err.message}`);
    return res.status(500).json({ msg: "server error" });
  }
};
