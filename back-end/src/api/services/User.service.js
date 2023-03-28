const User = require('../../database/models');
const CustomError = require('../Error/customError');

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new CustomError('invalid email', '404');
  }

  return user;
};

  const getByEmailAndPassword = async (email, password) => {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      throw new CustomError('invalid email or passoword', '404');
    }
    return user;
  };

module.exports = {
  getByEmail,
  getByEmailAndPassword,
};
