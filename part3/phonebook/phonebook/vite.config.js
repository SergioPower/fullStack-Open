import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002', // URL de tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Opcional: ajusta si tu backend no tiene el prefijo /api
      },
    },
  },
});
