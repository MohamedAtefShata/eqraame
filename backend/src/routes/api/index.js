/**
 * @desc   File for load API Routes
 * @author Mahmoud Atef
 */

const express = require("express");
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const walletRoute = require("./wallet.route");
const courseRoute = require("./course.route");

const apiRouter = express.Router();

// load api routes
apiRouter.use("/user", userRoute);
apiRouter.use("/auth", authRoute);
apiRouter.use("/wallet", walletRoute);
apiRouter.use("/course", courseRoute);

module.exports = apiRouter;
