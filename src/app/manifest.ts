import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Team Wave Studio',
        short_name: 'Team Wave Studio',
        description: "Aplicação de gestão para os artistas.",
        start_url: '/',
        display: 'standalone',
        background_color: '#030a0f',
        theme_color: '#FF204E',
        icons: [
            {
                type: 'image/svg+xml',
                src: '/img/favicon.svg',
            },
            {
                sizes: '16x16',
                type: 'image/png',
                src: '/img/favicon-16x16.png',
            },
            {
                sizes: '32x32',
                type: 'image/png',
                src: '/img/favicon-32x32.png',
            },
            {
                sizes: '48x48',
                type: 'image/png',
                src: '/img/favicon-48x48.png',
            },
            {
                sizes: '180x180',
                type: 'image/png',
                src: '/img/apple-touch-icon-180x180.png',
            },
            {
                sizes: '192x192',
                type: 'image/png',
                src: '/img/android-chrome-192x192.png',
            },
            {
                sizes: '512x512',
                type: 'image/png',
                src: '/img/android-chrome-512x512.png',
            },
        ],
    }
}