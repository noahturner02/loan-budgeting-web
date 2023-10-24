import { createWebHistory, createRouter } from "vue-router";
import Sandbox from "./../views/Sandbox.vue";
import LogInPage from "./../views/LogInPage";
import DashBoard from "./../views/DashBoard.vue";
import { useCustomerStore } from "@/stores/customerStore";

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

router.beforeEach((to, from, next) => {
  const customerStore = useCustomerStore();
  if (to.name !== 'LogInPage' && !customerStore.$state.loggedIn) next({ name: 'LogInPage' })
  else next()
})

export default router;
