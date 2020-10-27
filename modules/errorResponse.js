class ResponseError extends Error {
  constructor(message, code, body) {
    super(message);
    this.code = code;
    this.body = body;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ResponseError;
