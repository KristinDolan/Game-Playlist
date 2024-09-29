const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'client/index.js'), // Corrected relative path
    output: {
        path: path.resolve(__dirname, 'server/public'), // Using path.resolve for consistency
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Match both .js and .jsx files
                exclude: /node_modules/, // Corrected typo
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'] // Added preset-env for modern JavaScript
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'] // Resolve both .js and .jsx extensions
    },
};