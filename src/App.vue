<template>
  <v-app>
  <v-app-bar v-if="!$router.currentRoute.value.path.includes('/login')">
    <v-app-bar-nav-icon :icon="showDrawer ? 'mdi-chevron-left' : 'mdi-chevron-right'" @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title class="text-lg-left">DownLoan</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer v-if="!$router.currentRoute.value.path.includes('/login')" expand-on-hover rail :model-value="showDrawer">
      <v-list>
        <v-list-item class="text-lg-left" title="Dashboard" prepend-icon="mdi-view-dashboard-variant-outline" @click="$router.push({name: 'DashBoard'})"></v-list-item>
        <v-list-item class="text-lg-left" title="Transactions" prepend-icon="mdi-cash-register" @click="$router.push({name: 'Transaction'})"></v-list-item>
        <v-list-item class="text-lg-left" title="Settings" prepend-icon="mdi-cog" @click="$router.push({name: 'Settings'})"></v-list-item>
      </v-list>
  </v-navigation-drawer>
  <v-main class="pt-2 pt-md-0">
    <router-view />
  </v-main>
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
  },
  data() {
    return {
      showDrawer: true,
    }
  },
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    }
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
