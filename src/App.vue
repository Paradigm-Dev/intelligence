<template>
  <v-app>
    <!-- System toolbar -->
    <v-system-bar
      v-if="process.platform != 'darwin'"
      app
      window
      style="-webkit-app-region: drag; -webkit-user-select: none;"
      height="38"
      :color="$root.user ? '#06224B' : 'transparent'"
      class="pr-0"
    >
      <v-fade-transition group leave-absolute>
        <div
          key="logo"
          v-if="!$root.notify.is"
          style="display: inline-flex !important; margin-left: 2px;"
        >
          <img
            src="./assets/logo.png"
            style="margin-right: 4px; margin-top: 3px; height: 18px;"
          />
          <span style="margin-top: 2px;">Intelligence</span>
          <!-- <span class="font-weight-light grey--text lighten-2 mr-2 hidden-xs-only">early-access beta</span> -->
          <v-btn
            text
            small
            color="grey lighten-1"
            class="ml-2"
            @click="saveDocument()"
            v-if="$root.data"
            >Save</v-btn
          >
          <v-btn
            text
            small
            color="grey lighten-1"
            @click="
              saveDocument();
              newDocument();
            "
            v-if="$root.data"
            >New</v-btn
          >
          <v-btn text small color="grey lighten-1" v-if="$root.data"
            >Open</v-btn
          >
          <v-btn
            text
            small
            color="grey lighten-1"
            @click="
              saveDocument();
              $root.data = false;
            "
            v-if="$root.data"
            >Back</v-btn
          >
        </div>
        <span
          key="notification"
          v-if="$root.notify.is"
          v-html="$root.notify.text"
        ></span>
      </v-fade-transition>
      <v-spacer></v-spacer>
      <div style="-webkit-app-region: no-drag; margin-bottom: 1px;">
        <v-icon @click="minimize()" v-ripple class="toolbar-icon"
          >mdi-minus</v-icon
        >
        <v-icon
          @click="maximized ? unmaximize() : maximize()"
          v-ripple
          class="toolbar-icon"
          >mdi-crop-square</v-icon
        >
        <v-icon @click="close()" v-ripple class="toolbar-icon"
          >mdi-close</v-icon
        >
      </div>
    </v-system-bar>

    <v-system-bar
      v-if="process.platform == 'darwin'"
      app
      window
      style="-webkit-app-region: drag;"
      height="38"
      :color="$root.user ? '#06224B' : 'transparent'"
    >
      <div
        style="height: 12px; width: 12px; border-radius: 12px;"
        v-ripple
        @click="close()"
        class="red mx-1"
      ></div>
      <div
        style="height: 12px; width: 12px; border-radius: 12px;"
        v-ripple
        @click="minimize()"
        class="yellow darken-2 mx-1"
      ></div>
      <div
        style="height: 12px; width: 12px; border-radius: 12px;"
        v-ripple
        @click="maximized ? unmaximize() : maximize()"
        class="green mx-1"
      ></div>
      <v-fade-transition group leave-absolute style="margin: 4px 4px 0px 10px;">
        <div
          key="logo"
          v-if="!$root.notify.is"
          style="display: inline-flex !important;"
        >
          <img
            src="./assets/logo.png"
            style="height: 24px; margin-right: 4px; margin-top: 1px;"
          />
          <span style="margin-right: 4px; margin-top: 3px;">Intelligence</span>
          <v-btn
            text
            small
            color="grey lighten-1"
            class="ml-2"
            @click="saveDocument()"
            v-if="$root.data"
            >Save</v-btn
          >
          <v-btn
            text
            small
            color="grey lighten-1"
            @click="
              saveDocument();
              newDocument();
            "
            v-if="$root.data"
            >New</v-btn
          >
          <v-btn text small color="grey lighten-1" v-if="$root.data"
            >Open</v-btn
          >
          <v-btn
            text
            small
            color="grey lighten-1"
            @click="
              saveDocument();
              $root.data = false;
            "
            v-if="$root.data"
            >Back</v-btn
          >
          <!-- <span class="font-weight-light grey--text lighten-2 mr-2 hidden-xs-only">early-access beta</span> -->
        </div>
        <p
          key="notification"
          v-if="$root.notify.is"
          class="mb-1"
          v-html="$root.notify.text"
        ></p>
      </v-fade-transition>
    </v-system-bar>

    <!-- Site content -->
    <v-slide-x-transition group hide-on-leave>
      <v-main v-if="!$root.user" key="login">
        <div class="max-w-md mx-auto py-20">
          <img class="h-32 mx-auto" src="./assets/paradigm.png" />

          <v-card
            class="w-full mt-10"
            color="#333333"
            style="border: none !important;"
          >
            <v-card-title>
              <h1 class="text-h4 grey--text text--lighten-1">
                Sign in to your account
              </h1>
              <p
                class="text--grey text--darken-4 font-weight-light ma-0 subtitle-2"
              >
                Or <a class="text--grey text--darken-4"> create an account</a>
              </p></v-card-title
            >
            <v-card-text>
              <v-text-field
                hide-details
                label="Username"
                class="mb-3"
                v-model="username"
              ></v-text-field>
              <v-text-field
                hide-details
                label="Password"
                class="mb-6"
                type="password"
                @keypress.enter="signIn()"
                v-model="password"
              ></v-text-field>
              <v-btn
                block
                color="deep-purple darken-4"
                @click="signIn()"
                :disabled="!username || !password"
                >Sign in</v-btn
              >
            </v-card-text>

            <v-card-actions class="grey darken-4 pa-7">
              <p
                class="ma-auto subtitle-2 text-center font-weight-light text--grey text--darken-4"
              >
                Forgot your credentials?
                <a class="text--grey text--darken-4"> Enter account recovery</a>
              </p>
            </v-card-actions>
          </v-card>
        </div>
      </v-main>

      <v-main v-if="!$root.data && $root.user" key="home">
        <v-container>
          <h1 class="display-2 font-weight-light mt-6">
            Welcome,
            <span :style="{ color: $root.user.color }">{{
              $root.user.username
            }}</span
            >!
          </h1>
          <p class="grey--text">
            Not {{ $root.user.username }}?
            <a @click="$root.user = false">Sign out</a>.
          </p>
          <v-row>
            <v-col sm="6">
              <v-btn x-large @click="newDocument()"
                ><v-icon left>mdi-plus</v-icon>New</v-btn
              >
            </v-col>
            <v-col sm="6" class="pa-0">
              <v-row align="center">
                <v-col sm="10">
                  <span class="grey--text">Open...</span>
                </v-col>
                <v-col sm="2" class="text-right">
                  <v-btn icon @click="refreshFiles()"
                    ><v-icon color="grey">mdi-reload</v-icon></v-btn
                  >
                </v-col>
              </v-row>
              <v-list>
                <v-list-item
                  v-for="(file, index) in filteredFileList"
                  @click="openDocument(file)"
                  :key="index"
                >
                  <v-list-item-title>{{ file.name }}</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="filteredFileList.length < 1">
                  <v-list-item-title class="text-center grey--text font-italic"
                    >You have no files</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-main v-if="$root.data && $root.user" key="editor">
        <v-toolbar color="#06224B" dense ref="writetoolbar">
          <v-tabs
            show-arrows
            color="grey lighten-2"
            v-model="tab"
            background-color="transparent"
          >
            <v-tab>Home</v-tab>
            <v-tab>Data</v-tab>
            <v-tab>Files</v-tab>
            <!-- <v-tab>Relationships</v-tab> -->
            <v-tab>Logs</v-tab>
            <v-tab>Help</v-tab>
            <v-tabs-slider></v-tabs-slider>
          </v-tabs>
        </v-toolbar>

        <v-container>
          <v-tabs-items class="transparent" style="width: 100%;" v-model="tab">
            <v-tab-item><Home /></v-tab-item>
            <v-tab-item><Data /></v-tab-item>
            <v-tab-item><Files /></v-tab-item>
            <v-tab-item><Logs /></v-tab-item>
            <v-tab-item><Help /></v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-main>
    </v-slide-x-transition>
  </v-app>
</template>

<script>
import { remote } from "electron";
import axios from "axios";

import Home from "./pages/Home";
import Data from "./pages/Data";
import Files from "./pages/Files";
import Logs from "./pages/Logs";
import Help from "./pages/Help";

export default {
  name: "app",
  components: {
    Home,
    Data,
    Files,
    Logs,
    Help,
  },
  data() {
    return {
      win: remote.getCurrentWindow(),
      maximized: remote.getCurrentWindow().isMaximized(),
      process,
      username: "",
      password: "",
      tab: 0,
      console,
    };
  },
  computed: {
    filteredFileList() {
      let files = [];
      for (let i = 0; i < this.$root.user.files.length; i++) {
        if (this.$root.user.files[i].type == "workshop/intel")
          files.push(this.$root.user.files[i]);
      }
      return files;
    },
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

    signIn() {
      axios
        .post("https://www.theparadigmdev.com/api/users/signin", {
          username: this.username.toLowerCase(),
          password: this.password,
        })
        .then((response) => {
          if (!response.data.msg) {
            this.$root.user = response.data;
            this.username = "";
            this.password = "";
          } else {
            this.$notify(`<span class="red--text">${response.data.msg}</span>`);
          }
        })
        .catch((error) => console.error(JSON.stringify(error)));
    },
    refreshFiles() {
      axios
        .get(
          `https://www.theparadigmdev.com/api/drawer/${this.$root.user._id}/list`
        )
        .then((response) => (this.$root.user.files = response.data))
        .catch((error) => console.error(error));
    },
  },
  created() {
    document.addEventListener("keydown", (event) => {
      if (event.metaKey || event.ctrlKey) {
        if (event.code == "KeyS" && this.$root.data) this.saveDocument();
      }
    });
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

* {
  outline: none;
}
</style>
