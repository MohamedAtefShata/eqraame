/**
 * DataBase conncetion
 * @desc create connector that have connect function and connection
 * @author Mahmoud Atef
 */

const mongoose = require("mongoose");
const { DB_CONNECTION_STRING } = require("./config");

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log("connected to db successful.");
  } catch (err) {
    console.log("error on db connection", err);
    throw err;
  }
};

module.exports = connector = { connect, connection: mongoose.connection };
