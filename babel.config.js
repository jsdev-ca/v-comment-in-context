module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  const plugins = [];
  const presets = [
    '@babel/preset-env'
  ];

  return {
    plugins,
    presets
  };
};
