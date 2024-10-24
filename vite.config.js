import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Set the server port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Shortcut for imports
    },
  },
});
