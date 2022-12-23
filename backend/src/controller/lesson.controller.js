/**
 * Lesson conroller second layer after route layer
 * @author Mahmoud Atef
 */

const CourseModel = require("../models/Course.model");
const ResponseError = require("../utils/ResponseError");

/**********      Add lesson     ***************/
const addLesson = async (req, res, next) => {
  try {
    const author_id = req.user.id;
    const { name, content_type, content } = req.body;

    let course = req.course;
    if (!course.author_id.equals(author_id))
      throw new ResponseError("You don't have access", 401);

    course.addLesson(name, content_type, content);
    await course.save();

    return res.status(201).json({ msg: "successful added" });
  } catch (err) {
    next(err);
  }
};

/**********      Delete lesson     ***************/
const deleteLesson = async (req, res, next) => {
  try {
    const author_id = req.user.id;
    const lesson_id = req.params.id;

    let course = req.course;
    if (!course.author_id.equals(author_id))
      throw new ResponseError("You don't have access", 401);

    let lessonIDX = -1;
    let i = 0;
    await course.lessons.forEach((lesson) => {
      if (lesson.id === lesson_id) lessonIDX = i;
      i++;
    });

    if (lessonIDX == -1) throw new ResponseError("invalid lesson id");
    await course.lessons.splice(lessonIDX, 1);

    await course.save();

    return res.status(200).json({ msg: "successful deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { addLesson, deleteLesson };
