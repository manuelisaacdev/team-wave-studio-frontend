import React, { forwardRef } from 'react'

import { cn } from '@/lib/utils';
import DialogContentProps from './DialogContentProps';

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(({children, className, ...rest}, ref) => {
    return (
        <div {...rest} ref={ref} className={cn("flex-grow px-3  overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full", className)}>
            {children}
        </div>
    )
});

export default DialogContent;