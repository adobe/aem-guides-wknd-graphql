module.exports = function override(config, env) {
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.optimization.runtimeChunk = false;

  config.module.rules = [
    {
      test: /node_modules\/@adobe\/aem-react-editable-components/,
      use: {
        loader: 'babel-loader',
        // if you include your babel config here,
        // you don’t need the `babel.config.json` file
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-optional-chaining']
        },
      },
    },
    ...config.module.rules
  ]
  return config;
}
