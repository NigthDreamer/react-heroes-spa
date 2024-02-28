import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'assets/*',
          dest: '',
        },
        {
          src: 'assets/*',
          dest: '../public',
        },
        {
          src: 'dist/*',
          dest: '../docs',
        },
      ],
    }),
  ],
});
