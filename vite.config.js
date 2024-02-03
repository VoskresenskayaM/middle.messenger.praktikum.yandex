import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({

  plugins: [handlebars()],
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  root: resolve(__dirname, './src'),
  publicDir: './static',
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
  },

  /* root: resolve(__dirname, './src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
},
root: resolve(__dirname, './src'),
   publicDir: './static',
  server: {
    port: 3000,
  },
  optimizeDeps: {
    dynamicImport: true,
  },
  preview: {
    port: 3000,
  }, */
});
