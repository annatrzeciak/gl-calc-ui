module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    proxy: process.env.VUE_APP_API_URL,
    disableHostCheck: true,
    host: "0.0.0.0"
  },
  css: {
    sourceMap: true
  }
};
