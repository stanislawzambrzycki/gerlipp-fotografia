module.exports = {
  configureWebpack: {
    output: {
      hashFunction: 'sha256'
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}