/**
 * Wallet conroller second layer after route layer
 * @desc this layer take request and do maniplaution in request then send data to servies and send respnse
 * @author Mahmoud Atef
 */

const Wallet = require("../models/Wallet.model");
const ResponseError = require("../utils/ResponseError");
const WalletService = require("../services/wallet.service");

const getMyWallet = async (req, res, next) => {
  try {
    let wallet = await Wallet.findOne().byUserID(req.user.id).select("-_id");
    return res.json({ wallet });
  } catch (error) {
    next(error);
  }
};

const payToCourse = async (req, res, next) => {
  /** @todo request need class error handler */
  try {
    let course = req.course;

    let wallet = await Wallet.findOne().byUserID(req.user.id);
    if (!wallet) throw new ResponseError("Invalid Authentication", 401);

    let seller = await Wallet.findOne().byUserID(course.author_id);
    if (!seller)
      throw new ResponseError("not found course author", 500, "pay to course");

    // do service
    await WalletService.pay(wallet, seller, course);

    // response
    return res.json({ msg: "procces succcufully happend ." });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyWallet, payToCourse };
