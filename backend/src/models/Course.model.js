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
    lessons: [
      {
        index: { type: Number, required: true },
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

module.exports = mongoose.model("Course", CourseScheme);
