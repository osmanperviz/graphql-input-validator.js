"use strict";

const {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = require("graphql");
const inputValidator = require("../");

const validateNestedObjectsInput = input => {
  const locationInputType = new GraphQLInputObjectType({
    name: "LocationInput",
    fields: {
      city: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  });
  const userInputType = new GraphQLInputObjectType({
    name: "UserInput",
    fields: {
      firstName: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  });
  const inputSchema = inputValidator.createSchemaFromInputType(
    new GraphQLInputObjectType({
      name: "CompanyInput",
      fields: {
        location: {
          type: new GraphQLNonNull(locationInputType)
        },
        user: {
          type: new GraphQLNonNull(userInputType)
        }
      }
    })
  );
  return inputValidator.validateAndFormatInput({
    input,
    inputSchema
  });
};

test("Valid nested objects input", () => {
  expect.assertions(2);
  const result = validateNestedObjectsInput({
    location: {
      city: "Cologne"
    },
    user: {
      firstName: "Henry"
    }
  });
  expect(result.cleanedInput).toMatchObject({
    location: {
      city: "Cologne"
    },
    user: {
      firstName: "Henry"
    }
  });
  expect(result.errors).toHaveLength(0);
});

test("Valid nested objects input with null object", () => {
  expect.assertions(2);
  const result = validateNestedObjectsInput({
    location: {
      city: "Cologne"
    }
  });
  expect(result.cleanedInput).toMatchObject({
    location: {
      city: "Cologne"
    }
  });
  expect(result.errors).toHaveLength(0);
});

test("Invalid nested objects input", () => {
  expect.assertions(1);
  const result = validateNestedObjectsInput({
    location: {
      city: "Cologne"
    },
    user: {
      firstName: ""
    }
  });
  expect(result.errors).toMatchObject([
    {
      code: "REQUIRED_INPUT",
      field: "firstName"
    }
  ]);
});
