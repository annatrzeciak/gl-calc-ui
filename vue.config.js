module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    disableHostCheck: true,
    host: "0.0.0.0",
  },
  css: {
    sourceMap: true
  }
};
