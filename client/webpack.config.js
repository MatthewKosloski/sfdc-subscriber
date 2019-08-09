const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
  	entry: './src/index.tsx',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		port: 3000,
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
    	]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
 	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Development',
			template: 'src/index.html'
		})
  	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};