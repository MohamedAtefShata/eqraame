/**
 * user rout
 * @user api/wallet
 * @author Mahmoud Atef
 */

const auth = require("../../middlewares/auth");
const Wallet = require("../../models/Wallet.model");

const router = require("express").Router();

/**
 * @route GET /api/wallet/
 * @acess private
 * @desc  get my wallet for auth user
 */
router.get("/", auth, async (req, res) => {
  try {
    let wallet = await Wallet.findOne().byUserID(req.user.id).select("-_id");
    return res.json({ wallet });
  } catch (error) {
    console.log("error in wallet route", err.message);
    return res.status(500).json({ errors: [{ msg: "server error" }] });
  }
});

module.exports = router;
