/**
 * user route
 * @route /user
 * @author Mahmoud Atef
 */

const router = require("express").Router();
const {
  checkUserRegistration,
  validateCheckers,
} = require("../../middlewares/cheakers");
const User = require("../../models/User.model");
const userService = require("../../services/user.service");
const UserController = require("../../controller/user.controller");

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
module.exports = router;
