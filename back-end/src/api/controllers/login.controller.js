const userService = require('../services/user.service');

const getByEmailAndPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    const a = await userService.getByEmailAndPassword(email, password);

    return res.status(200).json(a);
  } catch (error) {
    next(error);
  }
};

const registerLogin = async (req, res) => {
  const response = await userService.registerLogin(req.body);
  if (response.type === 201) {
    return res.status(response.type).json({
      token: response.token,
      name: response.name,
      email: response.email,
      role: response.role,
    });
  }

  return res.status(response.type).json(response.message);
};

module.exports = {
  getByEmailAndPassword,
  registerLogin,
};
