import { defineConfig } from 'vite';

process.env.BROWSER = 'chrome';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist/app',
    emptyOutDir: true,
    rollupOptions: {},
    cssCodeSplit: true,
    target: 'esnext',
    minify: 'terser', // Minifyを有効化
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  base: './',
  server: {
    open: true,
  },
});
