module.exports = {
    devServer: {
        port: 8080,
        open: 'Google Chrome',
        hot: true,
    },
    pwa: {
        workboxOptions: {
            // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
            skipWaiting: true,
            clientsClaim: true,
            importWorkboxFrom: 'local',
            importsDirectory: 'js',
            navigateFallback: '/',
            navigateFallbackBlacklist: [/\/api\//]
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/shiyagare-map/'
        : '/'
}
