<template>
  <v-ons-page>
    <custom-toolbar>Page 1</custom-toolbar>
    <p style="text-align: center">
      <v-ons-button @click="openYouTubeLikeModal">YouTube Like Modal</v-ons-button>
    </p>
    <p style="text-align: center">
      <v-ons-button @click="openHalfModal">iOS13 Half Modal</v-ons-button>
    </p>
  </v-ons-page>
</template>

<script>
  import customToolbar from './CustomToolbar';
  import page2 from './Page2';
  import { eventEmitter as playerModalEventEmitter } from './PlayerModal';
  import { controller as modalController } from './HalfModal';

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
      openYouTubeLikeModal() {
        playerModalEventEmitter.$emit('open');
      },
      openHalfModal() {
        modalController.$emit('open');
      }
    },
    props: ['pageStack'],
    components: { customToolbar },
    key: 'key_page1',
  }
</script>
