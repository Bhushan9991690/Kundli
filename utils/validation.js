const joi = require("joi");

const passwordSchema = joi
  .string()
  .min(8)
  .max(20)
  .pattern(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{8,}$/
  )
  .required()
  .messages({
    "string.base": '"password" should be a string',
    "string.empty": '"password" cannot be empty',
    "string.min": '"password" must be atleast {#limit} characters',
    "string.max": '"password" cannot longer than {#limit} characters',
    "string.pattern.base":
      '"password" must contain atleast one upperCase, one lowerCase, one number and one special character',
    "string.any": '"password" is required',
  });

const signupValidationSchema = joi.object({
  firstName: joi.string().min(3).max(30).required().messages({
    "string.base": '"firstName" should be a string Type',
    "string.empty": '"firstName" cannot be empty string',
    "string.min": '"firstName" must be atleast {#limit} characters',
    "string.max": '"firstName" cannot be longer than {#limit} characters',
    "any.required": '"firstName" is required',
  }),
  lastName: joi.string().min(3).max(30).required().messages({
    "string.base": '"LastName should be a string',
    "string.empty": '"lastName cannot be empty',
    "string.min": '"lastName" must be atleast {#limit} characters',
    "string.max": '"lastName cannot be longer than {#limit} characters',
    "string.any": '"lastName" is required',
  }),
  email: joi
    .string()
    .min(8)
    .max(20)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": '"email" should be a string',
      "string.empty": '"email" cannot be empty',
      "string.email": '"email" must be a valid email e.g: xyz@gmail.com',
      "string.any": '"email" is required',
    }),
  password: passwordSchema,
  phone: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.base": '"Phone" should be string',
      "string.empty": '"phone" cannot be empty',
      "string.any": '"phone" is required',
      "string.pattern.base": '"phone" must be 0-9 & exact length of 10',
    }),
});
const loginValidationSchema = signupValidationSchema.fork(
  ["firstName", "lastName", "phone"],
  (schema) => {
    return schema.optional();
  }
);
const profileValidation = signupValidationSchema
  .fork(["password", "email"], (schema) => {
    return schema.optional();
  })
  .concat(
    joi.object({
      photoURL: joi
        .string()
        .uri() // Ensures it's a valid URI
        .regex(/\.(jpg|jpeg|png|gif)$/i) // Ensures it has a common image extension (jpg, jpeg, png, gif)
        .required() // Ensures the field is required
        .messages({
          "string.base": '"photoUrl" should be a string',
          "string.empty": '"photoUrl" cannot be empty',
          "string.uri": '"photoUrl" must be a valid URL',
          "string.pattern.base":
            '"photoUrl" must be a valid image URL (e.g., .jpg, .png, .jpeg, .gif)',
          "any.required": '"photoUrl" is required',
        }),
      about: joi
        .string()
        .min(10) // Ensure it's at least 10 characters long
        .max(500) // Ensure it's no longer than 500 characters
        .required() // Ensure the field is required
        .messages({
          "string.base": '"about" should be a string',
          "string.empty": '"about" cannot be empty',
          "string.min": '"about" must be at least {#limit} characters long',
          "string.max": '"about" cannot be longer than {#limit} characters',
          "any.required": '"about" is required',
        }),
      skills: joi
        .array()
        .items(joi.string().min(1).max(50)) // Each skill should be a string between 3 and 50 characters
        .min(1) // There must be at least one skill
        .max(10) // You can limit the number of skills (optional)
        .required() // Ensure the field is required
        .messages({
          "array.base": '"skills" should be an array',
          "array.min": '"skills" should contain at least {#limit} skill',
          "array.max": '"skills" can contain a maximum of {#limit} skills',
          "array.items": '"skills" must be an array of strings',
          "any.required": '"skills" is required',
        }),
      gender: joi
        .string()
        .valid("M", "F", "O") // The valid values are "M", "F", "O"
        .required() // Ensure the field is required
        .messages({
          "string.base": '"gender" should be a string',
          "string.empty": '"gender" cannot be empty',
          "any.only": '"gender" must be one of the following values: M, F, O', // Custom message for invalid gender
          "any.required": '"gender" is required', // Ensure gender is provided
        }),
      age: joi
        .number()
        .integer() // Ensure the value is an integer
        .min(18) // Ensure the age is at least 18
        .max(100) // Ensure the age is at most 100
        .required() // Ensure the field is required
        .messages({
          "number.base": '"age" should be a number',
          "number.integer": '"age" must be an integer',
          "number.min": '"age" must be at least {#limit}',
          "number.max": '"age" must be less than or equal to {#limit}',
          "any.required": '"age" is required',
        }),
    })
  );

const passwordValidation = joi.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
});

module.exports = {
  signupValidationSchema,
  loginValidationSchema,
  profileValidation,
  passwordValidation,
};
