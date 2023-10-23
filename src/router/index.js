import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "./../views/HelloWorld.vue";
import Sandbox from "./../views/Sandbox.vue";
import SignupForm from "./../views/SignupForm";
import DashBoard from "./../views/DashBoard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HelloWorld
  },
  {
    path: "/sandbox",
    name: "Sandbox",
    component: Sandbox
  },
  {
    path: "/signup",
    name: "SignupForm",
    component: SignupForm
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
