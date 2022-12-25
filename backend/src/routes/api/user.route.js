/**
 * user route
 * @route /user
 * @author Mahmoud Atef
 */

const router = require("express").Router();
const {
  checkUserRegistration,
  validateCheckers,
  checkPassword,
  checkPasswordConfirmation,
  checkRequire,
} = require("../../middlewares/cheakers");
const User = require("../../models/User.model");
const userService = require("../../services/user.service");
const UserController = require("../../controller/user.controller");
const auth = require("../../middlewares/auth");

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
  validateCheckers,
  UserController.addUser
);

/**
 * @route GET /api/user/teacher
 * @acess public
 * @desc  get all teachers
 */
router.get(
  // path
  "/teacher",
  UserController.getAllTeachers
);

/**
 * @route GET /api/user/teacher/:id
 * @acess public
 * @desc  get teacher by id
 */
router.get(
  // path
  "/teacher/:id",
  UserController.getTeacherByID
);

/**
 * @route POST /api/user/changepassword
 * @acess public
 * @desc  get teacher by id
 */
router.post(
  // path,
  "/changepassword",
  auth,
  checkPassword(),
  checkPasswordConfirmation(),
  checkRequire("old-password"),
  validateCheckers,
  UserController.changePassword
);
module.exports = router;
