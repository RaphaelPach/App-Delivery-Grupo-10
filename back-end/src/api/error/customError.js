class CustomError extends Error {
  constructor(stack, message) {
    super(message);
    this.stack = stack;
  }
}

module.exports = CustomError;