/**
 * User service
 * @desc service do all buusiness for user : logic register , delete ,...
 * @author Mahmoud Atef
 */

const { connection } = require("../config/db-connection");
const User = require("../models/User.model");
const Wallet = require("../models/Wallet.model");

/**
 * register user function
 * @desc transaction to register user and create wallet and profile for it
 * @param user user object from User.model
 */
const register = async function (user) {
  const session = await connection.startSession();

  try {
    // satrt tansaction
    session.startTransaction();

    // check email is used
    let emailChecker = await User.findOne().byEmail(user.email);

    /**  throw request  @todo seprate class*/
    let err = new Error("Email is already used");
    err.name = "BadRequest";
    if (emailChecker) throw err;

    // prepare user data
    await user.encryptPassword();

    // transaction
    await user.save({ session });
    let wallet = new Wallet({ user_id: user.id });
    await wallet.save({ session });

    // commiting
    await session.commitTransaction();
  } catch (error) {
    // roll back and rethrow error to know an error happen
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

module.exports = { register };
