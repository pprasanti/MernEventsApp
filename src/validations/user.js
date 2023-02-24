import { body, validationResult, buildCheckFunction, check } from 'express-validator'


export const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      myLocation: error.location,
    };
  },
});

export const saveValidation = [
  body("firstName").exists().isString().notEmpty(),
  body("phone").exists().isNumeric(),
]

export const checkBodyAndQuery = buildCheckFunction(['body', 'query']);

export const validateData = check(saveValidation, "Path : Validation middleware")
