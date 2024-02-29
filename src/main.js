import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faLink,
  faTimes,
  faPlus,
  faTrash,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faEdit, faLink, faTimes, faPlus, faTrash, faTags);

const pinia = createPinia();

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router).use(pinia).mount("#app");
