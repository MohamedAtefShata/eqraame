/**
 * user rout
 * @user /auth
 * @author Mahmoud Atef
 */

const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User.model");
const registerUser = require("../../services/register-user");

/**
 * @route POST /api/user/register
 * @acess public
 * @desc  register user to database
 */
router.post(
  // path
  "/register",

  /*****  checkers *****/
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is require")
    .escape()
    .matches(/^[a-zA-Z\s\.\-]+$/g)
    .withMessage("Invalid name (use only letters , white space and (. or -))")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 character"),

  check("email").trim().isEmail().withMessage("Invaild E-mail"),

  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 50 })
    .withMessage(
      "password must be at least 8 characters and at most 50 character"
    )
    .matches(/\d/)
    .withMessage("password must contain number"),
  check("confirm-password", "confirm password is not match password").custom(
    (value, { req }) => value === req.body.password
  ),

  check("role")
    .trim()
    .custom(
      (value) => !value || ["student", "teacher", "admin"].includes(value)
    )
    .withMessage("invalid role propartey"),
  /******** Response handling ********/
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(401).json({ errors: errors.array() });

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
      await registerUser(user);

      const token = user.getToken();

      res.json({ msg: "user register succufully", token });
    } catch (error) {
      console.log("error in creaet user :", error.message);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
