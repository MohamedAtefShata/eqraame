/**
 * user rout
 * @user api/wallet
 * @author Mahmoud Atef
 */

const auth = require("../../middlewares/auth");
const Wallet = require("../../models/Wallet.model");
const walletService = require("../../services/wallet.service");

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
/**
 * @route POST /api/wallet/pay/course
 * @acess private
 * @desc  pay money to get course
 */
router.post("/pay/course/:id", auth, async (req, res) => {
  try {
    let course = {
      id: req.params.id,
      price: 50,
      author_id: "639bb0d8a75833b91fbf33ed",
    };

    if (!course)
      return res.status(401).json({ errors: [{ msg: "invalid course" }] });

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
    console.log("error in pay course route", `${error.kind}:${error.message}`);
    if (error.kind === "ObjectId")
      return res.status(401).json({ errors: [{ msg: "invalid course" }] });

    return res.status(500).json({ errors: [{ msg: "server error" }] });
  }
});

module.exports = router;
