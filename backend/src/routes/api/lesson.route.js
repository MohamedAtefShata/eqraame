/**
 * Course route
 * @route /course/:course_id/lesson
 * @author Mahmoud Atef
 */

const LessonController = require("../../controller/lesson.controller");
const auth = require("../../middlewares/auth");
const { checkLesson, validateCheckers } = require("../../middlewares/cheakers");
const teacherAuth = require("../../middlewares/checkTeacherRole");
// const responseHandler = require("../../utils/RequestHandler");

const router = require("express").Router();

/**
 * @route POST /api/course/:id/lesson
 * @acess private
 * @desc  add lesson in database
 */
router.post(
  "/",
  //authentication
  auth,
  teacherAuth,
  checkLesson,
  validateCheckers,
  LessonController.addLesson
);

/**
 * @route DELETE /api/course/:course_id/lesson/:lesson_id
 * @acess private
 * @desc  delete lesson in database
 */
router.delete(
  "/:id",
  //authentication
  auth,
  teacherAuth,
  LessonController.deleteLesson
);

module.exports = router;
