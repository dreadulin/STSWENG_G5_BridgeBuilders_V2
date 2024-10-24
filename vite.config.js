import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Shortcut for imports
    },
  },
  optimizeDeps: {
    include: ["jspdf"], // Ensure jspdf is bundled properly
  },
  build: {
    rollupOptions: {
      external: [], // Leave this empty unless you really want to exclude certain packages
    },
    commonjsOptions: {
      include: [/node_modules/], // Ensure commonjs packages like jspdf are processed
    },
  },
});
