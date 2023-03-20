const validateEmpty = (value) =>
  value == null || value.length === 0 || value === undefined;

export default validateEmpty;
