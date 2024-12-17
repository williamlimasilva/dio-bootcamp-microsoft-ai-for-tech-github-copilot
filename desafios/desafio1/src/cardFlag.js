const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isValidCardNumber(cardNumber) {
  if (!cardNumber || typeof cardNumber !== "string") return false;

  // Remove any non-digit characters
  const digits = cardNumber.replace(/\D/g, "");

  // Check if the length is between 13 and 19 digits
  if (digits.length < 13 || digits.length > 19) return false;

  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

function getCardFlag(cardNumber) {
  const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  };

  for (const [flag, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(cardNumber)) {
      return flag;
    }
  }

  return "unknown";
}

module.exports = { getCardFlag, isValidCardNumber };

rl.question("Digite o número do cartão: ", (cardNumber) => {
  if (!isValidCardNumber(cardNumber)) {
    console.log("Número de cartão inválido");
    rl.close();
    return;
  }
  console.log("Número de cartão válido");
  const cardFlag = getCardFlag(cardNumber);
  console.log(`A bandeira do cartão é: ${cardFlag}`);
  rl.close();
});
