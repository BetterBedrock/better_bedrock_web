/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), svgr(), eslint()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: parseInt(env.VITE_PORT) || 5173,
      allowedHosts: [env.VITE_HOST ?? "betterbedrock.com"],
    },
    preview: {
      port: parseInt(env.VITE_PORT) || 5173,
    },
  });
};
