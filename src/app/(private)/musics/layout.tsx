import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Músicas",
    description: "Gerencie as suas músicas.",
    keywords: ["músicas", "top 100", "team wave studio"],
    openGraph: {
        title: "Músicas - Team Wave Studio",
        description: "Gerencie as suas músicas.",
        url: "https://teamwave-studio.com/musicas",
        siteName: 'Team Wave Studio',
        locale: 'pt_AO',
    },
}

export default function Layout({children}:Readonly<{children:React.ReactNode}>) {
    return (
        <>{children}</>
    )
}
