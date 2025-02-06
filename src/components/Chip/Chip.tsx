"use client";

import React, { forwardRef } from 'react';

import { IoCloseOutline } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import ChipProps, { ChipVariant } from './ChipProps';
import { IconButton } from '@/components';

const variants:Record<ChipVariant, string> = {
    info: "text-blue-400 bg-blue-400/10 border-blue-400/25",
    success: "text-green-400 bg-green-400/10 border-green-400/25",
    warning: "text-orange-400 bg-orange-400/10 border-orange-400/25",
    error: "text-red-400 bg-red-400/10 border-red-400/25",
};

const Chip = forwardRef<HTMLDivElement, ChipProps>(({label, variant="info", startIcon: StartIcon, onClose, ...rest}, ref) => {
    return (
        <div {...rest} ref={ref} className={cn('flex gap-2 items-center h-6 rounded-3xl px-2', variants[variant])}>
            {StartIcon && <StartIcon className='text-sm'/>}
            <span className='text-xs'>{label}</span>
            {onClose && (
                <IconButton onClick={onClose} size='small' className={cn(
                    variant === "info" && 'text-blue-400/50 hover:text-blue-400',
                    variant === "success" && 'text-green-400/50 hover:text-green-400',
                    variant === "warning" && 'text-orange-400/50 hover:text-orange-400',
                    variant === "error" && 'text-red-400/50 hover:text-red-400',
                )}>
                    <IoCloseOutline />
                </IconButton>
            )}
        </div>
    )
});

Chip.displayName = "Chip";

export default Chip;
