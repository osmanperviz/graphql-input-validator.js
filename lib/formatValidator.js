"use strict";

const iban = require("iban");
const jsvat = require("jsvat");
const moment = require("moment");
const PhoneNumber = require("awesome-phonenumber");
const validator = require("validator");

const isEmpty = value => value === undefined || value === null || value === "";

module.exports = {
  date: ({ field, value }) => {
    if (!value) {
      return;
    }
    if (moment(value, "YYYY-MM-DD", true).isValid()) {
      return;
    }
    return {
      code: "INVALID_DATE",
      field,
      message: "The date is not valid."
    };
  },
  dateTime: ({ field, value }) => {
    if (!value) {
      return;
    }
    if (moment(value, "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid()) {
      return;
    }
    return {
      code: "INVALID_DATE_TIME",
      field,
      message: "Date and time are not valid."
    };
  },
  email: ({ field, value }) => {
    if (isEmpty(value)) {
      return;
    }
    if (validator.isEmail(value)) {
      return;
    }
    return {
      code: "INVALID_EMAIL",
      field,
      message: "The e-mail address is not valid."
    };
  },
  iban: ({ field, value }) => {
    if (isEmpty(value)) {
      return;
    }
    if (iban.isValid(value)) {
      return;
    }
    return {
      code: "INVALID_IBAN",
      field,
      message: "The IBAN is not valid."
    };
  },
  mobile: ({ field, phoneCountryIsoCode, value }) => {
    if (!value || !value.trim()) {
      return;
    }
    const phoneNumber = new PhoneNumber(value, phoneCountryIsoCode);
    if (
      phoneNumber.isValid() &&
      phoneNumber.canBeInternationallyDialled() &&
      phoneNumber.isMobile() &&
      (!phoneCountryIsoCode ||
        phoneCountryIsoCode === phoneNumber.getRegionCode())
    ) {
      return;
    }
    return {
      code: "INVALID_MOBILE",
      field,
      message: "The mobile phone number is not valid."
    };
  },
  password: ({ field, value }) => {
    if (!value) {
      return;
    }
    if (value.length < 8) {
      return {
        code: "PASSWORD_TOO_SHORT",
        field,
        message: "The password is too short."
      };
    }
    return;
  },
  phone: ({ field, phoneCountryIsoCode, value }) => {
    if (!value || !value.trim()) {
      return;
    }
    const phoneNumber = new PhoneNumber(value, phoneCountryIsoCode);
    if (
      phoneNumber.isValid() &&
      phoneNumber.canBeInternationallyDialled() &&
      (!phoneCountryIsoCode ||
        phoneCountryIsoCode === phoneNumber.getRegionCode())
    ) {
      return;
    }
    return {
      code: "INVALID_PHONE",
      field,
      message: "The phone number is not valid."
    };
  },
  postalCode: ({ field, fieldSchema, input, value }) => {
    if (!value || !value.trim()) {
      return;
    }
    if (!fieldSchema.countryIsoCodeField) {
      return;
    }
    const countryIsoCode = input[fieldSchema.countryIsoCodeField];
    if (!countryIsoCode) {
      return;
    }
    try {
      if (validator.isPostalCode(value, countryIsoCode)) {
        return;
      }
    } catch (error) {
      return;
    }
    return {
      code: "INVALID_POSTAL_CODE",
      field,
      message: "The postal code is invalid."
    };
  },
  time: ({ field, value }) => {
    if (!value) {
      return;
    }
    if (moment(value, "HH:mm", true).isValid()) {
      return;
    }
    return {
      code: "INVALID_TIME",
      field,
      message: "The time is not valid."
    };
  },
  url: ({ field, value }) => {
    if (isEmpty(value)) {
      return;
    }
    if (validator.isURL(value)) {
      return;
    }
    return {
      code: "INVALID_URL",
      field,
      message: "The URL is not valid."
    };
  },
  vatIdentificationNumber: ({ field, value }) => {
    if (isEmpty(value)) {
      return;
    }
    if (jsvat.checkVAT(value).isValid) {
      return;
    }
    return {
      code: "INVALID_VAT_IDENTIFICATION_NUMBER",
      field,
      message: "The VAT ID. is not valid."
    };
  },
  week: ({ field, value }) => {
    if (!value) {
      return;
    }
    if (moment(value, "YYYY-[W]WW", true).isValid()) {
      return;
    }
    return {
      code: "INVALID_WEEK",
      field,
      message: "No valid week."
    };
  }
};
