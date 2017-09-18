const path = require('path');

module.exports = {
    entry: {
        'main': path.resolve(__dirname, './src/index.ts')
    },

    output: {
        path: path.resolve(__dirname),
        filename: 'index.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                declaration: true,
                                outDir: 'types'
                            }
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.ts', '.js']
    }
};