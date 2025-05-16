module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      '@babel/plugin-transform-nullish-coalescing-operator',
      '@babel/plugin-transform-optional-chaining',
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-transform-shorthand-properties',
      '@babel/plugin-transform-template-literals',
    ],
  };
};