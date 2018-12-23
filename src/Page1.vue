<template>
  <v-ons-page>
    <custom-toolbar>Page 1</custom-toolbar>
    <p style="text-align: center">
      <v-ons-button @click="openModal">Modal</v-ons-button>
    </p>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import page2 from './Page2';
  import { playerModalEvent } from './PlayerModal';

  export default {
    computed: {
    },
    methods: {
      pop() {
        this.pageStack.pop();
      },
      push() {
        this.pageStack.push(page2);
      },
      openModal() {
        playerModalEvent.$emit('open');
      }
    },
    props: ['pageStack'],
    components: { customToolbar },
    key: 'key_page1',
  }
</script>
