import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    numberOfValues: 75,
    selected: 'Bubble Sort',
    speed: 300,
    instant: false,
    sorting: false,
    cancel: false,
    choices: [
      'Bubble Sort',
      'Cocktail Shaker Sort',
      'Insertion Sort',
      'Selection Sort',
      'Bogo Sort',
      'Merge Sort',
      'Quick Sort'
    ]
  },
  mutations: {
    SET_NUMBER_OF_VALUES(state, value) {
      state.numberOfValues = value
    },
    SET_SELECTED(state, algo) {
      state.selected = algo
    },
    SET_SPEED(state, value) {
      state.speed = value
    },
    SET_INSTANT(state, bool) {
      state.instant = bool
    },
    SET_SORTING(state, bool) {
      state.sorting = bool
    },
    SET_CANCEL(state, bool) {
      state.cancel = bool
    }
  },
  actions: {
  },
  modules: {
  }
})
