import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" keeps the build portable: it works on Vercel, Netlify, and
// GitHub Pages project sites (https://user.github.io/repo/) without changes.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
