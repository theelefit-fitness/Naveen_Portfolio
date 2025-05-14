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
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'three': path.resolve(__dirname, 'node_modules/three')
    },
    dedupe: ['three', 'react', 'react-dom']
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    minify: mode === 'production',
    // Ensure warnings don't fail the build
    rollupOptions: {
      onwarn(warning, warn) {
        // Skip certain warnings
        if (warning.code === 'CIRCULAR_DEPENDENCY') return;
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        if (warning.code === 'MISSING_EXPORT') return;
        if (warning.code === 'EMPTY_BUNDLE') return;
        
        // Use default for everything else
        warn(warning);
      },
      external: []
    },
    // Ensure CSS is properly handled
    cssCodeSplit: true,
    // Optimize assets
    assetsInlineLimit: 4096,
  },
  // Disable type checking on build to prevent errors
  esbuild: {
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      'different-path-casing': 'silent'
    }
  },
  // Optimizations for production
  optimizeDeps: {
    include: ['react', 'react-dom', 'three'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    },
    exclude: []
  }
}));
