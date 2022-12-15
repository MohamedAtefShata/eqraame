const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userScheme = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "invalid email"],
    },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    birthDate: { type: Date, required: true },
    avatar: { type: String },
  },
  { timestampst: true }
);

userScheme.methods.encryptPassword = async () => {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

userScheme.query.byEmail = (email) => this.where({ email: email });

module.exports = User = mongoose.model("User", userScheme);
