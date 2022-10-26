const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "#dc5714",
                            "@progress-default-color": "#dc5714",
                            "@progress-info-text-color": "#dc5714",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
