/**
 * Authentication rout
 * @route /auth
 * @author Mahmoud Atef
 */

const auth = require("../../middlewares/auth");
const User = require("../../models/User.model");

const router = require("express").Router();
const { checkLogin, validateCheckers } = require("../../middlewares/cheakers");

/**
 * @route  GET api/auth
 * @desc   check authentication for user and return user data if valid auth
 * @access public
 */
router.get("/", auth, async (req, res) => {
  try {
    let user = req.user;

    user = await User.findById(user.id).select("-password");
    if (!user)
      return res.status(401).json({ errors: [{ msg: "Token is not valid." }] });

    res.json({ user });
  } catch (error) {
    console.log("error in auth route", error.message);
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

      let valid = true;
      if (!user) valid = false;
      else {
        let isMatch = await user.comparePassword(password);
        if (!isMatch) valid = false;
      }
      if (!valid)
        return res
          .status(401)
          .json({ errors: [{ msg: "invalid email or password" }] });

      return res.json({ msg: "login succuffuly", token: user.getToken() });
    } catch (error) {
      console.log("error in auth route", error.message);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
