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

walletScheme.methods.addCourse = function (course) {
  this.courses.unshift(course);
};

module.exports = mongoose.model("Wallet", walletScheme);
