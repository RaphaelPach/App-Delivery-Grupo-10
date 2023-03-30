const CustomError = require('../error/customError');

const verifyLoginFields = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError('400', 'email and password are required');
  }

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!emailRegex.test(email)) {
    throw new CustomError('400', 'ivalid email format');
  }

  if (password.length < 6) {
    throw new CustomError('400', 'password must be at least 6 characters long');
  }

  next();
};

module.exports = verifyLoginFields;
