const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
  role: Joi.string().valid("admin", "analyst", "viewer").optional(),
  status: Joi.string().valid("active", "inactive").optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required()
});

module.exports = {
  registerSchema,
  loginSchema
};
