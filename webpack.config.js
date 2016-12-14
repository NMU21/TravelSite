module.exports = {
		entry: "./app/assets/scripts/App.js",
		output: {
			path: "./app/temp/scripts",
			filename: "App.js"
		},
		module: {
			loaders: [
			{
				loader: 'babel',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/,
				//babel does not have to convert files like jquery,...
				exclude: /node_modules/ 
			}
			
			]
		}
}