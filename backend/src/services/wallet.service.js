/**
 * Wallet service
 * @desc service do  bussines logic
 * @author Mahmoud Atef
 */

const { VAT_PERCENTAGE } = require("../config/config");
const { connection } = require("../config/db");
const UserModel = require("../models/User.model");
const WalletModel = require("../models/Wallet.model");
const WalletTransactionModel = require("../models/WalletTransaction.model");
const ResponseError = require("../utils/ResponseError");

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

    // check availabilty
    if (!wallet.abilityToPay(item.price))
      throw new ResponseError("not avilable balance", 406);

    // get admin wallet to transfer vat
    const adminWallet = await getAdminWallet();

    // get vat and price after vat
    let pricing = item.price;
    let vat = calculateVat(pricing);
    let afterVat = pricing - vat;

    // transaction
    wallet.balance -= item.price;
    wallet.addCourse(item.id);
    adminWallet.balance += vat;
    seller.balance += afterVat;

    await WalletTransactionModel.create(
      [
        {
          user_id: wallet.user_id,
          seller_id: seller.user_id,
          item_id: item.id,
          pricing,
          vat,
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

/**
 * Private function in file to calculate vat
 * Logic for VAT
 * @param pricing price for item to buy
 */
const calculateVat = (pricing) => {
  const vatR = VAT_PERCENTAGE; // vat%

  let totalVat = (pricing * vatR) / 100;
  totalVat = Math.round(totalVat * 4);
  let rem = totalVat % 4;
  totalVat = (totalVat - rem) / 4;
  totalVat += 0.25 * rem;

  return totalVat;
};
/**Private function in file to get admin wallet  */
const getAdminWallet = async () => {
  const admin = await UserModel.findOne({ role: "admin" });
  if (!admin) throw new ResponseError("Not Found Admin User", 500);

  const adminWallet = await WalletModel.findOne().byUserID(admin.id);
  if (!adminWallet) throw new ResponseError("Not Found Admin Wallet", 500);

  return adminWallet;
};

module.exports = { pay };
