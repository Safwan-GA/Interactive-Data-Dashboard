import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components', // ✅ No invalid characters
    },
  },
  server: {
    port: 5173,
    host: 'localhost',
  },
  define: {
    global: 'window', // Polyfill global with window
  }
});




