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
    try {
      const { name, email, password, birthdate, role, avatar } = req.body;

      let user = new User({ name, email, password, role });

      if (birthdate) user.birthdate = birthdate;
      if (avatar) user.avatar = avatar;

      // register user transaction
      await userService.register(user);

      // response by token
      const token = user.getToken();
      res.json({ msg: "user register succufully", token });
    } catch (error) {
      // if error caused by request
      if (error.name == "BadRequest")
        return res.status(401).json({ errors: [{ msg: error.message }] });

      // if error happen in server
      console.log(
        "error in creaet user :",
        `< ${error.name} >:${error.message}`
      );
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
