import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./app"),
    },
  },
  // Configuración para evitar deadlocks
  build: {
    rollupOptions: {
      maxParallelFileOps: 2,
    },
  },
  optimizeDeps: {
    force: true,
  },
  // Configuración para asegurar que el cliente se cargue correctamente
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});