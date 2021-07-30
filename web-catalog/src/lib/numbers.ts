export const kmToMiles = (km = 0, decimals = 2): number =>
  +(km * 0.621371).toFixed(decimals);

export const gramKmToGramMiles = (g = 0, decimals = 2): number =>
  +(g * 1.60934).toFixed(decimals);
