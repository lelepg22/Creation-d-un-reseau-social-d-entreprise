import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/form",
    name: "Form",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/form.vue"),
  },
  {
    path: "/login",
    name: "Login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/connect",
    name: "Connect",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Connect.vue"),
  },
  {
    path: "/profile",
    name: "Profile",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
