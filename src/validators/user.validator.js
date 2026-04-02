const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
  role: Joi.string().valid("admin", "analyst", "viewer").required(),
  status: Joi.string().valid("active", "inactive").default("active")
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  role: Joi.string().valid("admin", "analyst", "viewer"),
  status: Joi.string().valid("active", "inactive")
}).min(1);

module.exports = {
  createUserSchema,
  updateUserSchema
};
