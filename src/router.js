import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "./pages/DashboardPage.vue";
import TagsPage from "./pages/TagsPage.vue";
import LinksPage from "./pages/LinksPage.vue";
import SignupPage from "./pages/SignupPage.vue";
import LoginPage from "./pages/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardPage,
  },
  {
    path: "/tags",
    name: "tags",
    component: TagsPage,
  },
  {
    path: "/links/:id",
    name: "links",
    component: LinksPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/signup"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn =
    localStorage.getItem("zettelkasten_user") &&
    localStorage.getItem("zettelkasten_token");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
