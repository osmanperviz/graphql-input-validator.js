"use strict";

const inputValidator = require("../");

test("To lower case", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      email: "TEST@EMAIL.COM"
    },
    inputSchema: {
      email: {
        type: "string",
        toLowerCase: true
      }
    }
  });
  expect(result.cleanedInput.email).toBe("test@email.com");
});

test("To upper case", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      email: "test@email.com"
    },
    inputSchema: {
      email: {
        type: "string",
        toUpperCase: true
      }
    }
  });
  expect(result.cleanedInput.email).toBe("TEST@EMAIL.COM");
});

test("Trim", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      username: " somename "
    },
    inputSchema: {
      username: {
        type: "string",
        trim: true
      }
    }
  });
  expect(result.cleanedInput.username).toBe("somename");
});

test("Nested trim", () => {
  expect.assertions(1);
  const result = inputValidator.validateAndFormatInput({
    input: {
      user: {
        firstName: " somename "
      }
    },
    inputSchema: {
      user: {
        type: "object",
        fields: {
          firstName: {
            type: "string",
            trim: true
          }
        }
      }
    }
  });
  expect(result.cleanedInput.user.firstName).toBe("somename");
});
