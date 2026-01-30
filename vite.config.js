/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
// import path from "node:path";
// import { fileURLToPath } from "node:url";
// const dirname =
//   typeof __dirname !== "undefined"
//     ? __dirname
//     : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 5173,
    allowedHosts: ['js-project-happy-thoughts-5d6v.onrender.com']
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [],
      },
    ],
  },
});
