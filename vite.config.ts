import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";
import { zip } from 'zip-a-folder';

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: generateManifest,
    }),
    {
      name: 'zip-dist',
      closeBundle: async () => {
        const distPath = 'dist';
        const outputZip = 'extension.zip';

        try {
          await zip(distPath, outputZip);
          console.log(`✅ Zipped ${distPath} to ${outputZip}`);
        } catch (err) {
          console.error('❌ Failed to zip:', err);
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

});
