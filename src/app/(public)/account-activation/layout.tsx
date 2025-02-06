import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Activação de conta",
    description: "Ative sua conta para acessar o Team Wave Studio.",
    keywords: ["ativar conta", "team wave studio", "gestão de artistas"],
    robots: "index, follow",
    openGraph: {
        title: "Ativação de Conta - Team Wave Studio",
        description: "Ative sua conta para acessar o Team Wave Studio.",
        url: "https://teamwave-studio.com/activation",
        siteName: 'Team Wave Studio',
        locale: 'pt_AO',
    },
}

export default function Layout({children}:Readonly<{children:React.ReactNode}>) {
    return (
        <>{children}</>
    )
}
