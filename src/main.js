import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEdit,
  faLink,
  faTimes,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faEdit, faLink, faTimes, faPlus, faTrash);

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router).mount("#app");
