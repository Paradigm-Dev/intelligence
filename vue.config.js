module.exports = {
  transpileDependencies: ["vuetify"],
  pluginOptions: {
    electronBuilder: {
      outputDir: "output",
      removeElectronJunk: false,
      nodeIntegration: true,
      icon: "build/icon.png",
      builderOptions: {
        productName: "Intelligent",
        dmg: {
          artifactName: "Intelligent-v${version}.${ext}",
          title: "Intelligent",
        },
        nsis: {
          artifactName: "Intelligent-v${version}.${ext}",
          deleteAppDataOnUninstall: true,
          shortcutName: "Intelligent",
          uninstallDisplayName: "Intelligent",
        },
      },
    },
  },
};
