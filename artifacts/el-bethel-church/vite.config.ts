import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { siteDefaults } from "./src/data/siteDefaults";
import { announcement } from "./src/data/announcement";
import { churchInfo } from "./src/data/church";

/**
 * Writes admin/defaults.json into the build: the content the site shows when
 * nothing has been saved from the admin panel yet. The panel reads it (via
 * admin/api.php) so the forms start pre-filled with what visitors see today.
 */
function adminDefaults() {
  return {
    name: "admin-defaults",
    apply: "build" as const,
    generateBundle(this: { emitFile: (f: { type: "asset"; fileName: string; source: string }) => void }) {
      const { id: _id, ...popup } = announcement;
      this.emitFile({
        type: "asset",
        fileName: "admin/defaults.json",
        source: JSON.stringify(
          {
            ticker: siteDefaults.ticker,
            home: siteDefaults.home,
            announcement: { id: announcement.id, ...popup },
            church: { phone: churchInfo.phone, email: churchInfo.email, address: churchInfo.address, ...siteDefaults.contact },
          },
          null,
          2,
        ),
      });
    },
  };
}

const rawPort = process.env.PORT ?? "5173";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    adminDefaults(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
