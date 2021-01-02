import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Store from "./store.js";
import axios from "axios";
import io from "socket.io-client";

const store = new Store();
let socket = io.connect("https://www.theparadigmdev.com");
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
      const primary_object = this.$root.data.data.find(
        object => object.primary
      );
      let array = primary_object.name.split(", ");
      if (!array[0]) array[0] = "";
      if (!array[1]) array[1] = "";

      if (primary_object.name && this.$root.data.case_number) {
        this.$root.data.title = `${array[0].toUpperCase()}${
          array[0] && array[1] ? "," : ""
        } ${array[1]} (#${this.$root.data.case_number})`;
        axios
          .post(
            `https://www.theparadigmdev.com/api/drawer/${this.$root.user._id}/upload/intel`,
            this.$root.data
          )
          .then(response => {
            this.$notify("Saved!");
            this.refreshFiles();
          })
          .catch(error => console.error(error));
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
          files: [],
          data: [
            {
              type: "Person",
              primary: true,
              name: ""
            }
          ],
          relationships: [],
          logs: []
        };
      }
    },
    async openDocument(file) {
      await axios
        .get(
          `https://www.theparadigmdev.com/api/drawer/${this.$root.user._id}/get/${file._id}`
        )
        .then(response => {
          this.$root.data = response.data;
          console.log(this.$root.data);
        })
        .catch(error => console.error(error));
    },
    refreshFiles() {
      axios
        .get(
          `https://www.theparadigmdev.com/api/drawer/${this.$root.user._id}/list`
        )
        .then(response => (this.$root.user.files = response.data))
        .catch(error => console.error(error));
    }
  }
});

new Vue({
  vuetify,
  render: h => h(App),
  data() {
    return {
      notify: {
        text: "",
        is: false
      },
      data: false,
      user: false,
      types: [],
      view: {
        close_confirm_and_new: false,
        close_confirm_and_landing: false,
        close_confirm_and_quit: false,
        close_confirm_and_open: false
      },
      socket
    };
  },
  created() {
    this.$root.types = store.get("objects");
  }
}).$mount("#app");
