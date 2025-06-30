module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-paper/babel',
      [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: `.env.${process.env.APP_ENV || 'development'}`,
      }
    ],
      'react-native-reanimated/plugin', // Yeh hamesha last hona chahiye
    ],
  };
};
