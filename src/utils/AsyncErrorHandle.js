import { validationResult } from "express-validator";

const dataValidator = (error) => {
    const errors = {};

    Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
    });

    return errors;
};

export const wrapAsyncErrors = (fn) => {

    // Return Router level request validation errors if any
    return async function (req, res, next) {
        console.log("Path : Router - express-validataion inside router")
        console.log("Path : Router - validationResult");
        const valErrors = validationResult(req);

        // If some error occurs, then this block of code will run
        if (!valErrors.isEmpty()) {
            console.log('Path : Router : Express Validation failed result inside controller')
            res.status(500).json(valErrors);
        }

        // Return Data access layer validation errors if any
        fn(req, res, next).catch((error) => {
            let { message = error } = error;
            if (error.name === 'ValidationError') {
                message = dataValidator(error);
            }
            console.log(`Async Error ====== : ${error}`)
            res.status(400).json(message);
        });

    };
}

export default wrapAsyncErrors;
