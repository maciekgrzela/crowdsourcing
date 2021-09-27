class RestError extends Error {
  constructor(statusCode, content) {
    super(content);
    this.statusCode = statusCode;
  }
}

module.exports = RestError;
