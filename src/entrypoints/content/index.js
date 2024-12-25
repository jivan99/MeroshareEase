import "~/assets/tailwind.css";
import { createApp } from "vue";
import Content from "./Content.vue";

export default defineContentScript({
  matches: ["<all_urls>"],
  // 2. Set cssInjectionMode
  cssInjectionMode: "ui",

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: "meroshare-ui",
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        // Define how your UI will be mounted inside the container
        const app = createApp(Content);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        // Unmount the app when the UI is removed
        app?.unmount();
      }
    });

    // 4. Mount the UI
    ui.mount();
  }
});
