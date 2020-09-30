<template>
  <div class="tw-max-w-xl mx-auto">
    <v-textarea
      class="mt-5"
      solo
      label="New Log (shift + enter to save)"
      v-model="new_log"
      no-resize
      auto-grow
      @keypress.shift.enter="saveLog()"
    ></v-textarea>

    <p class="text-center" v-if="$root.data.logs.length < 1">No logs</p>

    <v-card v-for="(log, index) in $root.data.logs" :key="index" class="mb-8">
      <v-card-title class="tw-text-lg font-weight-regular">
        {{ log.date }}
      </v-card-title>

      <v-card-text>
        {{ log.content }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Log",
  data() {
    return {
      new_log: "",
    };
  },
  methods: {
    saveLog() {
      let data = {
        date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
        content: this.new_log,
      };
      this.$root.data.logs.push(data);
      this.new_log = "";
    },
  },
};
</script>

<style scoped></style>
