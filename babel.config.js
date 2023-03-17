module.exports = function(api) {
  api.cache(true);
  const plugins = ["@babel/plugin-proposal-export-namespace-from"];
  return {
    presets: ['babel-preset-expo'],
    plugins
  };
};
