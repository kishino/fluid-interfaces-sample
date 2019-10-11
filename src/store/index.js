import Vue from 'vue'
import Vuex from 'vuex'

import halfModal from './half-modal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    halfModal
  }
});
