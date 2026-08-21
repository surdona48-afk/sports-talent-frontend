import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  optimizeDeps: {
    include: [
      "@tensorflow/tfjs",
      "@tensorflow/tfjs-core",
      "@tensorflow/tfjs-backend-webgl",
      "@tensorflow/tfjs-backend-cpu",
      "seedrandom",
    ],
  },

  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});