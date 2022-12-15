/**
 * @desc   File for load all routes in project
 * @author Mahmoud Atef
 */

const express = require("express");
const userRoute = require("./api/user.route");
const authRoute = require("./api/auth.route");

const mainRouter = express.Router();

// load api routes
mainRouter.use("/api/user", userRoute);
mainRouter.use("/api/auth", authRoute);

module.exports = mainRouter;
