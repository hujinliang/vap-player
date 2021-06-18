/**
 * @describe vue-cli 配置文件
 */
const path = require("path");
const webpack = require("webpack");

let plugins = [
  new webpack.DefinePlugin({
    "process.env.FLUENTFFMPEG_COV": false
  })
];

module.exports = {
  lintOnSave: true, // 取消 eslint 验证
  configureWebpack: {
    node: {
      __dirname: process.env.NODE_ENV !== "production",
      __filename: process.env.NODE_ENV !== "production"
    },
    plugins
  },
  chainWebpack: config => {
    config.module
      .rule("varialbes")
      .test(/\.node$/)
      .use("node-loader")
      .loader("node-loader")
      .end();
    const svgRule = config.module.rule('svg')
    const prunedSvgIconPath = path.resolve(__dirname, './src/assets/svg/icons/pruned')
    const unitedSvgIconPath = path.resolve(__dirname, './src/assets/svg/icons/united')
    // 先清除掉默认的 svg rule
    svgRule.uses.clear()

    config.module.rule('pruned-svg')
        .test(/\.svg$/)
        .include.add(prunedSvgIconPath).end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
        .use('svgo-loader')
        .loader('svgo-loader')
        .options({
          plugins: [{ removeTitle: true }, { removeAttrs: { attrs: ['fill', 'stroke'] } }]
        })
        .end()

    config.module.rule('united-svg')
        .test(/\.svg$/)
        .include.add(unitedSvgIconPath).end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })

    // 这里需要注意，因为上面我们清除了针对 svg 的 loader，然后指定了某个目录下的 svg 使用 svg-sprite-loader
    // 这里会有个问题就是，其他目录的 svg 没有被 loader 处理，所以我们需要针对其他目录的 svg 采用 file-loader（默认）
    const svgIconPath = path.resolve(__dirname, './src/assets/svg/icons')
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
        .test(/\.svg$/)
        .exclude.add(svgIconPath).end()
        .use('file-loader')
        .loader('file-loader')
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "vap-player",
        appId: "com.vap.vap-player",
        "publish": [
          {
            "provider": "generic",
            "url": ""
          }
        ],
        mac: {
          icon: "public/icon.png",
          target: ["dmg", "zip"],
          type: "distribution",
        },
        win: {
          icon: "public/icon.png",
          "artifactName": "vap-player_${version}.${ext}",
          target: [
            {
              target: "nsis",
              arch: ["ia32"]
            }
          ]
        },
        "nsis": {
          "perMachine": true,
          "oneClick": false,
          "createDesktopShortcut": "always",
          "allowToChangeInstallationDirectory": true,
          "guid": "vap-player"
        }
      }
    }
  }
};
