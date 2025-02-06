import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Album",
    description: "Detalhes do álbum",
    keywords: ['álbum', 'artistas', 'músicas', 'team wave studio'],
    openGraph: {
        title: "Album - Team Wave Studio",
        description: "Detalhes do álbum",
        url: "https://teamwave-studio.com/album",
        siteName: 'Team Wave Studio',
        locale: 'pt_AO',
    },
}

export default function Layout({children}:Readonly<{children:React.ReactNode}>) {
    return (
        <>{children}</>
    )
}