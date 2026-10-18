import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Hash-based routing (see src/main.jsx) so the built site works from any static
// host without server rewrites — the original site's tabs were hash driven too.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
  },
});
