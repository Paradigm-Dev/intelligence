<template>
  <div>
    <v-toolbar color="blue darken-3" dense>
      <!-- Doc bar items -->
      <span>Any text that you want here</span>
      <!-- <input type="text" v-model="data.title" placeholder="Untitled document" class="doc-title" >
      <v-spacer></v-spacer>
      <v-btn @click="newDocument()" icon><v-icon>mdi-file-document-box-plus</v-icon></v-btn>
      <v-btn @click="$notify('Function not implemented')" icon><v-icon>mdi-printer</v-icon></v-btn>
      <v-btn @click="open_dialog = true" icon><v-icon>mdi-folder-open</v-icon></v-btn>
      <v-btn @click="saveDocument()" icon><v-icon>mdi-content-save</v-icon></v-btn> -->
    </v-toolbar>

    <v-toolbar color="blue darken-2" dense ref="writetoolbar">
      <!-- Toolbar items -->
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon><v-icon>mdi-format-text-variant</v-icon></v-btn>
        </template>
        <v-list dense>
          <v-list-item
            @click="
              data.blocks.push({
                type: 'text',
                content: '',
                format: {
                  b: false,
                  i: false,
                  ul: false,
                  str: false,
                  ol: false,
                  align: 'left',
                  font: 'Roboto',
                  color: '#FFFFFF',
                  just: 'top',
                },
                index: data.blocks.length,
                rows: 3,
              })
            "
          >
            <v-list-item-title
              ><v-icon>mdi-format-paragraph</v-icon></v-list-item-title
            >
          </v-list-item>

          <v-list-item
            @click="
              data.blocks.push({
                type: 'header',
                content: '',
                format: {
                  b: false,
                  i: false,
                  ul: false,
                  str: false,
                  ol: false,
                  align: 'left',
                  font: 'Roboto',
                  color: '#FFFFFF',
                  just: 'top',
                },
                index: data.blocks.length,
                size: 1,
                rows: 1,
              })
            "
          >
            <v-list-item-title
              ><v-icon>mdi-format-header-1</v-icon></v-list-item-title
            >
          </v-list-item>

          <v-list-item
            @click="
              data.blocks.push({
                type: 'header',
                content: '',
                format: {
                  b: false,
                  i: false,
                  ul: false,
                  str: false,
                  ol: false,
                  align: 'left',
                  font: 'Roboto',
                  color: '#FFFFFF',
                  just: 'top',
                },
                index: data.blocks.length,
                size: 2,
                rows: 1,
              })
            "
          >
            <v-list-item-title
              ><v-icon>mdi-format-header-2</v-icon></v-list-item-title
            >
          </v-list-item>

          <v-list-item
            @click="
              data.blocks.push({
                type: 'header',
                content: '',
                format: {
                  b: false,
                  i: false,
                  ul: false,
                  str: false,
                  ol: false,
                  align: 'left',
                  font: 'Roboto',
                  color: '#FFFFFF',
                  just: 'top',
                },
                index: data.blocks.length,
                size: 3,
                rows: 1,
              })
            "
          >
            <v-list-item-title
              ><v-icon>mdi-format-header-3</v-icon></v-list-item-title
            >
          </v-list-item>

          <v-list-item
            @click="
              data.blocks.push({
                type: 'header',
                content: '',
                format: {
                  b: false,
                  i: false,
                  ul: false,
                  str: false,
                  ol: false,
                  align: 'left',
                  font: 'Roboto',
                  color: '#FFFFFF',
                  just: 'top',
                },
                index: data.blocks.length,
                size: 4,
                rows: 1,
              })
            "
          >
            <v-list-item-title
              ><v-icon>mdi-format-header-4</v-icon></v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-container>
      <!-- Content of the page -->
      <h1>Page content</h1>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PageName",
  data() {
    return {
      // Page data
    };
  },
  methods: {
    // Page functions
  },
};
</script>

<style scoped>
/* Page styles */
</style>
