import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ai-Agent app',
    short_name: 'Ai-Agent',
    description: 'Ai-Agent application',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: 'globe.svg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'globe.svg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
