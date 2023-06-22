module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo']
  }
}
// Este codigo funciona para que el enrutar con react-router-native, en web, funcione correctamente
