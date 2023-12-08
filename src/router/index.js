import { createWebHistory, createRouter } from "vue-router";
import Sandbox from "./../views/Sandbox.vue";
import LogInPage from "./../views/LogInPage";
import Transaction from "./../views/Transaction.vue";
import Settings from "@/views/Settings.vue";
import { useCustomerStore } from "@/stores/customerStore";
import SignupForm from "./../components/SignupForm.vue";
import DashBoard from "./../views/DashBoards/DashBoard.vue";

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
    path: "/signupform",
    name: "SignupForm",
    component: SignupForm
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
  },
  {
    path: "/transactions",
    name: "Transaction",
    component: Transaction
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
  },
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
