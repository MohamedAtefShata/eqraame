/**
 * Course Model
 * @desc   Course model schema
 * @author Mohamed Atef
 * @author Mahmoud Atef
 */

const mongoose = require("mongoose");
const CategoriesEnum = require("./Categories.enum");

const lessonScheme = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  content_type: {
    type: String,
    required: true,
    enum: ["article", "video"],
    default: "article",
  },
  content: {
    type: String,
    required: true,
  },
});

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
    category: {
      type: String,
      required: true,
      index: true,
      enum: CategoriesEnum,
    },
    descreption: {
      type: String,
    },
    cover: {
      type: String,
      required: true,
      default: "default",
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    lessons: [lessonScheme],
  },
  { timestamps: true }
);

/**
 * Add lesson to course
 * @desc
 * @author Mahmoud Atef
 */
CourseScheme.methods.addLesson = function (name, content_type, content) {
  this.lessons.push({ content, content_type, name });
};

module.exports = mongoose.model("Course", CourseScheme);
