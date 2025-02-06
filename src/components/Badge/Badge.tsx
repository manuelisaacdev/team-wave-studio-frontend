import React from 'react';
import { cn } from '@/lib/utils';

import BadgeProps from './BadgeProps';

export default function Badge({children, hidden, className}: BadgeProps) {
    return (
        <span className='relative'>
            <span className={cn('absolute inline-block w-1 h-1 rounded-full bg-orange-400 top-0 right-0 translate-x-[-50%]', className, hidden && "hidden")}></span>
            {children}
        </span>
    )
}
