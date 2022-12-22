class ResponseError extends Error {
  constructor(message, status, location) {
    super(message);
    this.name = "ResponseError";
    this.status = status;
    this.location - location;
    this.json = { errors: [{ msg: this.message }] };
  }
}
module.exports = ResponseError;
