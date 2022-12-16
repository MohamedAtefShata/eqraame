/**
 * Wallet service
 * @desc service do  bussines logic
 * @author Mahmoud Atef
 */

const { connection } = require("../config/db-connection");
const UserModel = require("../models/User.model");
const WalletModel = require("../models/Wallet.model");
const WalletTransactionModel = require("../models/WalletTransaction.model");

/** pay function
 * @author Mahmoud Atef
 * @param wallet buyer wallet
 * @param seller seller wallet
 * @param item   item want to buy
 */
const pay = async function (wallet, seller, item) {
  const session = await connection.startSession();

  try {
    // satrt tansaction
    session.startTransaction();

    /************************************
     *   calculate our vat
     * ***********************************/
    const admin = await UserModel.findOne({ rolde: "admin" });
    if (!admin)
      throw new Error({
        message: "Not Found Admin User",
        name: "InternalSystemError",
      });

    const adminWallet = await WalletModel.findOne().byUserID(admin.id);
    if (!adminWallet)
      throw new Error({
        message: "Not Found Admin wallet",
        name: "InternalSystemError",
      });

    //---------------------------------
    //      Logic for VAT

    const pricing = item.price;
    const vatR = 10.0; // vat%

    let totalVat = (pricing * vatR) / 100;
    totalVat = Math.round(totalVat * 4);
    let rem = totalVat % 4;
    totalVat = (totalVat - rem) / 4;
    totalVat += 0.25 * rem;

    let afterVat = pricing - totalVat;

    /************************************* */

    // transaction
    wallet.balance -= item.price;
    wallet.addCourse(item.id);
    adminWallet.balance += totalVat;
    seller.balance += afterVat;

    await WalletTransactionModel.create(
      [
        {
          user_id: wallet.user_id,
          seller_id: seller.user_id,
          item_id: item.id,
          pricing,
          vat: totalVat,
        },
      ],
      { session }
    );

    await wallet.save({ session });
    await adminWallet.save({ session });
    await seller.save({ session });

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

module.exports = { pay };
