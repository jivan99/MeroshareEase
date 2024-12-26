import "~/assets/tailwind.css";
import { createApp } from "vue";
import Content from "./Content.vue";

export default defineContentScript({
  matches: ["https://meroshare.cdsc.com.np/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "meroshare-ease-ui",
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        const app = createApp(Content);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        app?.unmount();
      }
    });

    ctx.addEventListener(window, "wxt:locationchange", ({ newUrl }) => {
      ui.remove();

      if (newUrl.hash === "#/login") {
        ui.mount();
        return;
      }
    });

    if (window.location.hash === "#/login") {
      ui.mount();
    }
  }
});
