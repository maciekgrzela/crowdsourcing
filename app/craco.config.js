module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
  babel: {
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
  },
};
