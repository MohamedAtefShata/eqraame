/**
 * @desc   File for load all routes in project
 * @author Mahmoud Atef
 */

const express = require("express");
const apiRouter = require("./api/index");

const mainRouter = express.Router();

// load api routes
mainRouter.use("/api", apiRouter);

module.exports = mainRouter;
