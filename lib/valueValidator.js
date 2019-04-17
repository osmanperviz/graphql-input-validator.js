"use strict";

const formatValidator = require("./formatValidator");

const isEmpty = value => value === undefined || value === null || value === "";

module.exports = ({
  field,
  fieldSchema,
  input,
  phoneCountryIsoCode,
  value
}) => {
  const errors = [];

  if (fieldSchema.required && isEmpty(value)) {
    errors.push({
      code: "REQUIRED_INPUT",
      field,
      message: "Please enter a value."
    });
  }

  if (
    fieldSchema.enum !== undefined &&
    !isEmpty(value) &&
    !fieldSchema.enum.includes(value)
  ) {
    errors.push({
      code: "INVALID_INPUT",
      field,
      message: "The entry is not valid."
    });
  }

  if (fieldSchema.format && fieldSchema.formatValidator) {
    const validate = formatValidator[fieldSchema.format];
    if (validate) {
      const error = validate({
        field,
        fieldSchema,
        input,
        phoneCountryIsoCode,
        value
      });
      if (error) {
        errors.push(error);
      }
    }
  }

  if (
    fieldSchema.maximumLength !== undefined &&
    !isEmpty(value) &&
    value.length > fieldSchema.maximumLength
  ) {
    errors.push({
      code: "INPUT_TOO_LONG",
      field,
      message: "The input is too long."
    });
  }

  if (
    fieldSchema.maximumValue !== undefined &&
    !isEmpty(value) &&
    value > fieldSchema.maximumValue
  ) {
    errors.push({
      code: "INPUT_TOO_LARGE",
      field,
      message: "The value is too big."
    });
  }

  if (
    fieldSchema.minimumLength !== undefined &&
    !isEmpty(value) &&
    value.length < fieldSchema.minimumLength
  ) {
    errors.push({
      code: "INPUT_TOO_SHORT",
      field,
      message: "The entry is too short."
    });
  }

  if (
    fieldSchema.minimumValue !== undefined &&
    !isEmpty(value) &&
    value < fieldSchema.minimumValue
  ) {
    errors.push({
      code: "INPUT_TOO_SMALL",
      field,
      message: "The value is too small."
    });
  }

  return errors;
};
