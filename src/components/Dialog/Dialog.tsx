"use client";

import React from 'react';

import { cn } from '@/lib/utils';
import DialogProps from './DialogProps';
import {Paper, Portal} from '@/components';

export default function Dialog({children, open, size="medium", closeOnBackdropClick, handleClose, paperProps}:DialogProps) {
    function handleBackdropClick(evt:React.MouseEvent<HTMLDivElement>) {
        if (closeOnBackdropClick && evt.target === evt.currentTarget) {
            handleClose?.();
        }
    };
    return (
        <Portal>
            <div onClick={handleBackdropClick} className={cn("flex justify-center items-center absolute z-10 inset-0 p-5 transition-all opacity-100 visible bg-[rgba(255, 255, 255, 0.1)]", !open && "opacity-0 invisible", size ==="full" && "p-0")} style={{backdropFilter: "blur(5px)"}}>
                <Paper {...paperProps} className={cn("flex flex-col w-full max-h-[512px] transition-all opacity-1 scale-1",
                    paperProps?.className,
                    size === "xsmall" && "max-w-[380px]",
                    size === "small" && "max-w-[560px]",
                    size === "medium" && "max-w-[680px]",
                    size === "large" && "max-w-[860px]",
                    size === "xlarge" && "max-w-[1280px]",
                    size === "full" && "max-w-full h-full max-h-full",
                    !open && "opacity-0 scale-0"
                )}>
                    {children}
                </Paper>
            </div>
        </Portal>
    )
}
