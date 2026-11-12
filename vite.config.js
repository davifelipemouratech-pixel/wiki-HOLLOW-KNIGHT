import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Tudo que começar com /api-externa vai ser redirecionado para a API do Hollow Knight
      "/api-externa": {
        target: "https://hallownest-api.vercel.app/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-externa/, ""),
      },
    },
  },
});