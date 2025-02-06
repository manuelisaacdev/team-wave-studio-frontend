import React from 'react'

import { cn } from '@/lib/utils';
import PaperProps from './PaperProps';

export default function Paper({component:Component="div", children, className, ...rest}:PaperProps) {
    return (
        <Component {...rest} className={cn('bg-paper-primary border border-white/5 rounded-md', className)}>{children}</Component>
    )
}
