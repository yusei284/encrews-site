// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com', '.ts.net', 'localhost'],
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.trycloudflare.com', '.ts.net', 'localhost'],
    },
  }
});
