/**
 * Wallet conroller second layer after route layer
 * @desc this layer take request and do maniplaution in request then send data to servies and send respnse
 * @author Mahmoud Atef
 */

const Wallet = require("../models/Wallet.model");
const ResponseError = require("../utils/ResponseError");
const WalletService = require("../services/wallet.service");
const BadRequestError = require("../utils/BadRequestError");

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

const chargeWallet = async (req, res, next) => {
  try {
    const method = req.body.method;
    const data = req.body.data;
    if (!method || !data) throw new BadRequestError("Inavalid Payment");
    let wallet = await Wallet.findOne().byUserID(req.user.id);
    if (!wallet) throw new ResponseError("Invalid Authentication", 401);

    const payment = { method, data };
    if (method === "creditcard" && data.amount <= 0)
      throw new BadRequestError("you can charge by positive chaege only");

    // load servies
    await WalletService.chargeWallet(wallet, payment);
    return res.json({ msg: "charged successfuly" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyWallet, payToCourse, chargeWallet };
