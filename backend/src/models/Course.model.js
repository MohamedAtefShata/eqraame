/**
 * Course Model
 * @desc   Course model schema
 * @author Mohamed Atef
 * @author Mahmoud Atef
 */

const mongoose = require("mongoose");

const CourseScheme = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    author_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
      index: true,
    },
    descreption: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    lessons: [
      {
        num: { type: Number, required: true },
        name: { type: String, required: true, trim: true },
        content_type: {
          type: String,
          enum: ["article", "video"],
          default: "article",
        },
        content: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

/**
 * Add lesson to course
 * @desc
 * @author Mahmoud Atef
 */
CourseScheme.methods.addLesson = function (num, name, content_type, content) {
  this.lessons.push({ num, content, content_type, name });
};

module.exports = mongoose.model("Course", CourseScheme);
