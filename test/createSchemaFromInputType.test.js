"use strict";

const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const inputValidator = require("../");

test("Basic input object", () => {
  expect.assertions(1);
  const createUserInputType = new GraphQLInputObjectType({
    name: "CreateUserInput",
    fields: {
      firstName: {
        type: GraphQLString,
        maximumLength: 10
      }
    }
  });
  const inputSchema = inputValidator.createSchemaFromInputType(
    createUserInputType
  );
  expect(inputSchema).toEqual({
    firstName: {
      type: "string",
      maximumLength: 10
    }
  });
});

test("Basic input object", () => {
  expect.assertions(1);
  const createUserInputType = new GraphQLInputObjectType({
    name: "CreateUserInput",
    fields: {
      firstName: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  });
  const inputSchema = inputValidator.createSchemaFromInputType(
    createUserInputType
  );
  expect(inputSchema).toEqual({
    firstName: {
      type: "string",
      required: true
    }
  });
});

test("Nested input objects", () => {
  expect.assertions(1);
  const createAddressInputType = new GraphQLInputObjectType({
    name: "CreateAddressInput",
    fields: {
      street: {
        type: GraphQLString,
        maximumLength: 10
      }
    }
  });
  const createUserInputType = new GraphQLInputObjectType({
    name: "CreateUserInputType",
    fields: {
      firstName: {
        type: GraphQLString,
        maximumLength: 10
      },
      address: {
        type: createAddressInputType
      }
    }
  });
  const inputSchema = inputValidator.createSchemaFromInputType(
    createUserInputType
  );
  expect(inputSchema).toEqual({
    firstName: {
      type: "string",
      maximumLength: 10
    },
    address: {
      type: "object",
      fields: {
        street: {
          type: "string",
          maximumLength: 10
        }
      }
    }
  });
});
