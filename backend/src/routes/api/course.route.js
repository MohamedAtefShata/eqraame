/**
 * Course route
 * @route /course
 * @author Mahmoud Atef
 */

const auth = require("../../middlewares/auth");
const checkTeacherRole = require("../../middlewares/checkTeacherRole");
const { checkCourse, validateCheckers } = require("../../middlewares/cheakers");
const CourseController = require("../../controller/course.controller");
const courseIDParams = require("../../middlewares/courseIDParams");
const router = require("express").Router();

/**
 * @route GET /api/course
 * @acess public
 * @desc  get all courses in database
 */
router.get("/", CourseController.getAllCourses);
/**
 * @route GET /api/course/:id
 * @acess public
 * @desc  get  course by id
 */
router.get("/:course_id", courseIDParams, CourseController.getCourseByID);

/**
 * @route DELETE /api/course/delete/:id
 * @acess private
 * @desc  delete course by id
 */
router.delete(
  "/:course_id",
  auth,
  checkTeacherRole,
  courseIDParams,
  CourseController.deleteByID
);

/**
 * @route POST /api/course/update/:id
 * @acess private
 * @desc  update course in database
 */
router.post(
  "/update/:course_id",
  auth,
  checkTeacherRole,
  checkCourse,
  validateCheckers,
  courseIDParams,
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
