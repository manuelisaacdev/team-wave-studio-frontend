import React from 'react';
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: "Cadastro - Team Wave Studio",
    description: "Página de cadastro de novos artistas.",
    keywords: ['artistas', 'cadastro', 'team wave studio'],
    openGraph: {
        type: 'website',
        url: 'https://team-wave-studio.vercel.app/cadastro',
        title: 'Cadastro - Team Wave Studio',
        description: 'Página de cadastro de novos artistas.',
        siteName: 'Team Wave Studio',
        locale: 'pt_AO',
    },
}

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <>{children}</>
    )
}
