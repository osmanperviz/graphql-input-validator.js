"use strict";

const {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const inputValidator = require("../");

const validateArray = array => {
  const inputSchema = inputValidator.createSchemaFromInputType(
    new GraphQLInputObjectType({
      name: "CreateLoactionInput",
      fields: {
        array: {
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(GraphQLString))
          ),
          enum: ["DE", "IT", "US"],
          maximumItems: 2,
          minimumItems: 1,
          uniqueItems: true
        }
      }
    })
  );
  return inputValidator.validateAndFormatInput({
    input: {
      array
    },
    inputSchema
  });
};

test("Valid array", () => {
  expect.assertions(1);
  const result = validateArray(["DE"]);
  expect(result.errors).toHaveLength(0);
});

test("Array with too gew items", () => {
  expect.assertions(1);
  const result = validateArray([]);
  expect(result.errors).toMatchObject([
    {
      code: "TOO_FEW_ITEMS",
      field: "array"
    }
  ]);
});

test("Array with too many items", () => {
  expect.assertions(1);
  const result = validateArray(["DE", "IT", "US"]);
  expect(result.errors).toMatchObject([
    {
      code: "TOO_MANY_ITEMS",
      field: "array"
    }
  ]);
});

test("Array with duplicate items", () => {
  expect.assertions(1);
  const result = validateArray(["DE", "DE"]);
  expect(result.errors).toMatchObject([
    {
      code: "DUPLICATE_ITEMS",
      field: "array"
    }
  ]);
});

test("Array with invalid items", () => {
  expect.assertions(1);
  const result = validateArray(["AT"]);
  expect(result.errors).toMatchObject([
    {
      code: "INVALID_INPUT",
      field: "array"
    }
  ]);
});
