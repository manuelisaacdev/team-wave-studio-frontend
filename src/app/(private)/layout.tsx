import React from 'react';
import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ConfirmationProvider from '@/contexts/ConfirmationProvider';
import NotificationProvider from '@/contexts/NotificationProvider';

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Página inicial do dashboard do Team Wave Studio.",
    keywords: ["dashboard", "team wave studio", "gestão de artistas"],
    robots: "index, follow",
    openGraph: {
        title: "Dashboard - Team Wave Studio",
        description: "Página inicial do dashboard do Team Wave Studio.",
        url: "https://teamwave-studio.com/dashboard",
        siteName: 'Team Wave Studio',
        locale: 'pt_AO',
        images: [{
            url: "https://teamwave-studio.com/img/favicon-512x512.webp",
            width: 512,
        }],
    },
}

export default function Layout({children}:Readonly<{children:React.ReactNode}>) {
    return (
        
        <ConfirmationProvider>
            <NotificationProvider>
                <MainLayout>
                    {children}
                </MainLayout>
            </NotificationProvider>
        </ConfirmationProvider>
    );
}
