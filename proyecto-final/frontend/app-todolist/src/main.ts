import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// PINIA STORE
import { createPinia } from "pinia";
const pinia = createPinia();

// QUASAR STYLES
import { Quasar, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Notify,
  },
});
app.use(pinia);
app.mount("#app");
