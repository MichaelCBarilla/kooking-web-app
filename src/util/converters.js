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

export function decimalToFraction(decimal) {
  try {
    const fraction = math.fraction(decimal);
    const fractionString = math.format(fraction);
    return fractionString;
  } catch (error) {
    return null;
  }
}