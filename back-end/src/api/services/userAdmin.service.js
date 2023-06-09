const md5 = require('md5');
const { User } = require('../../database/models');
const CustomError = require('../error/customError');
const { createTokenJWT } = require('../Utils/jwt');

const getByEmailAndPasswordAdmin = async (email, password) => {
    const hashedPassword = md5(password);
    const user = await User.findOne({ where: { email, password: hashedPassword } });
    if (!user) {
      throw new CustomError('404', 'invalid email or passoword');
    }
    const token = createTokenJWT({ name: user.dataValues.name, email, password: hashedPassword });
    return {
      name: user.dataValues.name,
      email,
      role: user.dataValues.role,  
      token,
    };
  };
  const registerAdmin = async ({ email, password, name, role }) => {
    const user = await User.findOne({
      where: { name, email },
    });
    if (!user) {
      const hashedPassword = md5(password);
      await User.create({ name, email, password: hashedPassword, role });
      const token = createTokenJWT({ name, email, password: hashedPassword });
      return { token, type: 201, name, email, role };
    }
      return { type: 409, message: 'Conflict' };
  };

  module.exports = {
  getByEmailAndPasswordAdmin,
  registerAdmin,

};