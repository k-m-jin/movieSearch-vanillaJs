//import
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
//export
module.exports = {
  //파일을 읽어들이기 시작하는 진입점 설정
  entry: "./js/main.js",

  // 결과물(번들)을 반환하는 설정
  output: {
    // path: path.resolve(__dirname, "dist"),
    // filename: "main.js",
    clean: true,
  },

  //css
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          //순서 중요
          "style-loader", // Html에 해석된 css 를 삽입하는 용도
          "css-loader", // js가 css를 해석하는 용도
          "postcss-loader",
          "sass-loader", //webpack 이 scss 를 해석하기 위한 용도
        ],
      },
      {
        test: /\.js$/,
        use: [
          "babel-loader", ///webpack 이 babel 를 해석하기 위한 용도
        ],
      },
    ],
  },

  //번들링 후 결과물의 처리 방식 등 다영한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
  ],
  devServer: {
    host: "localhost",
  },
};
