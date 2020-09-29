<template>
  <div>
    <v-list dense class="transparent">
      <v-list-item
        @click="
          edit_dialog = {
            open: true,
            object: JSON.parse(JSON.stringify(item)),
            index,
          }
        "
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
      @click:outside="new_item = { type: '' }"
    >
      <v-card v-if="!new_item.type">
        <v-card-title class="text-2xl font-weight-regular">
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

      <v-card v-if="new_item.type">
        <v-card-title class="text-2xl font-weight-regular">
          New {{ new_item.type }}
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Key
                  </th>
                  <th class="text-left">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) of new_item" :key="key">
                  <td>{{ key }}</td>
                  <td>
                    <input
                      v-model="new_item[key]"
                      placeholder="Value"
                      :disabled="key == 'type'"
                      class="w-full"
                    />
                  </td>
                </tr>
                <!-- <tr>
                  <td>
                                        <input
                      v-model="new_item[key]"
                      placeholder="Value"
                      :disabled="key == 'type'"
                    />

                  </td>
                  <td>
                    <input
                      v-model="new_item[key]"
                      placeholder="Value"
                      :disabled="key == 'type'"
                    />
                  </td>
                </tr>
 -->
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
      @click:outside="edit_dialog = { open: false }"
    >
      <v-card>
        <v-card-title class="text-2xl font-weight-regular">
          Edit {{ edit_dialog.object.type }}
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Key
                  </th>
                  <th class="text-left">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) of edit_dialog.object" :key="key">
                  <td>{{ key }}</td>
                  <td>
                    <input
                      v-model="edit_dialog.object[key]"
                      placeholder="Value"
                      :disabled="key == 'type'"
                      class="w-full"
                    />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-card-actions>
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
      JSON,
    };
  },
  methods: {
    saveNewObject() {
      this.$root.data.data.push(this.new_item);
      this.new_item = {
        type: "",
      };
      this.new_dialog = false;
      this.saveDocument();
    },
    stageNewObject(type) {
      this.new_item = {
        type: type.title,
      };
      for (let i = 0; i < type.keys.length; i++) {
        this.new_item[type.keys[i]] = "";
      }
    },
  },
};
</script>

<style scoped></style>
