<template>
  <div>
    <div class="text-center">
      <v-img
        @click="primary_pic_selector = true"
        src="../assets/default.png"
        v-if="$root.data.files.findIndex((file) => file.primary) == -1"
        class="rounded-full mx-auto mb-4 mt-12"
        height="200"
        width="200"
        v-ripple
      />
      <v-img
        @click="primary_pic_selector = true"
        :src="$root.data.files.find((file) => file.primary).uri"
        v-else
        class="rounded-full mx-auto mb-4 mt-12"
        height="200"
        width="200"
        v-ripple
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
        class="text-4xl font-bold uppercase w-auto text-center mx-auto"
        placeholder="Last Name"
      /><br />
      <input
        type="text"
        v-model="$root.data.name.first"
        class="text-2xl font-medium text-center mx-auto"
        placeholder="First Name"
      /><br />
      <input
        type="text"
        v-model="$root.data.case_number"
        class="text-center mx-auto"
        placeholder="Case Number"
      />
    </div>

    <v-dialog max-width="750" v-model="primary_pic_selector">
      <v-card>
        <v-card-title class="text-2xl font-weight-regular">
          Choose Primary Image
        </v-card-title>

        <v-list dense>
          <v-list-item
            @click="setPrimaryImage(file)"
            v-for="(file, index) in $root.data.files.filter((file) =>
              file.type.includes('image')
            )"
            :key="index"
          >
            <v-list-item-avatar>
              <v-img :src="file.uri"></v-img>
            </v-list-item-avatar>
            <v-list-item-title>{{ file.name }}</v-list-item-title>
          </v-list-item>

          <p
            v-if="
              $root.data.files.filter((file) => file.type.includes('image'))
                .length < 1
            "
            class="font-weight-regular text-center"
          >
            No images
          </p>
        </v-list>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      primary_pic_selector: false,
    };
  },
  methods: {
    setPrimaryImage(image) {
      if (this.$root.data.files.find((file) => file.primary))
        this.$root.data.files.find((file) => file.primary).primary = false;
      image.primary = true;
    },
  },
};
</script>

<style scoped>
/* Page styles */
</style>
