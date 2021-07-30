/* eslint-disable import/no-commonjs */

module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
