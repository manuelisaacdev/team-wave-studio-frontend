"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState<boolean>(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    if(!isClient) return null;

    return createPortal(children, document.body);
}
