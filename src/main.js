import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import App from "./App.vue";
import axios from "axios";
import Store from "./store.js";
import './assets/tailwind.css'

const store = new Store();
const opts = {
  icons: {
    iconfont: "mdi",
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
};

Vue.use(Vuetify);
Vue.mixin({
  methods: {
    $notify(text) {
      this.$root.notify.text = text;
      this.$root.notify.is = true;
      setTimeout(() => {
        this.$root.notify.text = "";
        this.$root.notify.is = false;
      }, 3000);
    },
    saveDocument() {
      if (
        this.$root.data.name.first &&
        this.$root.data.name.last &&
        this.$root.data.case_number
      ) {
        this.$root.data.title = `${this.$root.data.name.last.toUpperCase()}, ${
          this.$root.data.name.first
        } (#${this.$root.data.case_number})`;
        axios
          .post(
            `https://www.theparadigmdev.com/api/drawer/${this.$root.user._id}/upload/intel`,
            this.$root.data
          )
          .then((response) => {
            this.$notify("Saved!");
          })
          .catch((error) => console.error(error));
      } else
        this.$notify(
          '<span class="red--text">Please make sure you add a name and case number!</span>'
        );
    },
    newDocument() {
      if (this.$root.data && !this.$root.view.close_confirm_and_new) {
        this.$root.view.close_confirm_and_new = true;
      } else {
        this.$root.data = {
          name: {
            first: "",
            last: "",
          },
          files: [],
          data: [],
          relationships: [],
          logs: [],
        };
      }
    },
    async openDocument(file) {
      await axios
        .get(
          `https://www.theparadigmdev.com/api/drawer/${this.$root.user._id}/get/${file._id}`
        )
        .then((response) => {
          this.$root.data = response.data;
        })
        .catch((error) => console.error(error));
    },
  },
});

new Vue({
  render: function(h) {
    return h(App);
  },
  vuetify: new Vuetify(opts),
  data() {
    return {
      notify: {
        text: "",
        is: false,
      },
      data: false,
      user: false,
      types: [],
      view: {
        close_confirm_and_new: false,
        close_confirm_and_landing: false,
        close_confirm_and_quit: false,
        close_confirm_and_open: false,
      },
    };
  },
  created() {
    this.$root.types = store.get("objects");
  },
}).$mount("div#app");
