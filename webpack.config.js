const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = process.env.NODE_ENV;
module.exports = {
	mode: env || 'development',
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {minimize: true}
					}
				]
			},
			{
				test: /\.css$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}]
			},
		]
	},
	devServer: {
		historyApiFallback: true,
		compress: true,
		port: 9000,
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, 'src', 'index.html'),
			filename: './index.html'
		}),
	]
};
