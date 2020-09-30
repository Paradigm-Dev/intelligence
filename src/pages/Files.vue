<template>
  <div>
    <v-list class="transparent">
      <v-list-item v-for="(file, index) in $root.data.files" :key="index">
        <v-list-item-avatar v-if="file.type.includes('image')">
          <v-img :src="file.uri"></v-img>
        </v-list-item-avatar>
        <v-list-item-icon v-else>
          <v-icon>{{
            file.type.includes("video") ? "mdi-video" : "mdi-file"
          }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <v-row>
            <v-col sm="6">{{ file.name }}</v-col>
            <v-col sm="2" class="grey--text">{{ file.type }}</v-col>
            <v-col sm="2" class="grey--text">{{ file.size }}</v-col>
            <v-col sm="2">
              <v-btn
                color="yellow"
                x-small
                icon
                @click="setPrimaryImage(file)"
                class="mr-2"
                v-if="file.type.includes('image')"
                ><v-icon>{{
                  file.primary ? "mdi-star" : "mdi-star-outline"
                }}</v-icon></v-btn
              >
              <v-btn
                color="blue accent-1"
                x-small
                icon
                @click="window.open(file.uri)"
                class="mr-2"
                ><v-icon>mdi-download</v-icon></v-btn
              >
              <v-btn
                color="blue accent-1"
                x-small
                icon
                @click="
                  rename = JSON.parse(
                    JSON.stringify({
                      file,
                      open: true,
                      index,
                      old_name: file.name,
                    })
                  )
                "
                class="mr-2"
                ><v-icon>mdi-cursor-text</v-icon></v-btn
              >
              <v-btn
                color="red"
                x-small
                icon
                @click="$root.data.files.splice(index, 1)"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-list-item-title>
      </v-list-item>

      <p
        v-if="$root.data.files.length < 1"
        class="font-weight-regular text-center"
      >
        No files
      </p>
    </v-list>

    <v-dialog max-width="500" v-model="upload_dialog">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular">
          Add File
        </v-card-title>

        <v-card-text>
          <v-file-input
            v-model="new_file"
            label="File"
            prepend-icon=""
            hide-details
            class="mb-3"
          ></v-file-input>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue accent-1" @click="saveFile()">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="500" v-model="rename.open" v-if="rename.file">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular">
          Rename File
        </v-card-title>

        <v-card-text>
          <p class="text-center">Renaming {{ rename.old_name }}</p>
          <v-text-field
            v-model="rename.file.name"
            label="Filename"
            hide-details
            class="mb-3"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="blue accent-1"
            @click="
              $root.data.files.splice(rename.index, 1, rename.file);
              rename = { open: false };
            "
            >Rename</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn fab fixed bottom right color="#06224B" @click="upload_dialog = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import moment from "moment";
import { remote, dialog } from "electron";
import path from "path";
import fs from "fs";

export default {
  name: "Files",
  data() {
    return {
      upload_dialog: false,
      new_file: null,
      window,
      rename: {
        open: false,
      },
      JSON,
    };
  },
  methods: {
    saveFile() {
      var reader = new FileReader();
      let that = this;
      console.log(this.new_file);
      reader.onloadend = function() {
        let data = {
          uri: reader.result,
          name: that.new_file.name,
          size: that.new_file.size + "B",
          type: that.new_file.type,
          added_formatted: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
          added: Date.now(),
        };
        data.primary = false;
        that.$root.data.files.push(data);
        that.upload_dialog = false;
        that.new_file = null;
        that.saveDocument();
      };
      reader.readAsDataURL(this.new_file);
    },
    downloadFile(file) {
      const file_path = remote.dialog.showSaveDialog({
        title: "Select a file path to save file to",
        defaultPath: file.name,
        buttonLabel: "Save",
        properties: [],
      });

      if (file_path) {
        console.log(file_path);
        let buff = Buffer.from(file.uri, "base64");
        fs.writeFileSync(file_path, buff);
        console.log("Saved!");
      }
    },
    setPrimaryImage(image) {
      if (this.$root.data.files.find((file) => file.primary))
        this.$root.data.files.find((file) => file.primary).primary = false;
      image.primary = true;
    },
  },
};
</script>

<style scoped></style>
