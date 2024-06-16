const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require("path");

const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = {
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ["python"],
    }),
  ],
};

const APP_DIR = path.resolve(__dirname, "./src");
const MONACO_DIR = path.resolve(__dirname, "./node_modules/monaco-editor");

(module.exports = {
  test: /\.css$/,
  include: APP_DIR,
  use: [
    {
      loader: "style-loader",
    },
    {
      loader: "css-loader",
      options: {
        modules: true,
        namedExport: true,
      },
    },
  ],
}),
  {
    test: /\.css$/,
    include: MONACO_DIR,
    use: ["style-loader", "css-loader"],
  };















module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
   
  },
};
