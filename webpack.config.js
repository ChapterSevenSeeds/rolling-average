const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
const base = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    experiments: {
        outputModule: true,
    },
    optimization: {
        minimize: false
    },
};

/**
 * @type {() => import('webpack').Configuration[]}
 */
module.exports = () => {
    return [
        {
            ...base,
            output: {
                path: path.resolve(__dirname, "dist/cjs"),
                filename: 'index.js',
                libraryTarget: 'commonjs2'
            },
        },
        {
            ...base,
            output: {
                path: path.resolve(__dirname, "dist/esm"),
                filename: 'index.js',
                libraryTarget: "module",
                chunkFormat: "module"
            },
        }
    ]
}