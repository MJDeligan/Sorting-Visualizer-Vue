<template>
  <v-app dark >
    <v-navigation-drawer
      app
      v-model="drawer"
      bottom
      temporary
      hide-overlay
      :width="!$vuetify.breakpoint.mobile ? '512' : ''"
      tag="div"
      class="nav-drawer"
    >
      <SortControls @drawer="drawer = !drawer" />
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
      
    </v-app-bar>

    <v-main
      app
    >
      <div class="text-center text-h4 pt-6 font-weight-bold">{{ $store.state.selected }}</div>
      <SortWrapper @drawer="drawer = !drawer" />
    </v-main>
    <v-bottom-navigation
      app
      grow
      absolute
      fixed
    >
      <v-btn
        @click="sort"
        :disabled="disable"
      >
        <span>Sort</span>
        <v-icon>mdi-sort-variant</v-icon>
      </v-btn>
      <v-btn
        @click="cancel"
        :disabled="!$store.state.sorting"
      >
        <span>Cancel</span>
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
      <v-btn
        @click="refresh"
        :disabled="$store.state.sorting"
      >
        <span>New Values</span>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn
        @click="shuffle"
        :disabled="$store.state.sorting"
      >
        <span>Shuffle</span>
        <v-icon>mdi-shuffle-variant</v-icon>
      </v-btn>
      <v-btn
        @click="drawer = !drawer"
      >
        <span>Controls</span>
        <v-icon>mdi-tune</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style>
body {
  font-family: Arial, Helvetica, sans-serif
}
.nav-drawer {
  border-top: 1px solid #ccc;
}
</style>
<script>
import { bus } from './main'
import SortWrapper from './components/SortWrapper';
import SortControls from './components/SortControls'

export default {
  name: 'App',

  components: {
    SortWrapper,
    SortControls
  },

  data: () => ({
    title: 'Sorting Visualizer',
    drawer: null
  }),
  computed: {
    disable() {
      return this.$store.state.sorting || this.$store.state.selected === 'Choose Algorithm'
    }
  },
  methods: {
    sort () {
      bus.$emit('sort')
    },
    shuffle () {
      bus.$emit('shuffle')
    },
    refresh () {
      bus.$emit('refresh')
    },
    cancel () {
      this.$store.commit('SET_CANCEL', true)
    }
  }
};
</script>
