"use strict";

const normalizeFormat = require("./normalizeFormat");

module.exports = ({ fieldSchema, phoneCountryIsoCode, value }) => {
  let cleanedValue = value;
  if (fieldSchema.format && fieldSchema.normalizeFormat) {
    const normalize = normalizeFormat[fieldSchema.format];
    if (normalize) {
      cleanedValue = normalize({ phoneCountryIsoCode, value });
    }
  }
  if (fieldSchema.toLowerCase && value) {
    cleanedValue = value.toLowerCase();
  }
  if (fieldSchema.toUpperCase && value) {
    cleanedValue = value.toUpperCase();
  }
  if (fieldSchema.trim && value) {
    cleanedValue = value.trim();
  }
  return cleanedValue;
};
