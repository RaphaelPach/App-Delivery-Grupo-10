const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.status || 500;
  console.log(err);
  return res.status(statusCode).json({ message: err.message });
};

module.exports = errorHandler;