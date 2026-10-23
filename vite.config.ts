import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  esbuild: { jsx: "automatic" },
  // GitHub Pages project site of remote 'lo': https://kiennguyenkt.github.io/sea-union/
  base: command === "build" ? "/sea-union/" : "/",
}));
