"use strict";

const iban = require("iban");
const jsvat = require("jsvat");
const PhoneNumber = require("awesome-phonenumber");
const validator = require("validator");

const isEmpty = value => value === undefined || value === null || value === "";

module.exports = {
  email: ({ value }) => {
    if (isEmpty(value)) {
      return value;
    }
    const trimmedValue = value.trim();
    if (!validator.isEmail(trimmedValue)) {
      return value;
    }
    return validator.normalizeEmail(trimmedValue);
  },
  iban: ({ value }) => {
    if (isEmpty(value)) {
      return value;
    }
    if (!iban.isValid(value)) {
      return value;
    }
    return iban.electronicFormat(value);
  },
  loginId: ({ phoneCountryIsoCode, value }) => {
    if (isEmpty(value)) {
      return value;
    }
    if (value.includes("@")) {
      return module.exports.email({ value });
    } else {
      return module.exports.phone({ phoneCountryIsoCode, value });
    }
  },
  mobile: ({ phoneCountryIsoCode, value }) => {
    if (!value) {
      return value;
    }
    const phoneNumber = new PhoneNumber(value, phoneCountryIsoCode);
    if (!phoneNumber.isValid()) {
      return value;
    }
    return phoneNumber.getNumber("international").trim();
  },
  phone: ({ phoneCountryIsoCode, value }) => {
    if (!value) {
      return value;
    }
    const phoneNumber = new PhoneNumber(value, phoneCountryIsoCode);
    if (!phoneNumber.isValid()) {
      return value;
    }
    return phoneNumber.getNumber("international").trim();
  },
  postalCode: ({ value }) => {
    if (isEmpty(value)) {
      return value;
    }
    const trimmedValue = value.trim();
    return trimmedValue;
  },
  vatIdentificationNumber: ({ value }) => {
    if (isEmpty(value)) {
      return value;
    }
    const trimmedValue = value.trim().replace(" ", "");
    if (jsvat.checkVAT(trimmedValue).isValid) {
      return trimmedValue;
    }
    return value;
  }
};
