import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "./pages/DashboardPage.vue";
import TagsPage from "./pages/TagsPage.vue";
import LinksPage from "./pages/LinksPage.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
