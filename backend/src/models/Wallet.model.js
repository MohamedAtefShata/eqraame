/**
 * Wallet Model
 * @desc   wallet model schema
 * @author Mahmoud Atef
 */

const mongoose = require("mongoose");

const walletScheme = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
      index: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    courses: { type: [mongoose.Schema.Types.ObjectId] },
  },
  { timestamps: true }
);

/*********** queries *************/
/** by user id query
 * @desc add by user-id to query to find ,update or delete by it
 * @param id user id to query by it
 */
walletScheme.query.byUserID = function (id) {
  return this.where({ user_id: id });
};

/************ Mehods  ****************/
/** add course
 * @desc function to add coures id object to wallet
 * @param course course object id
 */
walletScheme.methods.addCourse = function (course) {
  this.courses.unshift(course);
};

/** check ability
 * @desc check ability to pay item
 * @param price price of item
 */
walletScheme.methods.abilityToPay = function (price) {
  return price <= this.balance;
};

module.exports = mongoose.model("Wallet", walletScheme);
