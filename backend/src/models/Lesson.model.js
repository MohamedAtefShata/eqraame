const mongoose = require("mongoose");

const CourseScheme = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        course_id: {
            type: mongoose.Schema.ObjectId,
            ref: "Author",
            required: true,
            immutable: true,
            index: true,
          },
        content_type:{
            type: String
        },
        content:{
            type: String
        }
    },{ timestamps: true }
);
module.exports = mongoose.model("Course", CourseScheme);