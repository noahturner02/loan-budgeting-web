import { createWebHistory, createRouter } from "vue-router";
import Sandbox from "./../views/Sandbox.vue";
import LogInPage from "./../views/LogInPage";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/login"
  },
  {
    path: "/sandbox",
    name: "Sandbox",
    component: Sandbox
  },
  {
    path: "/login",
    name: "LogInPage",
    component: LogInPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
