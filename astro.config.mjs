// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ricardo-genesis-wedding.pages.dev', // PENDIENTE: reemplazar por el dominio final de despliegue
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-serif',
      weights: [300, 400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Great Vibes',
      cssVariable: '--font-script',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['cursive'],
    },
    {
      provider: fontProviders.google(),
      name: 'Jost',
      cssVariable: '--font-sans',
      weights: [300, 400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Helvetica', 'Arial', 'sans-serif'],
    },
  ],
});
