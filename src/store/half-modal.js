export default {
  namespaced: true,
  state: {
    shown: false,
    windowHeight: null,
    pageTop: 0,
    dragging: false
  },
  mutations: {
    setShown (state, shown) {
      state.shown = shown
    },
    setPageTop (state, pageTop) {
      state.pageTop = pageTop
    },
    setDragging (state, dragging) {
      state.dragging = dragging
    },
    setWindowHeight (state, windowHeight) {
      state.windowHeight = windowHeight
    }
  },
  getters: {
    shown: state => state.shown,
    windowHeight: state => state.windowHeight,
    pageTop: state => state.pageTop,
    dragging: state => state.dragging
  }
}
