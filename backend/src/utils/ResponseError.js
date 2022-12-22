class ResponseError extends Error {
  constructor(message, status = 500, location = "") {
    super(message);
    this.name = "ResponseError";
    this.status = status;
    this.location = location;
    this.json = [{ msg: this.message }];
  }
}
module.exports = ResponseError;
