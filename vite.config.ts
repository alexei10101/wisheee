import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA, type ManifestOptions } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions | false> = {
  name: "Wisheee",
  short_name: "Wisheee",
  description: "Social wishlist",
  lang: "ru-RU",
  display: "standalone",
  theme_color: "#4f46e5",
  background_color: "#E75480",
  orientation: "any",
  icons: [
    { purpose: "maskable", sizes: "512x512", src: "icon512_maskable.png", type: "image/png" },
    { purpose: "any", sizes: "512x512", src: "icon512_rounded.png", type: "image/png" },
  ],
  start_url: ".",
  scope: "/",
};

export default defineConfig({
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://wisheee-backend.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{html,css,js,png,svg,ico}"],
      },
      includeAssets: ["favicon.svg", "robots.txt", "icons/*.png"],
      manifest: manifest,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
