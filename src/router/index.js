import { createWebHistory, createRouter } from "vue-router";
import Sandbox from "./../views/Sandbox.vue";
import LogInPage from "./../views/LogInPage.vue";
import SignupForm from "./../components/SignupForm.vue";
import DashBoard from "./../views/DashBoards/DashBoard.vue";
import DashBoardJan from "./../views/DashBoards/DashBoardJan.vue";
import DashBoardFeb from "./../views/DashBoards/DashBoardFeb.vue";
import DashBoardMar from "./../views/DashBoards/DashBoardMar.vue";
import DashBoardApr from "./../views/DashBoards/DashBoardApr.vue";
import DashBoardMay from "./../views/DashBoards/DashBoardMay.vue";
import DashBoardJun from "./../views/DashBoards/DashBoardJun.vue";
import DashBoardJul from "./../views/DashBoards/DashBoardJul.vue";
import DashBoardAug from "./../views/DashBoards/DashBoardAug.vue";
import DashBoardSep from "./../views/DashBoards/DashBoardSep.vue";
import DashBoardOct from "./../views/DashBoards/DashBoardOct.vue";
import DashBoardNov from "./../views/DashBoards/DashBoardNov.vue";
import DashBoardDec from "./../views/DashBoards/DashBoardDec.vue";

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
    path: "/dashboardjan",
    name: "DashBoardJan",
    component: DashBoardJan
  },
  {
    path: "/dashboardfeb",
    name: "DashBoardFeb",
    component: DashBoardFeb
  },
  {
    path: "/dashboardmar",
    name: "DashBoardMar",
    component: DashBoardMar
  },
  {
    path: "/dashboardapr",
    name: "DashBoardApr",
    component: DashBoardApr
  },
  {
    path: "/dashboardmay",
    name: "DashBoardMay",
    component: DashBoardMay
  },
  {
    path: "/dashboardjun",
    name: "DashBoardJun",
    component: DashBoardJun
  },
  {
    path: "/dashboardjul",
    name: "DashBoardJul",
    component: DashBoardJul
  },
  {
    path: "/dashboardaug",
    name: "DashBoardAug",
    component: DashBoardAug
  },
  {
    path: "/dashboardsep",
    name: "DashBoardSep",
    component: DashBoardSep
  },
  {
    path: "/dashboardoct",
    name: "DashBoardOct",
    component: DashBoardOct
  },
  {
    path: "/dashboardnov",
    name: "DashBoardNov",
    component: DashBoardNov
  },
  {
    path: "/dashboarddec",
    name: "DashBoardDec",
    component: DashBoardDec
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
