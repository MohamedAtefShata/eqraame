/**
 * user rout
 * @user /auth
 * @author Mahmoud Atef
 */

const CourseModel = require("../../models/Course.model");
const auth = require("../../middlewares/auth");
const teacherAuth = require("../../middlewares/teacherAuth");
const BadRequestError = require("../../utils/BadRequestError");
const responseHandler = require("../../utils/RequestHandler");

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
    await responseHandler(res, async () => {
      let courses = await CourseModel.find();

      return res.json({
        msg: "successful requeset",
        data: courses,
      });
    });
  }
);

/**
 * @route GET /api/course
 * @acess public
 * @desc  get  course by id
 */
router.get(
  // path
  "/:id",
  /******** Response handling ********/
  async (req, res) => {
    await responseHandler(res, async () => {
      const course_id = req.params.id;
      let course = await CourseModel.findById(course_id);

      if (!course) throw new BadRequestError("Invalid Course ID");

      return res.json({
        msg: "successful requeset",
        data: course,
      });
    });
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
    await responseHandler(res, async () => {
      // validate request
      const course_id = req.params.id;
      let course = await CourseModel.findById(course_id);
      if (!course) throw new BadRequestError("Invalid Course ID");

      if (!course.author_id.equals(req.user.id))
        throw new BadRequestError("You don't have access to delete", 401);

      // delete
      await CourseModel.findByIdAndDelete(course_id);

      return res.json({ msg: "deleted successfuly" });
    });
  }
);

/**
 * @route UPDATE /api/course
 * @acess private
 * @desc  add course in database
 */
router.post(
  // path
  "/update/:id",
  auth,
  teacherAuth,
  /******** Response handling ********/
  async (req, res) => {
    await responseHandler(res, async () => {
      // get request data
      const course_id = req.params.id;
      const { name, price, descreption } = req.body;
      const author_id = req.user.id;

      // getting and check course
      let course = await CourseModel.findById(course_id);
      if (!course) throw BadRequestError("Invalid Course ID");
      if (!course.author_id.equals(author_id))
        throw new BadRequestError("You don't have access to update", 401);

      // update data
      if (name) course.name = name;
      if (price) course.price = price;
      if (descreption) course.descreption = descreption;

      // saving updates
      await course.save();

      res.json({ msg: "successful update" });
    });
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
    await responseHandler(res, async () => {
      const author_id = req.user.id;
      const { name, price, descreption } = req.body;
      let course = new CourseModel({ name, price, author_id });
      if (descreption) course.descreption = descreption;
      await course.save();

      return res.json({ msg: "successful added" });
    });
  }
);

module.exports = router;
