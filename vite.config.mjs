// https://github.com/vitejs/vite/discussions/3448
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  // https://github.com/jpuri/react-draft-wysiwyg/issues/1317
  base: '/', // accessing env variable is not possible here. So hard coding this.
  define: {
    global: 'window',
    'process.env': process.env
  },
  optimizeDeps: {
    disabled: false // https://github.com/vitejs/vite/issues/9703
  },
  build: {
    rollupOptions: {
      // https://gist.github.com/darkoatanasovski/ed7ea7f4d7d2f174d2ebbd3540879fec
      plugins: [{ Buffer: ['Buffer', 'Buffer'], process: 'process' }],
    },
    commonjsOptions: {
      transformMixedEsModules: true, // https://github.com/chnejohnson/vue-dapp/issues/20
    },
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1')
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1')
      }
    ]
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000
  },
  preview: {
    // this ensures that the browser opens upon preview start
    open: true,
    // this sets a default port to 3000
    port: 3000
  }
});
