/**
 * Course route
 * @route /course/:course_id/lesson
 * @author Mahmoud Atef
 */

const auth = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const WalletTransactionModel = require("../../models/WalletTransaction.model");

const router = require("express").Router();
router.get("/", auth, isAdmin, async (req, res, next) => {
  try {
    const trans = await WalletTransactionModel.find();
    return res.json({ msg: "successful requeset", data: trans });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
