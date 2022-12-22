/**
 * Course conroller second layer after route layer
 * @author Mahmoud Atef
 */

const { default: mongoose } = require("mongoose");
const CourseModel = require("../models/Course.model");
const BadRequestError = require("../utils/BadRequestError");
const ResponseError = require("../utils/ResponseError");

/** Get All courses */
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await CourseModel.find();
    res.json({ msg: "successful requeset", data: courses });
  } catch (error) {
    next(error);
  }
};

/**  get course by id */
const getCourseByID = async (req, res, next) => {
  try {
    const course_id = req.course.id;

    // do servies
    let course = await CourseModel.findById(course_id);
    if (!course) throw new BadRequestError("Invalid Course ID");

    // response
    return res.json({ msg: "successful requeset", data: course });
  } catch (err) {
    next(err);
  }
};

/**  delete course by id */
const deleteByID = async (req, res, next) => {
  try {
    // validate request
    const course_id = req.course.id;

    // get cours
    let course = await CourseModel.findById(course_id);
    if (!course) throw new BadRequestError("Invalid Course ID");
    if (!course.author_id.equals(req.user.id))
      throw new ResponseError("You don't have access to delete", 401);

    // delete
    await CourseModel.findByIdAndDelete(course_id);
    return res.json({ msg: "deleted successfuly" });
  } catch (error) {
    next(error);
  }
};

/***************  Update by ID*****************/
const updateByID = async (req, res, next) => {
  try {
    // get request data
    const course_id = req.course.id;
    const { name, price, descreption } = req.body;
    const author_id = req.user.id;

    if (!mongoose.isValidObjectId(course_id))
      throw new BadRequestError("Invalid Course ID");

    // getting and check course
    let course = await CourseModel.findById(course_id);
    if (!course) throw BadRequestError("Invalid Course ID");
    if (!course.author_id.equals(author_id))
      throw new ResponseError("You don't have access to update", 401);

    // update data
    if (name) course.name = name;
    if (price) course.price = price;
    if (descreption) course.descreption = descreption;

    // saving updates
    await course.save();

    res.json({ msg: "successful update" });
  } catch (error) {
    next(error);
  }
};

/************ add new course  *********/
const addNewCourse = async (req, res, next) => {
  try {
    const author_id = req.user.id;
    const { name, price, descreption } = req.body;

    // servies
    let course = new CourseModel({ name, price, author_id });
    if (descreption) course.descreption = descreption;
    await course.save();

    return res.status(201).json({ msg: "successful added", data: course });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllCourses,
  getCourseByID,
  deleteByID,
  updateByID,
  addNewCourse,
};
