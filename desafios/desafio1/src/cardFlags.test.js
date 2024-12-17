const assert = require("assert");
const { getCardFlag } = require("./cardFlag");

describe("Card Flags", () => {
  it("should handle Visa correctly", () => {
    assert.strictEqual(getCardFlag("4111111111111111"), "visa");
  });

  it("should handle MasterCard correctly", () => {
    assert.strictEqual(getCardFlag("5105105105105100"), "mastercard");
  });

  it("should handle American Express correctly", () => {
    assert.strictEqual(getCardFlag("371449635398431"), "amex");
  });

  it("should handle Diners Club correctly", () => {
    assert.strictEqual(getCardFlag("30569309025904"), "diners");
  });

  it("should handle Discover correctly", () => {
    assert.strictEqual(getCardFlag("6011111111111117"), "discover");
  });

  it("should handle JCB correctly", () => {
    assert.strictEqual(getCardFlag("3530111333300000"), "jcb");
  });

  it("should handle unknown card correctly", () => {
    assert.strictEqual(getCardFlag("1234567890123456"), "unknown");
  });
});
