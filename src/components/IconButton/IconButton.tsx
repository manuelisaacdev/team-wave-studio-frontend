"use client";

import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import IconButtonProps from './IconButtonProps';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({children, size="medium", className, onClick, ...rest}, ref) => {
    return (
        <button {...rest} type='button' aria-describedby="icon-button-item" onClick={onClick} ref={ref} className={cn('flex justify-center items-center text-gray-600 text-lg rounded-full hover:bg-white/5 disabled:text-gray-800 cursor-pointer', className, 
            size === "small" && "w-6 h-6",
            size === "medium" && "w-8 h-8",
            size === "large" && "w-10 h-10"
        )}>
            {children}
        </button>
    )
});

IconButton.displayName = 'IconButton';

export default IconButton;