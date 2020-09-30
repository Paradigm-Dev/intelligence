import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Store from "./store.js";
import axios from "axios";

const store = new Store();

Vue.config.productionTip = false;

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
  vuetify,
  render: (h) => h(App),
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
}).$mount("#app");
