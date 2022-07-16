import { createRouter, createWebHashHistory } from "vue-router";

import { getCurrentUser, logout } from "../helpers/auth";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import Project from "../views/Projects.vue";
import Expense from "../views/Expense.vue";
import ExpenseHistory from "../views/ExpenseHistory.vue";
import Users from "../views/UserManagement.vue";
import UserProfile from "../views/UserProfile.vue";
import Material from "../views/Material.vue";
import MaterialLogs from "../views/MaterialLogs.vue";
import Machinery from "../views/Machinery.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
        meta: { authorize: ["admin", "supervisor"] },
      },
      {
        path: "/project",
        name: "project",
        components: { default: Project },
        meta: { authorize: ["admin", "supervisor"] },
      },
      {
        path: "/expense",
        name: "Expenses",
        components: { default: Expense },
        meta: { authorize: ["admin", "supervisor", "site-incharge"] },
      },
      {
        path: "/expense-logs",
        name: "Expense Logs",
        components: { default: ExpenseHistory },
        meta: { authorize: ["admin", "supervisor"] },
      },
      {
        path: "/users",
        name: "Users",
        components: { default: Users },
        meta: { authorize: ["admin", "supervisor"] },
      },
      {
        path: "/material",
        name: "material",
        components: { default: Material },
        meta: { authorize: ["admin", "supervisor"] },
      },
      {
        path: "/material-logs",
        name: "material logs",
        components: { default: MaterialLogs },
        meta: { authorize: ["admin", "supervisor"] },
      },
      {
        path: "/machinery",
        name: "Machinery",
        components: { default: Machinery },
        meta: { authorize: ["admin", "supervisor"] },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: UserProfile },
        meta: { authorize: ["admin", "supervisor"] },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      {
        path: "/logout",
        name: "logout",
        components: { default: Login },
      },
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  // const currentUser = authenticationService.currentUserValue;
  const currentUser = getCurrentUser();

  if (to.name == "logout") {
    logout();
    return next({ path: "/login", query: { returnUrl: to.path } });
  }

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: "/login", query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({ path: "/" });
    }
  }

  next();
});

export default router;
