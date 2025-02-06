"use client";

import React from 'react';
import PublicLayout from '@/components/layout/PublicLayout';
import NotificationProvider from '@/contexts/NotificationProvider';
import ConfirmationProvider from '@/contexts/ConfirmationProvider';

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <ConfirmationProvider>
            <NotificationProvider>
                <PublicLayout>
                    {children}
                </PublicLayout>
            </NotificationProvider>
        </ConfirmationProvider>
    )
}
