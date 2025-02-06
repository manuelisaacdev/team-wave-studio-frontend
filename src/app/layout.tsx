import type { Metadata } from "next";

import "./globals.css";
import Providers from "@/contexts";

export const metadata: Metadata = {
    title: "Team Wave Studio",
    description: "Aplicação de gestão para os artistas.",
    icons: [
        {
            rel: "icon",
            type: 'image/svg+xml',
            url: '/img/favicon.svg',
        },
        {
            rel: "icon",
            sizes: '16x16',
            type: 'image/png',
            url: '/img/favicon-16x16.png',
        },
        {
            rel: "icon",
            sizes: '32x32',
            type: 'image/png',
            url: '/img/favicon-32x32.png',
        },
        {
            rel: "icon",
            sizes: '48x48',
            type: 'image/png',
            url: '/img/favicon-48x48.png',
        },
        {
            sizes: '180x180',
            type: 'image/png',
            rel: "apple-touch-icon",
            url: '/img/apple-touch-icon-180x180.png',
        },
        {
            rel: "icon",
            sizes: '192x192',
            type: 'image/png',
            url: '/img/android-chrome-192x192.png',
        },
        {
            rel: "icon",
            sizes: '512x512',
            type: 'image/png',
            url: '/img/android-chrome-512x512.png',
        },
    ]
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="pt">
            <body className="overflow-hidden w-screen h-screen">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
