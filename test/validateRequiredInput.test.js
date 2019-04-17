"use strict";

const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const inputValidator = require("../");

const validateRequired = email => {
  const inputSchema = inputValidator.createSchemaFromInputType(
    new GraphQLInputObjectType({
      name: "CreateUserInput",
      fields: {
        email: {
          type: new GraphQLNonNull(GraphQLString)
        }
      }
    })
  );
  return inputValidator.validateAndFormatInput({
    input: {
      email
    },
    inputSchema
  });
};

test("Required with non empty string", () => {
  expect.assertions(1);
  const result = validateRequired("some@some.com");
  expect(result.errors).toHaveLength(0);
});

test("Required with empty string", () => {
  expect.assertions(1);
  const result = validateRequired("");
  expect(result.errors).toMatchObject([
    {
      code: "REQUIRED_INPUT",
      field: "email"
    }
  ]);
});

test("Required with undefined", () => {
  expect.assertions(1);
  const result = validateRequired();
  expect(result.errors).toMatchObject([
    {
      code: "REQUIRED_INPUT",
      field: "email"
    }
  ]);
});
