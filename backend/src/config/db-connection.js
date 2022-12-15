const mongoose = require("mongoose");

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(CONNECTION_STRING);
    console.log("connected to db successful....");
  } catch (err) {
    console.log("error on db connection", err);
    throw err;
  }
};

module.exports = connector = { connect, connection: mongoose.connection };
