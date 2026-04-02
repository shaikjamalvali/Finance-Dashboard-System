const ApiError = require("../utils/apiError");

function validate(schema, source = "body") {
  return (req, res, next) => {
    const { value, error } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      return next(
        new ApiError(
          400,
          "Validation failed",
          error.details.map((detail) => detail.message)
        )
      );
    }

    req[source] = value;
    return next();
  };
}

module.exports = validate;
