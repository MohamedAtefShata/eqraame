const auth = require("../../middlewares/auth");
const User = require("../../models/User.model");

const router = require("express").Router();
const { check, validationResult } = require("express-validator");

//@route  GET api/auth
//@desc   check authentication for user and return user data if valid auth
//@access public
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

module.exports = router;
