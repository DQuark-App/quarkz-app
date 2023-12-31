module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {unstable_transformProfile: 'hermes-stable'},
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: ['module:react-native-dotenv'],
};
