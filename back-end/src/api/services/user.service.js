const md5 = require('md5');
const { User } = require('../../database/models');
const CustomError = require('../error/customError');
const { createTokenJWT } = require('../Utils/jwt');

// {
//   "email": "zebirita@email.com",
//   "password": "$#zebirita#$"
// }

  const getByEmailAndPassword = async (email, password) => {
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

  const registerLogin = async ({ email, password, name }) => {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      const hashedPassword = md5(password);
      await User.create({ name, email, password: hashedPassword, role: 'customer' });
      const token = createTokenJWT({ name, email, password: hashedPassword });
      return { token, type: 201, name, email, role: 'customer' };
    }
      return { type: 409, message: 'Conflict' };
  };

  const getSellers = async () => {
    const sellers = await User.findAll({
      where: {
        role: 'seller',
      },
      attributes: {
        exclude: ['password'],
      },
    });

    return sellers;
  };

  const getCustomers = async () => {
    const customers = await User.findAll({
      where: {
        role: 'customer',
      },
      attributes: {
        exclude: ['password'],
      },
    });

    return customers;
  };

  module.exports = {
  getByEmailAndPassword,
  registerLogin,
  getSellers,
  getCustomers,
};
