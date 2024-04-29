import * as math from 'mathjs';

export const convertAmountToDecimal = (amountStr) => {
  if (typeof amountStr !== 'string') {
    return amountStr;
  } 

  if (amountStr.includes('/')) {
    const [numerator, denominator] = amountStr.split('/').map(Number);
    return numerator / denominator;
  } else {
    return parseFloat(amountStr);
  }
};

// const isDecimalOrFraction = (amount) => {
//   const regex = /^[-+]?[0-9]*\.?[0-9]+(?:\/[0-9]+)?$/;
//   if (!regex.test(amount)) {
//     return true;
//   }
// }

export function decimalToFraction(decimal) {
  try {
    const fraction = math.fraction(decimal);
    const fractionString = math.format(fraction);

    if (fraction.n % fraction.d === 0) {
      return fraction.n / fraction.d; 
    } else {
      return fractionString; 
    }

  } catch (error) {
    return null;
  }
}