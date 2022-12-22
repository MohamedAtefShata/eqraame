/**
 * user rout
 * @user /auth
 * @author Mahmoud Atef
 */

const auth = require("../../middlewares/auth");
const checkTeacherRole = require("../../middlewares/checkTeacherRole");
const { checkCourse, validateCheckers } = require("../../middlewares/cheakers");
const CourseController = require("../../controller/course.controller");
const router = require("express").Router();

/**
 * @route GET /api/course
 * @acess public
 * @desc  get all courses in database
 */
router.get("/", CourseController.getAllCourses);
/**
 * @route GET /api/course/:id @acess public
 * @desc  get  course by id
 */
router.get("/:id", CourseController.getCourseByID);

/**
 * @route DELETE /api/course/delete/:id
 * @acess private
 * @desc  delete course by id
 */
router.delete("/:id", auth, checkTeacherRole, CourseController.deleteByID);

/**
 * @route POST /api/course/update/:id
 * @acess private
 * @desc  update course in database
 */
router.post(
  "/update/:id",
  auth,
  checkTeacherRole,
  checkCourse,
  validateCheckers,
  CourseController.updateByID
);

/**
 * @route POST /api/course
 * @acess private
 * @desc  add course in database
 */
router.post(
  "/",
  auth,
  checkTeacherRole,
  checkCourse,
  validateCheckers,
  CourseController.addNewCourse
);

module.exports = router;
