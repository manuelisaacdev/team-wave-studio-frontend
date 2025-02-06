import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
    title: "Login",
    description: "Faça login na sua conta para acessar o Team Wave Studio.",
    keywords: ["login", "team wave studio", "gestão de artistas"],
    robots: "index, follow",
    openGraph: {
        title: "Login - Team Wave Studio",
        description: "Faça login na sua conta para acessar o Team Wave Studio.",
        url: "https://teamwave-studio.com/login",
        siteName: 'Team Wave Studio',
        locale: 'pt_AO',
    },
}

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <>{children}</>
    )
}
