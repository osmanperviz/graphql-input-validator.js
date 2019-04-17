"use strict";

const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const inputValidator = require("../");

const normalizePhone = (phone, phoneCountryIsoCode) => {
  const inputSchema = inputValidator.createSchemaFromInputType(
    new GraphQLInputObjectType({
      name: "CreateUserInput",
      fields: {
        phone: {
          type: GraphQLString,
          format: "phone",
          normalizeFormat: true
        }
      }
    })
  );
  return inputValidator.validateAndFormatInput({
    input: {
      phone
    },
    inputSchema,
    phoneCountryIsoCode
  });
};

test("Normalize already normalized phone", () => {
  expect.assertions(2);
  const result = normalizePhone("+49 178 1234567");
  expect(result.cleanedInput.phone).toBe("+49 178 1234567");
  expect(result.errors).toHaveLength(0);
});

test("Normalize not normalized phone", () => {
  expect.assertions(2);
  const result = normalizePhone(" +49 178 / 123 45 67 ");
  expect(result.cleanedInput.phone).toBe("+49 178 1234567");
  expect(result.errors).toHaveLength(0);
});

test("Normalize undefined phone", () => {
  expect.assertions(2);
  const result = normalizePhone(undefined);
  expect(result.cleanedInput.phone).toBeUndefined();
  expect(result.errors).toHaveLength(0);
});

test("Normalize invalid phone", () => {
  expect.assertions(2);
  const result = normalizePhone(" 456 ");
  expect(result.cleanedInput.phone).toBe(" 456 ");
  expect(result.errors).toHaveLength(0);
});

test("Normalize not normalized phone with valid country ISO code", () => {
  expect.assertions(2);
  const result = normalizePhone(" 178 / 123 45 67 ", "DE");
  expect(result.cleanedInput.phone).toEqual("+49 178 1234567");
  expect(result.errors).toHaveLength(0);
});

test("Normalize not normalized phone with empty country ISO code", () => {
  expect.assertions(2);
  const result = normalizePhone(" 178 / 123 45 67 ", "");
  expect(result.cleanedInput.phone).toEqual(" 178 / 123 45 67 ");
  expect(result.errors).toHaveLength(0);
});
