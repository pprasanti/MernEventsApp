import { body, validationResult, buildCheckFunction, check } from 'express-validator'


export const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return {
      myLocation: error.location,
    };
  },
});

export const saveValidation = [
  body("name").exists().isString().notEmpty(),
  body("description").exists().isString(),
  // body("address").exists().isString().notEmpty(),
  body("website").exists().isString(),
  body("priceStarts").exists(),
  // body("img").exists(),
  body("phone").exists(),
]

export const checkBodyAndQuery = buildCheckFunction(['body', 'query']);

export const validateData = check(saveValidation, "Path : Validation middleware")
