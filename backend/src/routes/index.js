/**
 * @desc   File for load all routes in project
 * @author Mahmoud Atef
 */

const express = require("express");
const userRoute = require("./api/user.route");
const authRoute = require("./api/auth.route");
const walletRoute = require("./api/wallet.route");

const mainRouter = express.Router();

// load api routes
mainRouter.use("/api/user", userRoute);
mainRouter.use("/api/auth", authRoute);
mainRouter.use("/api/wallet", walletRoute);

module.exports = mainRouter;
