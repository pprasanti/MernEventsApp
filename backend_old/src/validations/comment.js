import { body, validationResult, buildCheckFunction, check } from 'express-validator'


export const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      myLocation: error.location,
    };
  },
});

export const saveValidation = [
  body("text").exists().isString().notEmpty(),
  body("rating").exists().isNumeric(),
]

export const checkBodyAndQuery = buildCheckFunction(['body', 'query']);

export const validateData = check(saveValidation, "Path : Validation middleware")
