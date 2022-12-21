/**
 * Authentication rout
 * @route /auth
 * @author Mahmoud Atef
 */

const auth = require("../../middlewares/auth");
const User = require("../../models/User.model");

const router = require("express").Router();
const { checkLogin, validateCheckers } = require("../../middlewares/cheakers");
const BadRequestError = require("../../utils/BadRequestError");

/**
 * @route  GET api/auth
 * @desc   check authentication for user and return user data if valid auth
 * @access public
 */
router.get("/", auth, async (req, res) => {
  try {
    let user = req.user;

    user = await User.findById(user.id).select("-password");
    if (!user) throw new BadRequestError("Token is not valid.", 401);

    res.json({ user });
  } catch (error) {
    if (err.name === "BadRequest") return res.status(err.status).json(err.json);

    console.log(
      "error in get auth route : ",
      `< ${error.name} >:${error.message}`
    );
    return res.status(500).json({ msg: "server error" });
  }
});

/**
 * @route  POST api/auth
 * @desc   create authentication for login
 * @access public
 */
router.post(
  "/",
  /*****  checkers *****/
  checkLogin,
  validateCheckers,
  /****  response handler *****/
  async (req, res) => {
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
      if (err.name === "BadRequest")
        return res.status(err.status).json(err.json);

      console.log(
        "error in post auth route : ",
        `< ${error.name} >:${error.message}`
      );
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
