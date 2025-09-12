const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry:        {
		foundation: ['./webpack.build.foundation.js'],
		site:       ['./webpack.build.site.js'],
		modules:    ['./webpack.build.modules.js'],
		modulesearch: {
			import: './src/media/com_knowres/js/src/modules/search',
			library: {
				name: 'moduleSearch',
				type: 'var',
			},
		},
	},
	output:       {
		publicPath: '/',
		filename:   '[name].js',
		path:       path.resolve(__dirname, 'src/media/com_knowres/js'),
	},
	resolve:      {
		symlinks: false,
		alias:    {
			npm:     path.resolve(__dirname, './node_modules'),
			mediajs: path.resolve(__dirname, 'src/media/com_knowres/js/src'),
		}
	},
	plugins:      [
		new webpack.ProvidePlugin({
			'window.jQuery': 'jquery',
			'window.$':      'jquery',
			'jQuery':        'jquery',
			'$':             'jquery',
		}),
	],
	module:       {
		rules: [
			{
				test:      /\.(png|svg|jpg|jpeg|gif)$/i,
				type:      'asset/resource',
				generator: {
					filename: 'images/[name][ext]'
				},
			},
			{
				test:      /\.(eot|woff|woff2|ttf)$/,
				type:      'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				},
			},
			{
				test: /\.js$/,
				use:  [
					{
						loader:  'babel-loader',
						options: {
							configFile: './babel.config.json'
						}
					}],
			}
		]
	},
	optimization: {
		minimize:     false,
		runtimeChunk: 'single',
		splitChunks:  {
			chunks:               'all',
			minSize:              20000,
			minRemainingSize:     0,
			minChunks:            4,
			enforceSizeThreshold: 50000,
			cacheGroups:          {
				commons: {
					name:      'common',
					chunks:    'initial',
					minChunks: 2,
				},
			},
		},
	},
}