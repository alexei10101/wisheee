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
    {
      src: "icons/icon192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "icons/icon512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "icons/icon512_maskable.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
  start_url: "/",
  scope: "/",
  share_target: {
    action: "/share-target",
    method: "POST",
    enctype: "multipart/form-data",
    params: {
      title: "title",
      text: "text",
      url: "url",
      files: [
        {
          name: "image",
          accept: ["image/*"],
        },
      ],
    },
  },
};

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.ts",
      injectManifest: {
        rollupFormat: "es",
      },
      devOptions: {
        enabled: false,
      },
      manifest: manifest,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
