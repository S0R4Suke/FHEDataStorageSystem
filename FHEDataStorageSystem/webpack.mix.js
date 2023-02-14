const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/bfv_keygenerate.js', 'public/js')
    .js('resources/js/bfv_encryption.js', 'public/js')
    .js('resources/js/bfv_decryption.js', 'public/js')
    .js('resources/js/bfv_calculation.js', 'public/js')
    .js('resources/js/ckks_keygenerate.js', 'public/js')
    .js('resources/js/ckks_encryption.js', 'public/js')
    .js('resources/js/ckks_decryption.js', 'public/js')
    .js('resources/js/ckks_calculation.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
