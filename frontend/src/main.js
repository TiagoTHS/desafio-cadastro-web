import { createApp } from "vue";
import App from "./App.vue";

import store from "./config/store";
import router from "./config/router";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

const app = createApp(App);

app.use(VueSweetalert2);
app.use(Toast, options);
app.use(store);
app.use(router);

app.mount("#app");
