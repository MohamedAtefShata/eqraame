const mongoose = require("mongoose");

const CourseScheme = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    course_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: true,
      immutable: true,
      index: true,
    },
    content_type: {
      type: String,
      enum: ["article", "video"],
      default: "article",
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Course", CourseScheme);
