const { default: mongoose } = require("mongoose");
const BadRequestError = require("../utils/BadRequestError");

module.exports = (req, res, next) => {
  req.course = { id: req.params.course_id };
  if (!mongoose.isValidObjectId(req.course.id))
    throw new BadRequestError("Invalid course ID");
  next();
};
