const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User.model");

//@route POST /api/user
//@desc  register user to database
//@acess public
router.post(
  // path
  "/",

  /*****  checkers *****/
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is require")
    .not()
    .matches(/\d/)
    .withMessage("Name must not contains number")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 character"),

  check("email")
    .trim()
    .isEmail()
    .withMessage("Invaild E-mail")
    .custom(async (value) => {
      try {
        let user = await User.findOne().byEmail(value);
        if (user) return Promise.reject("E-mail is already used");
        return Promise.resolve(true);
      } catch (err) {
        console.log("error in check email used :", err);
        return Promise.reject("Server error");
      }
    }),

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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(401).json({ errors: errors.array() });

    res.send("good request");
  }
);

module.exports = router;
