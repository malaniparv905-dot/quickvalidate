import test from "node:test";
import assert from "node:assert/strict";
import {
  isRequired, isEmail, isStrongPassword, isIndianMobile,
  isUrl, isNumeric, isAlphanumeric, validatePassword
} from "../src/index.js";

test("isRequired handles empty values", () => {
  assert.equal(isRequired(" hello "), true);
  assert.equal(isRequired("   "), false);
  assert.equal(isRequired(null), false);
  assert.equal(isRequired([]), false);
});

test("isEmail checks common email formats", () => {
  assert.equal(isEmail("person@example.com"), true);
  assert.equal(isEmail("not-an-email"), false);
  assert.equal(isEmail("person@localhost"), false);
});

test("isStrongPassword checks configurable requirements", () => {
  assert.equal(isStrongPassword("Parv@12345"), true);
  assert.equal(isStrongPassword("password"), false);
  assert.equal(isStrongPassword("password", { requireUppercase: false, requireNumber: false, requireSymbol: false }), true);
});

test("isIndianMobile accepts Indian mobile formats", () => {
  assert.equal(isIndianMobile("9876543210"), true);
  assert.equal(isIndianMobile("+919876543210"), true);
  assert.equal(isIndianMobile("1234567890"), false);
});

test("isUrl accepts http and https URLs only", () => {
  assert.equal(isUrl("https://example.com"), true);
  assert.equal(isUrl("javascript:alert(1)"), false);
  assert.equal(isUrl("not a url"), false);
});

test("numeric and alphanumeric helpers", () => {
  assert.equal(isNumeric("12.5"), true);
  assert.equal(isNumeric(" "), false);
  assert.equal(isAlphanumeric("abc123"), true);
  assert.equal(isAlphanumeric("abc-123"), false);
});

test("validatePassword returns individual checks and score", () => {
  const result = validatePassword("Parv@12345");
  assert.equal(result.valid, true);
  assert.equal(result.score, 5);
});
