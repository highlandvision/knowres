// All webpack configuration for dev environment will go here
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(require('./webpack.run.base.js'), {
	mode:         'development',
	devtool:      'inline-source-map',
	stats:        'minimal',
	watch:        true,
	watchOptions: {
		aggregateTimeout: 300,
		poll:             1000,
		ignored:          path.resolve(__dirname, 'node_modules')
	}
});