/**
 * Wallet Transaction Model
 * @desc   model to log all transactions happen in wallets
 * @author Mahmoud Atef
 */

const mongoose = require("mongoose");

const walletTransactionScheme = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
      index: true,
    },
    seller_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
      index: true,
    },
    item_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      immutable: true,
      index: true,
    },
    pricing: {
      type: Number,
      required: true,
      immutable: true,
    },
    vat: {
      type: Number,
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WalletTransaction", walletTransactionScheme);
