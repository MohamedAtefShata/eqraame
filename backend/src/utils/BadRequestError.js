const ResponseError = require("./ResponseError");

class BadRequestError extends ResponseError {
  constructor(message, location = "") {
    super(message, 400, location);
    this.name = "BadRequest";
  }
}
module.exports = BadRequestError;
