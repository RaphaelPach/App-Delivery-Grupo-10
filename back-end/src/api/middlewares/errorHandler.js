const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.stack || 500;
  
  return res.status(statusCode).json({ message: err.message });
};

module.exports = errorHandler;