const express = require("express");
const cors = require("cors");
const __ = require("dotenv").config();

const { connect } = require("./config/db-connection");
const userRoute = require("./routes/api/user.route");

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";

// Main function for start server

const Main = async () => {
  try {
    // connect to database
    await connect();
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

// init routes
app.use("/api/user", userRoute);
