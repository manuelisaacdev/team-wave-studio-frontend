"use client";

import React, { useEffect, useState } from 'react';
import { Box } from '@/components';

export default function Loading({children}:Readonly<{children:React.ReactNode}>) {
    const [progress, setProgress] = useState<number>(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => Math.min(prevProgress + 5, 100));
        }, 100);
        
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Box className='absolute left-0 top-0 right-0 h-[1px] z-[1000]'>
                <Box className='h-full bg-blue-400 z-[1000]' style={{width: `${progress}%`}}></Box>
            </Box>
            {children}
        </>
    )
}