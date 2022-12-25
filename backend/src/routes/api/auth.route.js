/**
 * Authentication rout
 * @route /auth
 * @author Mahmoud Atef
 */

const auth = require("../../middlewares/auth");
const User = require("../../models/User.model");

const router = require("express").Router();
const { checkLogin, validateCheckers } = require("../../middlewares/cheakers");
const BadRequestError = require("../../utils/BadRequestError");
const AuthController = require("../../controller/auth.controller");

/**
 * @route  GET api/auth
 * @desc   check authentication for user and return user data if valid auth
 * @access public
 */
router.get("/", auth, AuthController.getUserData);

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
  AuthController.authUser
);

module.exports = router;
