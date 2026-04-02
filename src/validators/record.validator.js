const Joi = require("joi");

const createRecordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().min(2).max(100).required(),
  date: Joi.date().iso().required(),
  notes: Joi.string().allow("").max(500).optional()
});

const updateRecordSchema = Joi.object({
  amount: Joi.number().positive(),
  type: Joi.string().valid("income", "expense"),
  category: Joi.string().min(2).max(100),
  date: Joi.date().iso(),
  notes: Joi.string().allow("").max(500)
}).min(1);

const listRecordSchema = Joi.object({
  type: Joi.string().valid("income", "expense"),
  category: Joi.string().min(2).max(100),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  q: Joi.string().min(1).max(100),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
}).custom((value, helpers) => {
  if (value.startDate && value.endDate && value.startDate > value.endDate) {
    return helpers.error("any.invalid");
  }

  return value;
}, "date range validation");

module.exports = {
  createRecordSchema,
  updateRecordSchema,
  listRecordSchema
};
