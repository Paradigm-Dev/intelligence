module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      outputDir: "output",
      removeElectronJunk: false,
      nodeIntegration: true,
      icon: "build/icon.png",
      builderOptions: {
        productName: "Intelligence",
        dmg: {
          artifactName: "Intelligence-v${version}.${ext}",
          title: "Intelligence",
        },
        nsis: {
          artifactName: "Intelligence-v${version}.${ext}",
          deleteAppDataOnUninstall: true,
          shortcutName: "Intelligence",
          uninstallDisplayName: "Intelligence",
        },
      },
    },
  },
};
