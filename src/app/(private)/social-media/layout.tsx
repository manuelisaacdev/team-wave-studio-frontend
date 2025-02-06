import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Redes Sociais",
    description: "Acompanhe nossas redes sociais para ficar por dentro de nossas atividades.",
    keywords: ["redes sociais", "team wave studio", "gestão de artistas"],
    robots: "index, follow",
    openGraph: {
        title: "Redes Sociais - Team Wave Studio",
        description: "Acompanhe nossas redes sociais para ficar por dentro de nossas atividades.",
        url: "https://teamwave-studio.com/redes-sociais",
        siteName: 'Team Wave Studio',
        locale: 'pt_AO',
    },
}

export default function Layout({children}: Readonly<{children:React.ReactNode}>) {
    return (
        <>{children}</>
    )
}
