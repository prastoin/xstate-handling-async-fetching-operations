import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/browser')
    worker.start()
}

createApp(App).mount("#app");
