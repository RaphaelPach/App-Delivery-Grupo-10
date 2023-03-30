const userService = require('../services/user.service');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
  
    await userService.getByEmailAndPassword(email, password);

    res.status(200).json({ result: 'logging in' });
  } catch (error) {
    next(error);
  }
};
