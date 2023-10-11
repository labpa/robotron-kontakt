import { defineConfig } from "vite";

// check more possible options at:
// https://vitejs.dev/config/build-options.html
export default defineConfig({
  root: "./src", // folder where our files for the site are
  base: "/", // subpath of our site when deployed. ex "/vincepr.github.io/robotron-kontakte"
  build: {
    rollupOptions: {
      input: {
        // List html files included in our build (.css and .js get automatically added as required)
        index: "./src/index.html",
        edit: "./src/edit.html",
        help: "./src/help.html",
        impressum: "./src/impressum.html",
        kontakte: "./src/kontakte.html",
        login: "./src/login.html",
        view: "./src/view.html",
      },
    },
    outDir: "../dist",
  },
  esbuild: {
    supported: {
      "top-level-await": true, // we only target browsers that can handle top-level-await features
    },
  },
});