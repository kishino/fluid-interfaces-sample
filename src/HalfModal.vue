<template>
  <div v-if="shown">
    <div
      class="half-modal__background"
      :style="{ opacity: swipeRatio * 0.5 }"
      :class="{ dragging }"></div>
    <div
      class="half-modal__content"
      :style="{ transform: `translateY(${this.pageTop}px)` }"
      :class="{ dragging }"
      ref="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export const controller  = new Vue()

export default {
  computed: {
    shown: {
      get () {
        return this.$store.state.halfModal.shown
      },
      set (shown) {
        this.$store.commit('halfModal/setShown', shown)
      }
    },
    pageTop: {
      get () {
        return this.$store.state.halfModal.pageTop
      },
      set (pageTop) {
        this.$store.commit('halfModal/setPageTop', pageTop)
      }
    },
    swipeRatio () {
      return 1 - (this.pageTop / this.windowHeight)
    },
    dragging: {
      get () {
        return this.$store.state.halfModal.dragging
      },
      set (dragging) {
        this.$store.commit('halfModal/setDragging', dragging)
      }
    },
    windowHeight: {
      get () {
        return this.$store.state.halfModal.windowHeight
      },
      set (windowHeight) {
        this.$store.commit('halfModal/setWindowHeight', windowHeight)
      }
    }
  },
  created () {
    this.windowHeight = window.innerHeight
    this.pageTop = this.windowHeight

    controller.$on('open', this.open)
    controller.$on('close', this.close)
    controller.$on('_mounted', this._mounted)
  },
  destroyed () {
    controller.$off('open', this.open)
    controller.$off('close', this.close)
    controller.$off('_mounted', this._mounted)
  },
  methods: {
    _mounted () {
      this.$nextTick(() => {
        this.$refs.modal.addEventListener('transitionend', this.onTransitionEnd)
        setTimeout(() => {
          this.pageTop = this.windowHeight * 0.06
        }, 30)
      })
    },
    onTransitionEnd () {
      if (this.pageTop === this.windowHeight) {
        this.shown = false
      }
    },
    open () {
      this.shown = true
    },
    close () {
      this.pageTop = this.windowHeight
    }
  }
}
</script>

<style scoped>
  .half-modal__background {
    background-color: black;
    height: 100%;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    will-change: opacity;
  }
  .half-modal__content.dragging {

  }
  .half-modal__content {
    bottom: 0;
    color: #333;
    left: 0;
    overflow: hidden;
    overflow-y: auto;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 11;
    transition: transform 0.3s ease-out;
  }
  .half-modal__content.dragging {
    transition: none;
  }
</style>
