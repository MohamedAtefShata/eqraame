/*
    register user Transtaction 
    @desc: transaction to register user and create wallet and profile for it
    @author: Mahmoud Atef
*/

const { connection } = require("../config/db-connection");
const Wallet = require("../models/Wallet.model");

module.exports = async function (user) {
  const session = await connection.startSession();

  try {
    // satrt tansaction
    session.startTransaction();

    // transaction
    await user.save({ session });
    let wallet = new Wallet({ user_id: user.id });
    await wallet.save({ session });

    // commiting
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
