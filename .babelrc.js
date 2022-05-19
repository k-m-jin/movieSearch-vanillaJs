module.exports = {
  //일일히 명시해야 하는 js의 기능을 한번에
  presets: ["@babel/preset-env"],
  plugins: [
    //비동기 처리를 위해
    ["@babel/plugin-transform-runtime"],
  ],
};
