import { controller as modalController } from './HalfModal'

export default {
  data () {
    return {
      startY: 0,
      startPageTop: 0,
      scrolling: false
    }
  },
  computed: {
    pageTop: {
      get () {
        return this.$store.state.halfModal.pageTop
      },
      set (pageTop) {
        this.$store.commit('halfModal/setPageTop', pageTop)
      }
    },
    dragging: {
      get () {
        return this.$store.state.halfModal.dragging
      },
      set (dragging) {
        this.$store.commit('halfModal/setDragging', dragging)
      }
    },
    windowHeight () {
      return this.$store.state.halfModal.windowHeight
    }
  },
  mounted () {
    this.$el.style.bottom = `${this.windowHeight * 0.06}px`

    const pageContent = this.$el.querySelector('.page__content')
    pageContent.addEventListener('touchstart', (e) => this.onTouchStart(e, pageContent))
    pageContent.addEventListener('touchmove', this.onTouchMove)
    pageContent.addEventListener('touchend', this.onTouchEnd)

    const toolbar = this.$el.querySelector('ons-toolbar')
    if (toolbar) {
      toolbar.addEventListener('touchstart', (e) => this.onTouchStart(e, toolbar))
      toolbar.addEventListener('touchmove', this.onTouchMove)
      toolbar.addEventListener('touchend', this.onTouchEnd)
    }

    modalController.$emit('_mounted')
  },
  destroyed () {
  },
  methods: {
    onTouchStart(e, root) {
      if (root.scrollTop !== 0) {
        this.scrolling = true
        return
      }
      this.startY = e.changedTouches[0].clientY
      this.startPageTop = this.pageTop
    },
    onTouchMove(e) {
      if (this.scrolling) return
      this.dragging = true

      const pageTop = this.startPageTop + e.changedTouches[0].clientY - this.startY
      if (pageTop >= this.windowHeight * 0.06 && pageTop <= this.windowHeight) {
        this.pageTop = pageTop
        e.preventDefault()
      }
    },
    onTouchEnd(e) {
      if (this.scrolling) {
        this.scrolling = false
        return
      }
      if (this.pageTop > this.windowHeight * 0.3) {
        modalController.$emit('close')
      } else {
        this.pageTop = this.windowHeight * 0.06
      }
      this.dragging = false
    }
  }
}
