function notFoundHandler(req, res) {
  return res.status(404).json({
    message: "Route not found"
  });
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  const response = {
    message: err.message || "Internal server error"
  };

  if (err.details) {
    response.details = err.details;
  }

  if (process.env.NODE_ENV !== "production" && err.stack) {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
}

module.exports = {
  notFoundHandler,
  errorHandler
};
