import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [
    // Builds the server bundle. `preset: "vercel"` emits Vercel's Build Output
    // API format into .vercel/output, which Vercel deploys with no extra config.
    // Override locally with NITRO_PRESET=node-server to run a plain Node server.
    nitro({ preset: process.env["NITRO_PRESET"] || "vercel" }),
    tanstackStart({
      // Route src/server.ts as the SSR entry (it wraps errors in a styled page).
      server: { entry: "server" },
      // Stop server-only modules from being pulled into the client bundle.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    viteReact(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
  ],
  resolve: {
    alias: { "@": srcDir },
    // Keep a single copy of these at runtime; duplicates break hooks and query cache.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
});
