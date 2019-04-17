"use strict";

const inputValidator = require("../");

test("Maximal length", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      username: "mic"
    },
    inputSchema: {
      username: {
        type: "string",
        maximumLength: 2
      }
    }
  });
  expect(result.errors).toMatchObject([
    {
      code: "INPUT_TOO_LONG",
      field: "username"
    }
  ]);
});

test("Minimal length", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      username: "m"
    },
    inputSchema: {
      username: {
        type: "string",
        minimumLength: 2
      }
    }
  });
  expect(result.errors).toMatchObject([
    {
      code: "INPUT_TOO_SHORT",
      field: "username"
    }
  ]);
});

test("Maximum value", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      age: 100
    },
    inputSchema: {
      age: {
        type: "number",
        maximumValue: 99
      }
    }
  });
  expect(result.errors).toMatchObject([
    {
      code: "INPUT_TOO_LARGE",
      field: "age"
    }
  ]);
});

test("Minimum value", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      age: 12
    },
    inputSchema: {
      age: {
        type: "number",
        minimumValue: 13
      }
    }
  });
  expect(result.errors).toMatchObject([
    {
      code: "INPUT_TOO_SMALL",
      field: "age"
    }
  ]);
});

test("Url", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      url: "someincorecturl"
    },
    inputSchema: {
      url: {
        type: "string",
        format: "url",
        validateFormat: true
      }
    }
  });
  expect(result.errors).toMatchObject([
    {
      code: "INVALID_URL",
      field: "url"
    }
  ]);
});

test("Nested required", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      user: {
        firstName: ""
      }
    },
    inputSchema: {
      user: {
        type: "object",
        fields: {
          firstName: {
            type: "string",
            required: true
          }
        }
      }
    }
  });
  expect(result.errors).toMatchObject([
    {
      code: "REQUIRED_INPUT",
      field: "firstName"
    }
  ]);
});
