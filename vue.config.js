module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      outputDir: "dist",
      removeElectronJunk: false,
      nodeIntegration: true,
      builderOptions: {
        productName: "Intelligence",
        mac: {
          darkModeSupport: true
        },
        dmg: {
          artifactName: "Intelligence-v${version}.${ext}",
          title: "Intelligence"
        },
        nsis: {
          artifactName: "Intelligence-v${version}.${ext}",
          deleteAppDataOnUninstall: true,
          shortcutName: "Intelligence",
          uninstallDisplayName: "Intelligence"
        }
      }
    }
  },
  devServer: {
    https: false,
    proxy: {
      "^/api": {
        target: "https://www.theparadigmdev.com",
        changeOrigin: true,
        ws: true,
        cookieDomainRewrite: {
          "*": ""
        }
      }
    }
  }
};
