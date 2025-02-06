"use client";

import React from 'react'
import Stack from '../Stack/Stack'
import { cn } from '@/lib/utils';
import { BeatLoader } from 'react-spinners'

export default function LoadingOverlay({open}:{open?: boolean}) {
    return (
        <Stack itemsCenter className={cn("absolute justify-center inset-0 h-full transition-all opacity-100 visible bg-[rgba(255, 255, 255, 0.1)]", !open && "opacity-0 invisible")} style={{borderRadius: "inherit", backdropFilter: "blur(5px)", zIndex: 1000}}>
            <BeatLoader color="#E3651D"/>
        </Stack>
    )
}
