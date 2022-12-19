/**
 * user rout
 * @user /auth
 * @author Mahmoud Atef
 */

const CourseModel = require("../../models/Course.model");

const router = require("express").Router();

/**
 * @route GET /api/course
 * @acess public
 * @desc  register user to database
 */
router.get(
  // path
  "/",
  /******** Response handling ********/
  async (req, res) => {
    try {
      let courses = await CourseModel.find();

      return res.json({
        msg: "succufful requeset",
        data: courses,
      });
    } catch (error) {
      console.log("error in get courses :", error.message);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

router.post(
  // path
  "/",
  /** @todo teacher auth */
  /******** Response handling ********/
  async (req, res) => {
    try {
      const { name, price, author_id, descreption } = req.body;
      let course = new CourseModel({ name, price, author_id });
      if (descreption) course.descreption = descreption;
      await course.save();

      return res.json({ msg: "succufull added" });
    } catch (error) {
      console.log("error in get courses :", error.message);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

module.exports = router;
