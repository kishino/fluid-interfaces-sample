<template>
  <div>
    <v-ons-navigator :page-stack="pageStack" :style="{ bottom: modalState === 'semiopen' ? '64px' : undefined }">
      <component :is="page" v-for="page in pageStack" :key="page.key" :page-stack="pageStack"></component>
    </v-ons-navigator>
    <player-modal :modalState.sync="modalState"></player-modal>
  </div>
</template>

<script>
  import page1 from './Page1';
  import playerModal from './PlayerModal';

  export default {
    data() {
      return {
        pageStack: [page1],
        modalState: 'close'
      }
    },
    computed: {
    },
    components: { playerModal }
  }
</script>
