const mongoshValidator = (error) => {
  const errors = {};

  Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message;
  });

  return errors;
};

function wrapAsynch(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((error) => {
      // next(error);
      let { message = error } = error;
      if (error.name === 'ValidationError') {
        message = mongoshValidator(error);
      }

      res.status(400).json(message);
    });
  };
}

export default wrapAsynch;
