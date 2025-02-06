"use client";

import React, { forwardRef, useId } from 'react'

import { cn } from '@/lib/utils';
import TextFieldProps from './TextFieldProps';

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({label, id, fullWidth, focus, endIcon: EndIcon=null, endAction, endActionPlacement="inner", startIcon: StartIcon=null, message, error, messageClassName, wapperInputClassName, className, ...rest}, ref) => {
    const inputId = id || useId();

    return (
        <div className={cn("flex gap-1.5 flex-col items-start", fullWidth && "w-full")}>
            {label && <label className='text-sm text-gray-500 font-medium' htmlFor={inputId}>{label}</label>}
            <div className='flex w-full items-center'>
                <div className={cn("flex gap-3 flex-grow items-center h-10 w-full px-3 bg-white/5  outline-1 outline outline-transparent has-[input:focus]:outline-white/20 rounded-3xl", focus && "outline-white/20", endAction && endActionPlacement === "out" && "rounded-e-none", wapperInputClassName)}>
                    {StartIcon && <StartIcon className='text-lg text-gray-500'/>}
                    <input ref={ref} id={inputId} className={cn("flex-grow text-sm text-gray-500 placeholder:text-gray-600 bg-transparent outline-none", className)} {...rest} aria-describedby="input-data-picker"/>
                    {EndIcon && <EndIcon className='text-lg text-gray-500'/>}
                    {endActionPlacement === "inner" && endAction}
                </div>
                {endActionPlacement === "out" && endAction}
            </div>
            {message && <p className={cn("text-gray-600 text-xs font-light w-full", messageClassName, error && "text-red-400")}>{message}</p>}
        </div>
    );
});

TextField.displayName = 'TextField';

export default TextField;