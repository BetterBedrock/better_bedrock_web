/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), svgr(), eslint()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"), // Global alias: # refers to the src folder
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["betterbedrock.com"],
  },
  preview: {
    port: 5173,
  },
});
