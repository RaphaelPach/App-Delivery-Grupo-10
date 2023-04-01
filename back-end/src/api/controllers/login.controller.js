const userService = require('../services/user.service');

const getByEmailAndPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    await userService.getByEmailAndPassword(email, password);

    res.status(200).json({ result: 'logging in' });
  } catch (error) {
    next(error);
  }
};

const registerLogin = async (req, res) => {
  const response = await userService.registerLogin(req.body);
  if (response.type) {
    return res.status(response.type).json({ token: response.token });
  }
};

module.exports = {
getByEmailAndPassword,
registerLogin,
};
