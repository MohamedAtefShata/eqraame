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
 * @desc  register user to database
 */
router.get(
  // path
  "/teacher",
  UserController.getAllTeachers
);

module.exports = router;
