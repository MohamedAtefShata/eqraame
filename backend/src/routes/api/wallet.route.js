/**
 * user rout
 * @user api/wallet
 * @author Mahmoud Atef
 */

const auth = require("../../middlewares/auth");
const courseIDParams = require("../../middlewares/courseIDParams");

const Wallet = require("../../models/Wallet.model");
const walletService = require("../../services/wallet.service");
const walletController = require("../../controller/wallet.controller");

const router = require("express").Router();

/**
 * @route GET /api/wallet/
 * @acess private
 * @desc  get my wallet for auth user
 */
router.get("/", auth, walletController.getMyWallet);

/**
 * @route POST /api/wallet/pay/course
 * @acess private
 * @desc  pay money to get course
 */
router.post(
  "/pay/course/:course_id",
  auth,
  courseIDParams,
  walletController.payToCourse
);

router.post("/charge", auth, walletController.chargeWallet);

module.exports = router;
