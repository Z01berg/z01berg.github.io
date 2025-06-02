import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      external: ['lucide-react'],
      output: {
        manualChunks: {
          'lucide-react': ['lucide-react']
        }
      }
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/z01berg.github.io/' : '/',
});