const withPlugins = require("next-compose-plugins");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");

const config = {
  lessLoaderOptions: {
    javascriptEnabled: true,
  },

  webpack(config, options) {
    const rules = [
      // * Add tailwind
      {
        test: /\.scss$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("tailwindcss")("./tailwind.config.js"),
                require("autoprefixer"),
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env"),
              ],
            },
          },
          { loader: "sass-loader" },
        ],
      },

      // * Load images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
        options: {
          outputPath: "./public/assets/",
          publicPath: "assets/",
        },
      },
    ];

    return {
      ...config,
      module: {
        ...config.module,
        rules: [...config.module.rules, ...rules],
      },
    };
  },
};

module.exports = withPlugins([withSass, withLess, withCSS], config);
