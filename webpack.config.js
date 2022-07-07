const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
    const mode = (argv || {}).mode || 'development';
    const isLocal = mode === 'development';

    // Rules
    const JsRule = {
        test: /\.js$/,
        exclude: /node_modules/,
        use: isLocal ? [{ loader: 'babel-loader', options: { cacheDirectory: true } }] : ['babel-loader'],
    };

    const SassRule = {
        test: /\.scss|css$/,
        exclude: /node_modules/,
        use: [
            isLocal ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[name]_[local]_[hash:base64:5]',
                    },
                    importLoaders: 1,
                    sourceMap: isLocal,
                },
            },
            'sass-loader',
        ],
    };

    const LessRule = {
        test: /\.less$/,
        use: [
            isLocal ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'less-loader',
                options: { lessOptions: { javascriptEnabled: true } },
            },
        ],
    };

    const ImageRule = {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'url-loader', options: { limit: 10000 } }],
    };

    const SvgImageRule = {
        test: /\.svg$/,
        use: [{ loader: 'babel-loader' }, { loader: 'react-svg-loader', options: { jsx: true } }],
    };

    const FontRule = {
        test: /\.(eot|ttf|woff2?|otf)$/,
        use: 'file-loader',
    };

    return {
        entry: ['@babel/polyfill', './src/index.js'],
        devtool: isLocal && 'eval',
        module: {
            rules: [JsRule, SassRule, LessRule, ImageRule, SvgImageRule, FontRule],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({ template: './src/index.html' }),
            new MiniCssExtractPlugin({ filename: 'app_[chunkhash].css' }),
            new webpack.DefinePlugin({ 'process.env': { isLocal } }),
            // new BundleAnalyzerPlugin(),
        ],
        optimization: {
            minimize: !isLocal,
            minimizer: [`...`, new CssMinimizerPlugin()],
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js',
            publicPath: isLocal ? '/' : '/guestportal/',
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '__mocks-data__': path.resolve(__dirname, './__mocks-data__'),
                __mocks__: path.resolve(__dirname, './__mocks__'),
                components: path.resolve(__dirname, './src/components'),
                constants: path.resolve(__dirname, './src/constants'),
                hooks: path.resolve(__dirname, './src/hooks'),
                i18n: path.resolve(__dirname, './src/i18n'),
                images: path.resolve(__dirname, './src/images'),
                pages: path.resolve(__dirname, './src/pages'),
                services: path.resolve(__dirname, './src/services'),
                store: path.resolve(__dirname, './src/store'),
                styles: path.resolve(__dirname, './src/styles'),
                utils: path.resolve(__dirname, './src/utils'),
            },
        },
        mode,
    };
};
