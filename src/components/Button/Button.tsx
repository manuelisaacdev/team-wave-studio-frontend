"use client";

import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import ButtonProps from './ButtonProps';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({children, className, type="button", component:Component="button", primary, roundedLarger, size="medium", fullWidth, startIcon:StartIcon, endIcon:EndIcon, ...rest}, ref) => {
    return (
        <Component ref={ref} {...rest} type={type} className={cn('flex gap-2 justify-center text-sm font-light text-blue-400 items-center px-3 border border-blue-500/10 rounded-md bg-blue-500/5 hover:bg-blue-500/10  cursor-pointer disabled:cursor-default disabled:bg-blue-400/5 disabled:text-gray-500 transition-all', 
            fullWidth && "w-full",
            size === "small" && "h-6",
            size === "medium" && "h-8",
            size === "large" && "h-10",
            roundedLarger && "rounded-3xl",
            primary && "text-white bg-primary/80 hover:bg-primary border-none rounded-3xl transition-none",
            className,
        )}>
            {StartIcon && <StartIcon />}
            {children}
            {EndIcon && <EndIcon />}
        </Component>
    );
});

Button.displayName = "Button";

export default Button;