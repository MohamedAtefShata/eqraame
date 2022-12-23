const { default: mongoose } = require("mongoose");
const CourseModel = require("../models/Course.model");
const BadRequestError = require("../utils/BadRequestError");

module.exports = async (req, res, next) => {
  try {
    req.course = { id: req.params.course_id };
    if (!mongoose.isValidObjectId(req.course.id))
      throw new BadRequestError("Invalid course ID");

    let course = await CourseModel.findById(req.course.id);
    if (!course) throw new BadRequestError("Invalid Course ID");

    req.course = course;
    next();
  } catch (error) {
    next(error);
  }
};
