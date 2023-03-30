const md5 = require('md5');
const { User } = require('../../database/models');
const CustomError = require('../error/customError');

// const getByEmail = async (email) => {
//   const user = await User.findOne({ where: { email } });
//   if (!user) {
//     throw new CustomError('404', 'invalid email');
//   }

//   return user;
// };

  const getByEmailAndPassword = async (email, password) => {
    const hashedPassword = md5(password);
    const user = await User.findOne({ where: { email, password: hashedPassword } });
    if (!user) {
      throw new CustomError('404', 'invalid email or passoword');
    }
    return user;
  };

module.exports = {
  // getByEmail,
  getByEmailAndPassword,
};
