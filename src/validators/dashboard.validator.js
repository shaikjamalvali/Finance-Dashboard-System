const Joi = require("joi");

const dashboardQuerySchema = Joi.object({
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  limit: Joi.number().integer().min(1).max(50).default(10)
}).custom((value, helpers) => {
  if (value.startDate && value.endDate && value.startDate > value.endDate) {
    return helpers.error("any.invalid");
  }

  return value;
}, "date range validation");

module.exports = {
  dashboardQuerySchema
};
