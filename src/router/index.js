import { createWebHistory, createRouter } from "vue-router";
import Sandbox from "./../views/Sandbox.vue";
import LogInPage from "./../views/LogInPage";
import SignupForm from "./../views/SignupForm";
import DashBoard from "./../views/DashBoard.vue";

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
  },
  {
    path: "/dashboard",
    name: "DashBoard",
    component: DashBoard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
