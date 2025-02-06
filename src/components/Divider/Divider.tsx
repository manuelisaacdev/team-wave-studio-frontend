import React from 'react';

import { cn } from '@/lib/utils';
import DividerProps from './DividerProps';

export default function Divider({children, className, orientation="horizontal"}:DividerProps) {
    return (
        <div className={cn('flex gap-3 items-center', className, orientation === "vertical" && "flex-col")}>
            <span className={cn('inline-block border-t border-white/5 flex-grow', 
                orientation === "vertical" && "border-l border-t-0"
            )}></span>
            {children && (<>
                {children}
                <span className={cn('inline-block border-t border-white/5 flex-grow', 
                    orientation === "vertical" && "border-l border-t-0"
                )}></span>
            </>)}
        </div>
    )
}
