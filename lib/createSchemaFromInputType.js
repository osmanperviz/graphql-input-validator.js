"use strict";

const _ = require("lodash");

const getInputType = type => {
  let ofType = type;
  while (
    ofType.constructor.name === "GraphQLNonNull" ||
    ofType.constructor.name === "GraphQLList"
  ) {
    ofType = ofType.ofType;
  }
  return ofType;
};

const getScalarTypeSchema = field => {
  const fieldOfType = getInputType(field.type);
  switch (fieldOfType.name) {
    case "Boolean":
      return _.omitBy(
        {
          type: "boolean"
        },
        _.isNil
      );
    case "Float":
    case "Int":
      return _.omitBy(
        {
          maximumValue: field.maximumValue,
          minimumValue: field.minimumValue,
          type: "number"
        },
        _.isNil
      );
    case "ID":
    case "String":
      return _.omitBy(
        {
          countryIsoCodeField: field.countryIsoCodeField,
          enum: field.enum,
          format: field.format,
          iban: field.iban,
          maximumItems: field.maximumItems,
          maximumLength: field.maximumLength,
          minimumItems: field.minimumItems,
          minimumLength: field.minimumLength,
          normalizeFormat: field.normalizeFormat,
          required:
            field.type.constructor.name === "GraphQLNonNull" ? true : undefined,
          toLowerCase: field.toLowerCase,
          toUpperCase: field.toUpperCase,
          trim: field.trim,
          type: "string",
          uniqueItems: field.uniqueItems,
          validateFormat: field.validateFormat
        },
        _.isNil
      );
    default:
      throw new Error(`Type ${fieldOfType.name} is not supported.`);
  }
};

module.exports = inputType => {
  const graphqlInputType = getInputType(inputType);
  if (graphqlInputType.constructor.name === "GraphQLInputObjectType") {
    const result = {};
    const fields = graphqlInputType.getFields();
    for (const fieldName in fields) {
      const field = fields[fieldName];
      const fieldOfType = getInputType(field.type);
      if (fieldOfType.constructor.name === "GraphQLScalarType") {
        result[fieldName] = getScalarTypeSchema(field);
      } else if (fieldOfType.constructor.name === "GraphQLInputObjectType") {
        result[fieldName] = {
          type: "object",
          fields: module.exports(fieldOfType)
        };
      }
    }
    return result;
  }
};
