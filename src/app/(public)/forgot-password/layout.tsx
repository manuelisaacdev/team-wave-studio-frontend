import React from 'react';
import { Metadata } from 'next';

export const metadata:Metadata = {
    title: "Recuperação de Conta",
    description: "Recupere sua senha para acessar o Team Wave Studio.",
    keywords: ["recuperar senha", "team wave studio", "gestão de artistas"],
    robots: "index, follow",
    openGraph: {
        title: "Recuperação de Conta - Team Wave Studio",
        description: "Recupere sua senha para acessar o Team Wave Studio.",
        url: "https://teamwave-studio.com/recuperar-conta",
    },
}

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <>{children}</>
    )
}
