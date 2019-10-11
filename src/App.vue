<template>
  <div>
    <v-ons-navigator
      class="navigator"
      :page-stack="pageStack"
      :style="{ bottom: youTubeLikeModalState === 'semiopen' ? '64px' : undefined, transform: `scale(${halfModalSwipeRatio})` }"
      :class="{ 'half-modal-dragging': halfModalDragging, 'half-modal-shown': halfModalShown }">
      <component
        :is="page"
        v-for="page in pageStack"
        :key="page.key"
        :page-stack="pageStack"
        @push-page="pageStack.push($event)"></component>
    </v-ons-navigator>
    <player-modal :modalState.sync="youTubeLikeModalState"></player-modal>
    <half-modal>
      <sample-page/>
    </half-modal>
  </div>
</template>

<script>
  import page1 from './Page1';
  import playerModal from './PlayerModal';
  import halfModal from './HalfModal'
  import samplePage from './SamplePage'

  export default {
    data() {
      return {
        pageStack: [page1],
        youTubeLikeModalState: 'close',
        halfModalState: 'close'
      }
    },
    computed: {
      halfModalSwipeRatio () {
        return 0.92 + (this.$store.state.halfModal.pageTop / this.$store.state.halfModal.windowHeight) * 0.08
      },
      halfModalDragging () {
        return this.$store.state.halfModal.dragging
      },
      halfModalShown () {
        return this.$store.state.halfModal.shown
      }
    },
    components: { playerModal, halfModal, samplePage }
  }
</script>

<style>
  body {
    background-color: black;
  }
  .navigator {
    transition: transform 0.3s ease-out;
  }
  .navigator.half-modal-dragging {
    transition: none;
  }
  .navigator.half-modal-shown {
    will-change: transform;
  }
  .navigator.half-modal-shown .toolbar {
    border-radius: 6px 6px 0 0;
  }
</style>
