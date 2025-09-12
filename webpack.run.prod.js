// Webpack's configuration for prod environment here
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const version = '5.2.0';

module.exports = merge(require('./webpack.run.base.js'), {
	mode:         'production',
	output:       {
		filename: '[name].min.js',
	},
	optimization: {
		minimize:  true,
		minimizer: [
			new TerserPlugin({
				test:            /\.js(\?.*)?$/i,
				extractComments: {
					condition: /^\**!|@preserve|@license|@cc_on/i,
				},
			}),
		]
	},
	plugins:      [
		new MiniCssExtractPlugin({
			filename: 'css/min/[name].' + version + '.min.css'
		}),
	]
});