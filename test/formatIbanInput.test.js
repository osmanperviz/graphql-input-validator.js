"use strict";

const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const inputValidator = require("../");

const normalizeIban = iban => {
  const inputSchema = inputValidator.createSchemaFromInputType(
    new GraphQLInputObjectType({
      name: "CreateUserInput",
      fields: {
        iban: {
          type: GraphQLString,
          format: "iban",
          normalizeFormat: true
        }
      }
    })
  );
  return inputValidator.validateAndFormatInput({
    input: {
      iban
    },
    inputSchema
  });
};

test("Format already formated IBAN", () => {
  expect.assertions(2);
  const result = normalizeIban("BE68539007547034");
  expect(result.cleanedInput.iban).toBe("BE68539007547034");
  expect(result.errors).toHaveLength(0);
});

test("Format not formated IBAN", () => {
  expect.assertions(2);
  const result = normalizeIban(" BE68 5390 0754 7034 ");
  expect(result.cleanedInput.iban).toBe("BE68539007547034");
  expect(result.errors).toHaveLength(0);
});

test("Format undefined IBAN", () => {
  expect.assertions(2);
  const result = normalizeIban();
  expect(result.cleanedInput.iban).toBeUndefined();
  expect(result.errors).toHaveLength(0);
});

test("Format empty IBAN", () => {
  expect.assertions(2);
  const result = normalizeIban("");
  expect(result.cleanedInput.iban).toBe("");
  expect(result.errors).toHaveLength(0);
});

test("Format invalid IBAN", () => {
  expect.assertions(2);
  const result = normalizeIban(" XX68539007547034 ");
  expect(result.cleanedInput.iban).toBe(" XX68539007547034 ");
  expect(result.errors).toHaveLength(0);
});
