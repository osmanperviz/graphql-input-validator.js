"use strict";

const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const inputValidator = require("../");

const validatePassword = password => {
  const inputSchema = inputValidator.createSchemaFromInputType(
    new GraphQLInputObjectType({
      name: "CreateUserInput",
      fields: {
        password: {
          type: GraphQLString,
          format: "password",
          validateFormat: true
        }
      }
    })
  );
  return inputValidator.validateAndFormatInput({
    input: {
      password
    },
    inputSchema
  });
};

test("Valid password", () => {
  expect.assertions(1);
  const result = validatePassword("12345678");
  expect(result.errors).toHaveLength(0);
});

test("Too short password", () => {
  expect.assertions(1);
  const result = validatePassword("123");
  expect(result.errors).toMatchObject([
    {
      code: "PASSWORD_TOO_SHORT",
      field: "password"
    }
  ]);
});
