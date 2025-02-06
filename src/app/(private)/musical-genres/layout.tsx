import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: "Gêneros Musicais",
}

export default function Layout({children}:{children:React.ReactNode}) {
    return (
        <>{children}</>
    );
}
