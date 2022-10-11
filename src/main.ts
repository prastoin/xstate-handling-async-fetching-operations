import { createApp } from "vue";
import App from "./App.vue";
import { worker } from "./mocks/browser";

import "./assets/main.css";

// It's not recommended to include Mock Service Worker in production.
// Doing so may lead to a distorted experience for your users.
// See https://mswjs.io/docs/getting-started/integrate/browser#start-worker
worker.start();

createApp(App).mount("#app");
