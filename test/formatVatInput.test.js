"use strict";

const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const inputValidator = require("../");

const normalizeVatIdentificationNumber = vatIdentificationNumber => {
  const inputSchema = inputValidator.createSchemaFromInputType(
    new GraphQLInputObjectType({
      name: "CreateUserInput",
      fields: {
        vatIdentificationNumber: {
          type: GraphQLString,
          format: "vatIdentificationNumber",
          normalizeFormat: true,
          validateFormat: true
        }
      }
    })
  );
  return inputValidator.validateAndFormatInput({
    input: {
      vatIdentificationNumber
    },
    inputSchema
  });
};

test("Format already formated VAT identification number", () => {
  expect.assertions(2);
  const result = normalizeVatIdentificationNumber("DE309188271");
  expect(result.cleanedInput.vatIdentificationNumber).toBe("DE309188271");
  expect(result.errors).toHaveLength(0);
});

test("Format VAT identification number with leading or following spaces", () => {
  expect.assertions(2);
  const result = normalizeVatIdentificationNumber("  DE309188271  ");
  expect(result.cleanedInput.vatIdentificationNumber).toBe("DE309188271");
  expect(result.errors).toHaveLength(0);
});

test("Format VAT identification number with inner space", () => {
  expect.assertions(2);
  const result = normalizeVatIdentificationNumber("DE 309188271");
  expect(result.cleanedInput.vatIdentificationNumber).toBe("DE309188271");
  expect(result.errors).toHaveLength(0);
});
