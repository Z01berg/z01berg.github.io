import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
  base: '/z01berg.github.io/',
});