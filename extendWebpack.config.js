const { getPaths, edit } = require('@rescripts/utilities');

// Plagiarized from here: https://github.com/harrysolovay/rescripts#getpathspredicate-scantarget
const isBabelLoader = path => {
  return path && path.loader && path.loader.includes('babel-loader');
};

module.exports = {
  webpack(config) {
    /*
      These lines can be used to inspect the webpack config when working on modifying it.
      This will run whenever "yarn start" or "yarn build" is executed. Throwing the error
        short-circuits so you don't actually have to start or build.
      const { inspect } = require('util');
      console.log(inspect(config, { depth: 1 }));
      throw new Error('Working on config');
    */
    const paths = getPaths(isBabelLoader, config);
    return edit(
      babelLoader => {
        const pluginsNode = babelLoader.options && babelLoader.options.plugins;
        if (pluginsNode && config.mode === 'development') {
          pluginsNode.push('babel-plugin-typescript-to-proptypes');
        }
        return babelLoader;
      },
      paths,
      config
    );
  }
  /*
    Can also extend jest and webpack-devServer
    jest(config) {},
    devServer(config) {}
  */
};
