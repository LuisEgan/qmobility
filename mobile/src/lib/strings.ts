/* eslint import/prefer-default-export: "off" */
export const getFirstDecimalNumber = (num: number): number => {
  const dotSplit = `${num}`.split(".");
  const hasDecimals = !!dotSplit[1];

  return hasDecimals ? +dotSplit[1][0] : 0;
};

export const upperCaseFormatter = (str: string) => str.toUpperCase();

export const onlyNumbersFormatter = (str: string) => str.replace(/[^0-9]/g, "");

export const cleanPhoneNumber = (phone: string, countryCode = ""): string => {
  const cleanPhone = phone.includes("+")
    ? phone.substring(countryCode.length + 1 || 3)
    : phone;

  return cleanPhone;
};

export const numberWithDots = (x = ""): string =>
  `${x}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
