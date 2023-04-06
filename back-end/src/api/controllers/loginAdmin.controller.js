const userAdminService = require('../services/userAdmin.service');

const getByEmailAndPasswordAdmin = async (req, res, next) => {
    try {
      const { email, password, role } = req.body;
    
      const a = await userAdminService.getByEmailAndPassword(email, password, role);
  
      return res.status(200).json(a);
    } catch (error) {
      next(error);
    }
  };

  const registerLoginAdmin = async (req, res) => {
    console.log(req.body);
    const response = await userAdminService.registerAdmin(req.body);
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
    getByEmailAndPasswordAdmin,
    registerLoginAdmin,
  };