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
    include: ["jspdf"], // Ensure Vite pre-bundles jspdf if needed
  },
  build: {
    rollupOptions: {
      external: [], // Remove jspdf from external unless you're deliberately excluding it
    },
  },
});
