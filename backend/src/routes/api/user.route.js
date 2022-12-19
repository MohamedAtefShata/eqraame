/**
 * user rout
 * @user /auth
 * @author Mahmoud Atef
 */

const router = require("express").Router();
const {
  checkUserRegistration,
  validateCheckers,
} = require("../../middlewares/cheakers");
const User = require("../../models/User.model");
const userService = require("../../services/user.service");

/**
 * @route POST /api/user/register
 * @acess public
 * @desc  register user to database
 */
router.post(
  // path
  "/register",

  /*****  checkers *****/
  checkUserRegistration,
  // validate chekers is passed
  validateCheckers,
  /******** Response handling ********/
  async (req, res) => {
    const { name, email, password, birthdate, role, avatar } = req.body;

    try {
      // check if email is used
      let user = await User.findOne().byEmail(email);
      if (user)
        return res
          .status(401)
          .json({ errors: [{ msg: "Email is already used", param: "email" }] });

      user = new User({ name, email, password, role });
      await user.encryptPassword();

      if (birthdate) user.birthdate = new Date(birthdate);
      if (avatar) user.avatar = avatar;

      // await user.save();

      // register user transaction
      await userService.register(user);

      const token = user.getToken();

      res.json({ msg: "user register succufully", token });
    } catch (error) {
      console.log("error in creaet user :", error.message);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
