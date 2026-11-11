import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Build de l'aperçu statique : npx vite build -c vite.preview.config.ts
export default defineConfig({
  root: "preview",
  base: "./",
  plugins: [react(), tailwindcss()],
  define: { "import.meta.env.VITE_STATIC_PREVIEW": JSON.stringify("1") },
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
    alias: [
      { find: "@/integrations/supabase/client", replacement: path.resolve(__dirname, "preview/supabase-stub.ts") },
      { find: /^@\//, replacement: path.resolve(__dirname, "src") + "/" },
    ],
  },
  build: { outDir: "../preview-dist", emptyOutDir: true, assetsInlineLimit: 0 },
});
