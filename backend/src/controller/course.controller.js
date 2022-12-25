/**
 * Course conroller second layer after route layer
 * @author Mahmoud Atef
 */

const { default: mongoose } = require("mongoose");
const CourseModel = require("../models/Course.model");
const ResponseError = require("../utils/ResponseError");

/** Get All courses */
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await CourseModel.find();
    return res.json({ msg: "successful requeset", data: courses });
  } catch (error) {
    next(error);
  }
};

/**  get course by id */
const getCourseByID = async (req, res, next) => {
  try {
    const course = req.course;

    // response
    return res.json({ msg: "successful requeset", data: course });
  } catch (err) {
    next(err);
  }
};

/**  delete course by id */
const deleteByID = async (req, res, next) => {
  try {
    // get cours
    const course = req.course;

    if (!course.author_id.equals(req.user.id))
      throw new ResponseError("You don't have access to delete", 401);

    // delete
    await CourseModel.findByIdAndDelete(course.id);
    return res.json({ msg: "deleted successfuly" });
  } catch (error) {
    next(error);
  }
};

/***************  Update by ID*****************/
const updateByID = async (req, res, next) => {
  try {
    // get request data
    const { name, price, descreption, category, cover } = req.body;
    const author_id = req.user.id;
    const course = req.course;

    if (!course.author_id.equals(author_id))
      throw new ResponseError("You don't have access to update", 401);

    // update data
    if (name) course.name = name;
    if (price) course.price = price;
    if (descreption) course.descreption = descreption;
    if (category) course.category = category;
    if (cover) course.cover = cover;

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
    const { name, price, descreption, category, cover } = req.body;

    // servies
    let course = new CourseModel({ name, price, author_id, category, cover });
    if (descreption) course.descreption = descreption;
    await course.save();

    return res.status(201).json({ msg: "successful added", data: course });
  } catch (error) {
    next(error);
  }
};

const getByTeacher = async (req, res, next) => {
  try {
    const id = req.params.id;
    let data = [];
    if (mongoose.isValidObjectId(id))
      data = await CourseModel.find({ author_id: id }).select("-lessons");

    msg = data.length ? "successful requeset" : "user has no course";

    return res.json({ msg, data });
  } catch (error) {
    next(error);
  }
};
const getByCategory = async (req, res, next) => {
  try {
    const category = req.params.category;
    let data = await CourseModel.find({ category }).select("-lessons");
    msg = data.length ? "successful requeset" : "No course in this category";

    return res.json({ msg, data });
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
  getByTeacher,
  getByCategory,
};
