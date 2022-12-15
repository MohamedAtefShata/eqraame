/**
 *  Main File for run server and connect to DB
 * @author Mahmoud Atef
 * @author hangra
 */

const express = require("express");
const cors = require("cors");
const __ = require("dotenv").config();

const { connect } = require("./config/db-connection");
const mainRoute = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

// Main function for start server

const Main = async () => {
  try {
    // connect to database
    console.log("start connecting to db will take some seconds ......");
    await connect();

    console.log("runnung server ......");
    app.listen(PORT, () => {
      console.log(`Server is running on port: http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("error in starting server", err);
    // close process if error happen in start
    process.exit();
  }
};
// run Main function
Main();

// Init Middlewares
app.use(cors());
app.use(express.json());

// load routes
app.use("/", mainRoute);
