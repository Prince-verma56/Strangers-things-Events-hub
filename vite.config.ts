import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Manual chunk splitting for heavy libraries
        manualChunks: {
          // Three.js and related (heavy 3D library)
          'three-vendor': [
            'three',
            '@react-three/fiber',
            '@react-three/drei',
          ],
          // GSAP animation library
          'gsap-vendor': [
            'gsap',
            '@gsap/react',
          ],
          // Framer Motion
          'framer-vendor': [
            'framer-motion',
            'motion',
          ],
          // UI components (Radix)
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-slot',
          ],
        },
      },
    },
    // Use esbuild for minification (faster and built-in)
    minify: 'esbuild',
    // Optimize CSS
    cssCodeSplit: true,
    // Source maps only in dev
    sourcemap: mode === 'development',
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'gsap',
      '@gsap/react',
    ],
  },
}));
