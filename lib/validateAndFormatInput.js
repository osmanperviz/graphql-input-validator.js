"use strict";

const cleanValue = require("./cleanValue");
const valueValidator = require("./valueValidator");
const validateArray = require("./validateArray");

module.exports = ({ input, inputSchema, phoneCountryIsoCode }) => {
  if (input === undefined || input === null) {
    return { errors: [] };
  }
  const cleanedInput = { ...input };
  const errors = [];
  for (const field in inputSchema) {
    const fieldSchema = inputSchema[field];
    const arrayOrValue = input[field];
    if (Array.isArray(arrayOrValue)) {
      errors.push(
        ...validateArray({
          array: arrayOrValue,
          field,
          fieldSchema
        })
      );
    }
    const values = Array.isArray(arrayOrValue) ? arrayOrValue : [arrayOrValue];
    for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
      const value = values[valueIndex];
      if (fieldSchema.type === "object") {
        const result = module.exports({
          input: value,
          inputSchema: fieldSchema.fields,
          phoneCountryIsoCode
        });
        if (Array.isArray(arrayOrValue)) {
          cleanedInput[field][valueIndex] = result.cleanedInput;
        } else {
          cleanedInput[field] = result.cleanedInput;
        }
        errors.push(...result.errors);
      } else {
        const cleanedValue = cleanValue({
          fieldSchema,
          phoneCountryIsoCode,
          value
        });
        if (Array.isArray(arrayOrValue)) {
          cleanedInput[field][valueIndex] = cleanedValue;
        } else {
          cleanedInput[field] = cleanedValue;
        }
        errors.push(
          ...valueValidator({
            field,
            fieldSchema,
            input,
            phoneCountryIsoCode,
            value: cleanedValue
          })
        );
      }
    }
  }
  return { cleanedInput, errors };
};
