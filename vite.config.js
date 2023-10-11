import {
    defineConfig
} from "vite";

export default defineConfig({
    root: "./src",
    base: "/",
    build: {
        rollupOptions: {
            input: {
                edit: "./src/edit.html",
                help: "./src/help.html",
                impressum: "./src/impressum.html",
                index: "./src/index.html",
                kontakte: "./src/kontakte.html",
                login: "./src/login.html",
                view: "./src/view.html",
            },
        },
        outDir: "../dist",
    },
    esbuild: {
        supported: {
            "top-level-await": true,
        },
    },
});
