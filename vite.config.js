import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  publicDir: false,
  build: {
    outDir: 'public',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const originalName = assetInfo.name || ''

          if (originalName.endsWith('.pdf')) {
            return 'assets/brochure/[name][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
});
