import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment'

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
      ],
    }),
    EnvironmentPlugin(['VITE_IMAGES_URL','PROD']),
  ],
});
