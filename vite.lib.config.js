import { defineConfig } from 'vite';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
  root: 'src',
  publicDir: false,
  build: {
    outDir: '../dist/lib',
    emptyOutDir: true,
    lib: {
      entry: 'scripts/monkeyMagic.js',
      name: 'MonkeyMagic',
      fileName: 'animation.utils',
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
      plugins: [
        terser({
          format: { beautify: false },
          compress: true,
          keep_classnames: /MonkeyMagic/,
        }),
      ],
    },
    cssCodeSplit: true,
    target: 'esnext',
    minify: 'terser',
  },
  base: './',
  server: {
    open: true,
  },
});
