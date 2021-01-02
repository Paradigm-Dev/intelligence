<template>
  <div>
    <v-list dense class="transparent">
      <v-list-item
        @click="beginEditing(item)"
        v-for="(item, index) in $root.data.data"
        :key="index"
      >
        <v-list-item-icon
          ><v-icon>{{
            $root.types.find((type) => type.title == item.type).icon
          }}</v-icon></v-list-item-icon
        >
        <v-list-item-title>
          <v-row>
            <v-col sm="3">{{ item.type }}</v-col>
            <v-col sm="9" class="grey--text">{{
              item[$root.types.find((type) => type.title == item.type).preview]
            }}</v-col>
          </v-row>
        </v-list-item-title>
      </v-list-item>

      <p
        v-if="$root.data.data.length < 1"
        class="font-weight-regular text-center"
      >
        No objects
      </p>
    </v-list>

    <v-dialog
      v-model="new_dialog"
      max-width="1000"
      @click:outside="
        new_item.type ? saveNewObject() : (new_item = { type: '' })
      "
    >
      <v-card v-if="!new_item.type">
        <v-card-title class="text-h5 font-weight-regular">
          New Object
        </v-card-title>

        <v-list dense>
          <v-list-item
            v-for="(item, index) in $root.types"
            :key="index"
            @click="stageNewObject(item)"
          >
            <v-list-item-icon
              ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
            >
            <v-list-item-title>
              <v-row>
                <v-col sm="3">{{ item.title }}</v-col>
                <v-col sm="9" class="grey--text">{{ item.description }}</v-col>
              </v-row>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>

      <v-card v-if="newItem.type">
        <v-card-title class="text-h5 font-weight-regular">
          New {{ newItem.type }}
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Key</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) of newItem" :key="key">
                  <td>{{ key }}</td>
                  <td>
                    <p
                      v-if="key == 'related file'"
                      style="width: 100%; margin: 0px"
                      @click="related_file_picker = true"
                    >
                      {{
                        newItem["related file"]
                          ? newItem["related file"]
                          : "No file selected"
                      }}
                    </p>
                    <v-checkbox
                      hide-details
                      class="ma-0 pa-0"
                      v-else-if="key.includes('?')"
                      v-model="newItem[key]"
                      :label="newItem[key] === true ? 'true' : 'false'"
                    ></v-checkbox>
                    <input
                      v-else
                      v-model="newItem[key]"
                      placeholder="Value"
                      :disabled="key == 'type'"
                      style="width: 100%"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="blue accent-1" @click="saveNewObject()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="edit_dialog.open"
      v-if="edit_dialog.object"
      max-width="1000"
      @click:outside="
        $root.data.data.splice(edit_dialog.index, 1, edit_dialog.object);
        edit_dialog = { open: false };
      "
    >
      <v-card>
        <v-card-title class="text-h5 font-weight-regular">
          Edit {{ edit_dialog.object.type }}
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Key</th>
                  <th class="text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) of edit_dialog.object" :key="key">
                  <td>{{ key }}</td>
                  <td>
                    <p
                      v-if="key == 'related file'"
                      style="width: 100%; margin: 0px"
                      @click="related_file_picker = true"
                    >
                      {{
                        edit_dialog.object["related file"]
                          ? edit_dialog.object["related file"]
                          : "No file selected"
                      }}
                    </p>
                    <v-checkbox
                      hide-details
                      class="ma-0 pa-0"
                      v-else-if="key.includes('?')"
                      v-model="edit_dialog.object[key]"
                      :label="
                        edit_dialog.object[key] === true ? 'true' : 'false'
                      "
                    ></v-checkbox>
                    <input
                      v-else
                      v-model="edit_dialog.object[key]"
                      placeholder="Value"
                      :disabled="key == 'type'"
                      style="width: 100%"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-card-actions>
          <v-btn
            icon
            :readonly="edit_dialog.object.primary"
            @click="setPrimaryObject(edit_dialog.object)"
            color="yellow"
            v-if="edit_dialog.object.type == 'Person'"
            ><v-icon>{{
              edit_dialog.object.primary ? "mdi-star" : "mdi-star-outline"
            }}</v-icon></v-btn
          >
          <v-btn
            icon
            @click="deleteObject()"
            color="red"
            :disabled="edit_dialog.object.primary"
            ><v-icon>mdi-delete</v-icon></v-btn
          >

          <v-spacer></v-spacer>
          <v-btn
            text
            color="blue accent-1"
            @click="
              $root.data.data.splice(edit_dialog.index, 1, edit_dialog.object);
              edit_dialog = { open: false };
            "
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="500" v-model="related_file_picker">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular">
          Choose Related File
        </v-card-title>

        <v-list dense>
          <v-list-item
            @click="
              edit_dialog.open === true
                ? (edit_dialog.object['related file'] = file.name)
                : (newItem['related file'] = file.name),
                (related_file_picker = false)
            "
            v-for="(file, index) in $root.data.files"
            :key="index"
          >
            <v-list-item-avatar>
              <v-img :src="file.uri"></v-img>
            </v-list-item-avatar>
            <v-list-item-title>{{ file.name }}</v-list-item-title>
          </v-list-item>

          <p
            v-if="$root.data.files.length < 1"
            class="font-weight-regular text-center"
          >
            No files
          </p>
        </v-list>
      </v-card>
    </v-dialog>

    <v-btn fab fixed bottom right color="#06224B" @click="new_dialog = true">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Data",
  data() {
    return {
      new_item: {
        type: "",
      },
      new_dialog: false,
      edit_dialog: {
        open: false,
      },
      related_file_picker: false,

      JSON,
    };
  },
  computed: {
    newItem() {
      return this.new_item;
    },
  },
  methods: {
    saveNewObject() {
      this.$root.data.data.push(this.new_item);
      this.new_item = {
        type: "",
      };
      this.new_dialog = false;
    },
    stageNewObject(type) {
      this.new_item = {
        type: type.title,
      };
      if (type == "Person") this.new_item.primary = false;
      for (let i = 0; i < type.keys.length; i++) {
        this.new_item[type.keys[i]] = "";
      }
    },
    beginEditing(object) {
      this.edit_dialog = {
        open: true,
        object: JSON.parse(JSON.stringify(object)),
        index: this.$root.data.data.findIndex((item) => item == object),
      };
    },
    deleteObject() {
      this.$root.data.data.splice(this.edit_dialog.index, 1);
      this.edit_dialog = { open: false };
    },
    setPrimaryObject(object) {
      if (this.$root.data.data.find((item) => item.primary)) {
        this.$root.data.data.find((item) => item.primary).primary = false;
      }
      this.edit_dialog.object.primary = true;
      this.$root.data.data.splice(this.edit_dialog.index, 1);
      this.$root.data.data.unshift(object);
      this.edit_dialog.index = 0;
    },
  },
};
</script>

<style scoped></style>
