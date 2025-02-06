import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Playlists",
    description: "Descubra e crie novas playlists com os seus artistas e músicas favoritas.",
    keywords: ["playlists", "artistas", "músicas", "team wave studio"],
    openGraph: {
        title: "Playlists - Team Wave Studio",
        description: "Descubra e crie novas playlists com os seus artistas e músicas favoritas.",
        url: "https://teamwave-studio.com/playlists",
        siteName: 'Team Wave Studio',
        locale: 'pt_AO',
    }
}

export default function Layout({children}:Readonly<{children:React.ReactNode}>) {
    return (
        <>{children}</>
    )
}
