/**
 * Wallet conroller second layer after route layer
 * @desc this layer take request and do maniplaution in request then send data to servies and send respnse
 * @author Mahmoud Atef
 */

const Wallet = require("../models/Wallet.model");

const getMyWallet = async (req, res, next) => {
  try {
    let wallet = await Wallet.findOne().byUserID(req.user.id).select("-_id");
    return res.json({ wallet });
  } catch (error) {
    next(error);
  }
};

const payToCourse = async (req, res) => {
  /** @todo request need class error handler */
  try {
    let wallet = await Wallet.findOne().byUserID(req.user.id);

    if (!wallet)
      return res
        .status(401)
        .json({ errors: [{ msg: "Invalid Authentication" }] });

    if (!wallet.abilityToPay(course.price))
      return res
        .status(401)
        .json({ errors: [{ msg: "not avilable balance" }] });

    let seller = await Wallet.findOne().byUserID(course.author_id);
    if (!seller)
      throw new Error({
        message: "not found author for course",
        name: "InternalServerError",
        kind: "ObjectId",
      });

    /**@todo remove this line is for teseting only */
    course.id = wallet.id;

    walletService.pay(wallet, seller, course);
    res.json({ msg: "procces succcufully happend ." });
  } catch (error) {
    if (error.kind === "ObjectId")
      return res.status(401).json({ errors: [{ msg: "invalid course" }] });

    console.log(
      "error in pay course route : ",
      `< ${error.name} >:${error.message}`
    );
    return res.status(500).json({ errors: [{ msg: "server error" }] });
  }
};

module.exports = { getMyWallet, payToCourse };
