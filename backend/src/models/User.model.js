/**
 * User Model
 * @desc   user model schema
 * @author Mahmoud Atef
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      immutable: true,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    birthdate: {
      type: Date,
      min: "1900-01-01",
      max: Date.now,
    },
    avatar: { type: String },
  },
  { timestamps: true }
);

userScheme.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

/** by email query
 * @desc add by Email to query to find ,update or delete by it
 * @param email email to use in query
 */
userScheme.query.byEmail = function (email) {
  return this.where({ email: email });
};

userScheme.methods.getToken = function () {
  const payload = { user: { id: this.id } };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 224000,
  });
  return token;
};

/**
 * Compare password
 * @desc to compare plain password to hashed password saved in db
 * @param password text password
 */
userScheme.methods.comparePassword = async function (password) {
  let isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = User = mongoose.model("User", userScheme);
