const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .webpackConfig(webpack => {
        return {
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: 'ts-loader',
                        exclude: /node_modules/
                    }
                ],
            },
            resolve: {
                extensions: ['*', '.js', '.jsx', '.ts', '.tsx']
            },
            plugins: [
                new LiveReloadPlugin()
            ]
        }
    })
    .js('resources/assets/js/app.ts', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css');
