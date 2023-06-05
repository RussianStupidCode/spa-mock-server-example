import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { resolve } from "path";

const r = (p: string) => resolve(__dirname, p);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "src/": r("./src/"),
      src: r("./src"),
    },
  },
});
