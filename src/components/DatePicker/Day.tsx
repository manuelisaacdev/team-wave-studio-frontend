import React from 'react'

import { cn } from '@/lib/utils';
import DayProps from './DayProps';

export default function Day({value, currentDay, selected, ...rest}:DayProps) {
    return (
        <button {...rest} className={cn('flex justify-center items-center w-7 h-7 text-sm text-gray-500 border border-white/5 rounded-full cursor-pointer hover:text-primary hover:bg-primary/5 hover:border-primary/10 disabled:text-gray-700 disabled:pointer-events-none', 
            currentDay && "text-blue-400 bg-blue-400/5 border-blue-400/10",
            selected && "text-primary bg-primary/5 border-primary/10",
        )}>
            <span>{value}</span>
        </button>
    )
}
