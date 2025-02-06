"use client";

import React, { useId } from 'react'
import { Tooltip } from 'react-tooltip';

import { cn } from '@/lib/utils';
import { Stack } from '@/components';
import THeaderProps from './THeaderProps';

export default function THeader({tableColumn: {title, message, placement, width}}:THeaderProps) {
    const id = useId();
    return (
        <Stack style={{width}} direction='row' className={cn('flex-grow px-5 gap-2 items-center flex-shrink-0', 
            placement === "center" && "justify-center",
            placement === "right" && "justify-end",
        )}>
            <span className='text-sm text-blue-400 font-medium' data-tooltip-id={id} data-tooltip-content={message}>{title}</span>
            {message && <Tooltip id={id} place='bottom'/>}
        </Stack>
    )
}
