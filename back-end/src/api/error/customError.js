class CustomError extends Error {
  constructor(stack, message) {
    super(message);
    this.status = stack;
  }
}

module.exports = CustomError;