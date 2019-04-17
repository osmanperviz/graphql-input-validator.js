"use strict";

const _ = require("lodash");

module.exports = ({ array, field, fieldSchema }) => {
  const errors = [];
  if (
    fieldSchema.maximumItems !== undefined &&
    array.length > fieldSchema.maximumItems
  ) {
    errors.push({
      code: "TOO_MANY_ITEMS",
      field,
      message: "To many items."
    });
  }
  if (
    fieldSchema.minimumItems !== undefined &&
    array.length < fieldSchema.minimumItems
  ) {
    errors.push({
      code: "TOO_FEW_ITEMS",
      field,
      message: "Too few entries."
    });
  }
  if (
    fieldSchema.uniqueItems === true &&
    array.length !== _.uniq(array).length
  ) {
    errors.push({
      code: "DUPLICATE_ITEMS",
      field,
      message: "Duplicate entries were found."
    });
  }
  return errors;
};
