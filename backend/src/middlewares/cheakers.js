/**
 * checkers middleware
 * @desc this file contains checker needed to check request and validate
 *       function to validate them and a group checkers for custom request to
 *       use it
 * @author Mahmoud Atef
 */

const { check, validationResult } = require("express-validator");

const checkName = () => {
  return check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is require")
    .escape()
    .matches(/^[a-zA-Z\s\.\-]+$/g)
    .withMessage("Invalid name (use only letters , white space and (. or -))")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 character");
};

const checkEmail = () => {
  return check("email").trim().isEmail().withMessage("Invaild E-mail");
};

const checkPassword = () => {
  return check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 50 })
    .withMessage(
      "password must be at least 8 characters and at most 50 character"
    )
    .matches(/\d/)
    .withMessage("password must contain number");
};

const checkPasswordConfirmation = () => {
  return check(
    "confirm-password",
    "confirm password is not match password"
  ).custom((value, { req }) => value === req.body.password);
};

const checkRole = () => {
  return check("role")
    .trim()
    .custom(
      (value) => !value || ["student", "teacher", "admin"].includes(value)
    )
    .withMessage("invalid role propartey");
};

/**
 * @desc validate middle ware to check if all checker passed or not
 * @author Mahmoud Atef
 */
const validateCheckers = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(401).json({ errors: errors.array() });
  next();
};

const checkUserRegistration = [
  checkName(),
  checkEmail(),
  checkPassword(),
  checkPasswordConfirmation(),
  checkRole(),
];
const checkLogin = [
  checkEmail,
  check("password", "Password is required").not().isEmpty(),
];

module.exports = {
  checkName,
  checkEmail,
  checkPassword,
  checkPasswordConfirmation,
  checkRole,
  checkUserRegistration,
  checkLogin,
  validateCheckers,
};
