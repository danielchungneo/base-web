import { isNaN } from "lodash";

export const formatNumberWithCommas = (num, maxDecimalPlaces = 0) => {
  if (isNaN(num) || num === null) {
    return num;
  }

  // convert to a string so we can split it on the decimal
  const numString = num.toString();
  const numSplit = numString.split(".");
  const hasDecimal = numString.includes(".");
  const isNegative = numString[0] === "-";

  const leftSide = numSplit[0];
  const rightSide = numSplit[1]; // getting all numbers right of the decimal

  const formattedLeftSide = leftSide
    .slice(isNegative ? 1 : 0) // remove the negative sign if it exists
    .split("")
    .reverse()
    .map((char, charIdx) => (charIdx && charIdx % 3 === 0 ? char + "," : char))
    .concat(isNegative ? "-" : "")
    .reverse()
    .join("");

  let formattedRightSide = "";

  for (let i = 0; i < maxDecimalPlaces; i++) {
    formattedRightSide += `${
      !!rightSide && rightSide[i] != undefined ? rightSide[i] : ""
    }`;
  }

  return !!formattedRightSide
    ? `${formattedLeftSide}.${formattedRightSide}`
    : `${formattedLeftSide}${hasDecimal && !!maxDecimalPlaces ? "." : ""}`;
};

/**
 * https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
 */
export const isNumeric = (str) => {
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

export const formatPercentage = (percentage, minimumDecimalPlaces) => {
  const formattedPercentage = percentage.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: minimumDecimalPlaces,
  });

  return `${parseFloat(formattedPercentage)}%`;
};

export const roundToDecimal = (num, decimalPlaces) => {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(num * multiplier) / multiplier;
};

export const formatCurrencyToNumber = (string: any) => {
  const formattedString = string.toString();
  return Number(formattedString.replace(/[^0-9.-]+/g, ""));
};

export const formatCurrency = (num: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedNumber = formatter.format(num);

  if (formattedNumber && num !== null) {
    return formattedNumber;
  }
  return "---";
};
