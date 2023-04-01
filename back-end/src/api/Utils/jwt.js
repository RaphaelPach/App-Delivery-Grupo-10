const jwt = require('jsonwebtoken');

const secret = 'secret_key';

  function createTokenJWT(payload) {
  const config = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, config);
  return token;
}
  function decodeToken(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json('token não autorizado');
    }
    try {
      const decoded = jwt.verify(authorization, secret);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      return null;
    }
}

module.exports = {
  decodeToken,
  createTokenJWT,
};