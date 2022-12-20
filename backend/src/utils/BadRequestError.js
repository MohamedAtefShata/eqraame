class BadRequestError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "BadRequest";
    this.status = status;
    this.json = { errors: [{ msg: this.message }] };
  }
}
module.exports = BadRequestError;
