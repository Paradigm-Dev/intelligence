<template>
  <div>
    <div class="text-center">
      <v-btn text large @click="saveDocument()"
        ><v-icon left>mdi-content-save</v-icon>Save</v-btn
      >
      <v-btn text large @click="newDocument()"
        ><v-icon left>mdi-plus</v-icon>New</v-btn
      >
      <v-btn text large @click="open_dialog = true"
        ><v-icon left>mdi-folder-open</v-icon>Open</v-btn
      >
      <!-- <v-btn text large @click="print_dialog = true"
        ><v-icon left>mdi-printer</v-icon>Print</v-btn
      > -->
      <v-btn text large @click="$root.data = false"
        ><v-icon left>mdi-close</v-icon>Close</v-btn
      >
      <br />
      <img
        src="../assets/default.png"
        class="rounded-full mx-auto mb-4 mt-12"
        height="40"
      />
      <!-- <img
        :src="
          $root.data.files[0]
            ? $root.data.files[0].src
            : '../assets/default.png'
        "
      /><br /> -->

      <input
        type="text"
        v-model="$root.data.name.last"
        class="text-4xl font-bold uppercase w-auto text-center"
        placeholder="Last Name"
      /><br />
      <input
        type="text"
        v-model="$root.data.name.first"
        class="text-2xl font-medium text-center"
        placeholder="First Name"
      /><br />
      <input
        type="text"
        v-model="$root.data.case_number"
        class="text-center"
        placeholder="Case Number"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    // Page functions
  },
};
</script>

<style scoped>
/* Page styles */
</style>
