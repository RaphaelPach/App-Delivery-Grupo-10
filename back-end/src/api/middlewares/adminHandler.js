const { User } = require('../../database/models');
const CustomError = require('../error/customError');

const registerVerifyEmail = async (req, _res, next) => {
  console.log('email;', req.body);
  const { email } = req.body;
  const user = await User.findOne({
    where: { email },
  });
  if (user) {
    throw new CustomError('409', 'Conflict');
  }
  next();
};

const registerVerifyName = async (req, _res, next) => {
  console.log('name:', req.body);
  const { name } = req.body;
  const user = await User.findOne({
    where: { name },
  });
  if (user) {
    throw new CustomError('409', 'Conflict');
  }
  next();
};

module.exports = {
  registerVerifyEmail,
  registerVerifyName,
};