/**
 * user rout
 * @user /auth
 * @author Mahmoud Atef
 */

const CourseModel = require("../../models/Course.model");
const auth = require("../../middlewares/auth");
const teacherAuth = require("../../middlewares/teacherAuth");
const BadRequestError = require("../../utils/BadRequestError");

const router = require("express").Router();

/**
 * @route GET /api/course
 * @acess public
 * @desc  get all courses in database
 */
router.get(
  // path
  "/",
  /******** Response handling ********/
  async (req, res) => {
    try {
      let courses = await CourseModel.find();

      return res.json({
        msg: "successful requeset",
        data: courses,
      });
    } catch (error) {
      console.log(
        "error in get courses :",
        `< ${error.name} >:${error.message}`
      );
      return res.status(500).json({ msg: "server error" });
    }
  }
);

/**
 * @route GET /api/course
 * @acess public
 * @desc  get all courses in database
 */
router.get(
  // path
  "/:id",
  /******** Response handling ********/
  async (req, res) => {
    try {
      const course_id = req.params.id;
      let course = await CourseModel.findById(course_id);

      if (!course) throw new BadRequestError("Invalid Course ID");

      return res.json({
        msg: "successful requeset",
        data: course,
      });
    } catch (error) {
      // if id is not object id
      if (error.kind === "ObjectId")
        error = BadRequestError("Invalid Course ID");

      if (error.name === "BadRequest")
        return res.status(error.status).json(error.json);

      console.log(
        "error in get courses :",
        `< ${error.name} >:${error.message}`
      );
      return res.status(500).json({ msg: "server error" });
    }
  }
);
/**
 * @route DELETE /api/course/delete/:id
 * @acess private
 * @desc  delete course by id
 */
router.delete(
  // path
  "/:id",
  auth,
  teacherAuth,

  /******** Response handling ********/
  async (req, res) => {
    try {
      // validate request
      const course_id = req.params.id;
      let course = await CourseModel.findById(course_id);
      if (!course) throw new BadRequestError("Invalid Course ID");

      if (!course.author_id.equals(req.user.id))
        throw new BadRequestError("You don't have access to delete", 401);

      // delete
      await CourseModel.findByIdAndDelete(course_id);

      return res.json({ msg: "deleted successfuly" });
    } catch (error) {
      // if id is not object id
      if (error.kind === "ObjectId")
        error = BadRequestError("Invalid Course ID");

      if (error.name === "BadRequest")
        return res.status(error.status).json(error.json);

      console.log(
        "error in get courses :",
        `< ${error.name} >:${error.message}`
      );
      return res.status(500).json({ msg: "server error" });
    }
  }
);

/**
 * @route POST /api/course
 * @acess private
 * @desc  add course in database
 */
router.post(
  // path
  "/",
  auth,
  teacherAuth,
  /******** Response handling ********/
  async (req, res) => {
    try {
      const { name, price, author_id, descreption } = req.body;
      let course = new CourseModel({ name, price, author_id });
      if (descreption) course.descreption = descreption;
      await course.save();

      return res.json({ msg: "successful added" });
    } catch (error) {
      console.log(
        "error in get courses :",
        `< ${error.name} >:${error.message}`
      );
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
