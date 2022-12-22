/**
 * @desc   File for load API Routes
 * @author Mahmoud Atef
 */

const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const walletRoute = require("./wallet.route");
const courseRoute = require("./course.route");
const lessonRoute = require("./lesson.route");
const courseIDParams = require("../../middlewares/courseIDParams");

const apiRouter = express.Router();

// load api routes
apiRouter.use("/user", userRoute);
apiRouter.use("/auth", authRoute);
apiRouter.use("/wallet", walletRoute);
apiRouter.use("/course", courseRoute);
apiRouter.use("/course/:course_id/lesson", courseIDParams, lessonRoute);

module.exports = apiRouter;
