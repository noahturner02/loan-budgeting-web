<template>
  <v-app>
  <v-app-bar v-if="!this.$router.currentRoute.value.path.includes('/login')">
  <v-app-bar-nav-icon append-icon="mdi-check-circle"></v-app-bar-nav-icon>
  </v-app-bar>
  <router-view />
  </v-app>
</template>

<script>
import { VApp, VAppBar } from 'vuetify/lib/components/index.mjs'
import { RouterView } from 'vue-router';
export default {
  name: "App",
  components: {
    VApp,
    VAppBar,
    RouterView
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
