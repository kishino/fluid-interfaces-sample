<template>
  <v-ons-page>
    <custom-toolbar :back-label="'Page 1'">Page 2</custom-toolbar>
    <div>
    </div>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';

  export default {
    methods: {
      pop() {
        this.pageStack.pop();
      }
    },
    props: ['pageStack'],
    components: { customToolbar },
    key: 'key_page2',
  }
</script>
