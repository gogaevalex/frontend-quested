const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
	entry: ['react-hot-loader/patch', './src/index.jsx'],
	output: {
		path: path.join(__dirname, '/dist'),
		publicPath: '/',
		filename: 'index_bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'react-svg-loader',
						options: {
							jsx: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, 'src/'),
			'@redux': path.resolve(__dirname, 'src/redux/'),
			'@layouts': path.resolve(__dirname, 'src/layouts/'),
			'@ui': path.resolve(__dirname, 'src/ui/'),
			'@utils': path.resolve(__dirname, 'src/utils/'),
			'@pages': path.resolve(__dirname, 'src/pages/'),
		},

		extensions: ['.js', '.jsx'],
		modules: ['node_modules'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			path: '/'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			'React': 'react',
			'pt': 'prop-types',
		}),


	],
	devServer: {
		static: {
			directory: path.join(__dirname, './'),
		},
		historyApiFallback: true,
		compress: true,
		port: 3000,
		host: '0.0.0.0',
    },

};