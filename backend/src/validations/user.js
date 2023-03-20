// import { body, validationResult, buildCheckFunction, check } from 'express-validator'
import Joi from './joiExtension'

export const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      myLocation: error.location,
    };
  },
});

export const saveValidation = [
  body("firstName").exists().isString().notEmpty().escape(),
  body("phone").exists().isNumeric(),
]

export const checkBodyAndQuery = buildCheckFunction(['body', 'query']);

export const validateData = check(saveValidation, "Path : Validation middleware")


export const userSchema = Joi.object({
  user: Joi.object({
    firstName: Joi.string().required().escapeHTML(),
    lastName: Joi.string().escapeHTML(),
    email: Joi.string().required().escapeHTML(),
    phone: Joi.number().required().escapeHTML(),
  })
})
