module.exports = function (api) {
    api.cache.forever();

    const presets = ['@babel/env'];
    const plugins = [
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-angularjs-annotate',
    ];
    const env = {
        test: {
            plugins: [
                'babel-plugin-istanbul',
            ],
        },
    };

    return {
        presets,
        plugins,
        env,
    };
};
