<template>
  <v-app>
    <!-- System toolbar -->
    <v-system-bar
      v-if="process.platform == 'win32'"
      app
      window
      style="-webkit-app-region: drag;"
      class="deep-purple elevation-4"
    >
      <v-img src="./assets/logo.png" style="margin-right: 4px;" />
      <span style="margin-right: 4px">Electron Template</span>
      <v-spacer></v-spacer>
      <div style="-webkit-app-region: no-drag;" class="mr-n2">
        <v-icon @click="minimize()" v-ripple class="appbar-icon"
          >mdi-minus</v-icon
        >
        <v-icon
          @click="maximized ? unmaximize() : maximize()"
          v-ripple
          class="appbar-icon"
          >mdi-crop-square</v-icon
        >
        <v-icon @click="close()" v-ripple class="appbar-icon">mdi-close</v-icon>
      </div>
    </v-system-bar>

    <v-system-bar
      v-if="process.platform == 'darwin'"
      app
      window
      style="-webkit-app-region: drag;"
      height="38"
      class="deep-purple elevation-4"
    >
      <img
        @click.left="reload()"
        src="./assets/logo.png"
        height="18"
        style="margin: 2px 4px 0px 70px;"
      />
      <span style="margin-right: 4px">Electron Template</span>
    </v-system-bar>

    <!-- Site content -->
    <v-main>
      <PageName />
    </v-main>

    <!-- Snackbar -->
    <v-snackbar v-model="$root.snackbar" bottom right :timeout="2000">{{
      $root.feedback
    }}</v-snackbar>
  </v-app>
</template>

<script>
const remote = require("electron").remote;
import PageName from "./components/PageName";

export default {
  name: "app",
  components: {
    PageName,
  },
  data() {
    return {
      win: remote.getCurrentWindow(),
      maximized: remote.getCurrentWindow().isMaximized(),
      process: process,
    };
  },
  methods: {
    close() {
      this.win.close();
    },
    maximize() {
      this.win.maximize();
      this.maximized = remote.getCurrentWindow().isMaximized();
    },
    unmaximize() {
      this.win.unmaximize();
      this.maximized = remote.getCurrentWindow().isMaximized();
    },
    minimize() {
      this.win.minimize();
    },
  },
};
</script>

<style>
/* Scrollbar */

/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(33, 33, 33);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(100, 100, 100);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(60, 60, 60);
}

/* Corner */
::-webkit-scrollbar-corner {
  background: rgb(33, 33, 33);
}

html {
  overflow-y: auto !important;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.appbar-icon {
  border-radius: 100px;
}

.centralize {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
