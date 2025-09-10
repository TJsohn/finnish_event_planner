import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  base: "/finnish_event_planner/",
  plugins: [react(), compression()],
  build: {
    minify: "esbuild",
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
