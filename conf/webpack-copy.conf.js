/**
 * Created by qxqs1 on 2017/4/7.
 */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const conf = require('./gulp.conf');

module.exports = function webpackCopyConf(env) {
    return {
        plugins: [
            new CopyWebpackPlugin([
                {
                    // copy GLOBs. 相对路径: context
                    context: conf.path.src('assets/'),
                    from: '**/*.woff',
                    to: 'assets/',
                    ignore: [],
                },
                {
                    // copy DIR. 相对路径: DIR/
                    from: conf.path.src('assets/images/'),
                    to: 'assets/images/',
                },
                {
                    // copy file. 相对路径: DIR/
                    from: conf.path.src('assets/media/postcss-assets.svg'),
                    to: 'assets/media/',
                },
            ], {
                ignore: [],
                debug: false,
            }),
        ],
    };
};
