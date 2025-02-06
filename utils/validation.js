const joi = require("joi");
const signupValidationSchema = joi.object({
  name: joi.string().min(4).max(20).required().messages({
    "string.base": "username should be a type of text",
    "string.empty": "Username cannot be empty",
    "string.min": "username must be atleast 3 chararters",
    "string.max": "username must be atmost 20 chararters",
    "any.required": "username is required",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: joi
    .string()
    .min(8)
    .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .required()
    .messages({
      "string.min": "password must be atleast 8 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      "any.required": "Password is required",
    }),
  phone: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be exactly 10 letters",
      "any.required": "Phone number is required",
    }),
});
const loginValidationSchema = signupValidationSchema
  .fork(["name", "phone"], (schema) => {
    return schema.optional();
  })
  
module.exports = { signupValidationSchema, loginValidationSchema };
