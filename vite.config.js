import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

// Diz ao Vite que o site tem DUAS páginas para publicar:
// a da raiz (redirecionamento) e a da calculadora.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        calculadora: fileURLToPath(
          new URL("./calculadora/index.html", import.meta.url),
        ),
      },
    },
  },
});
