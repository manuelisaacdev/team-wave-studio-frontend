import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Configurações",
    description: "Configurações do usuário",
    keywords: "settings, configurações, usuário",
}

export default function Layout({children}:Readonly<{children:React.ReactNode}>) {
    return (
        <>{children}</>
    )
}
