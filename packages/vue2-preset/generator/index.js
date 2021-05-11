module.exports = api => {
  api.render('./template');
  api.extendPackage({
    devDependencies: {
      // "axios": "^0.21.1",
      // "swrv": "^1.0.0-beta.8",
      // "less": "^4.1.1",
      // "less-loader": "7",
      "jsonp": "^0.2.1",
      // "vue-cli-plugin-style-resources-loader": "^0.1.5",
      // "@types/jest": "^24.0.19",
      // "style-resources-loader": "^1.4.1"
    }
  })
}