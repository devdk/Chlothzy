import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),         // Required if using JSX/TSX
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:5000", // proxy /api/* to backend
    },
  },
});
