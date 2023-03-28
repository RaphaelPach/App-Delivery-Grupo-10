const errorHandler = (err, _req, res, _next) => {
  if (err.stack) {
    return res.status(err.stack).json({ message: err.message });
  }
  
  return res.status(500).json({ message: err.message });
};

export default errorHandler;