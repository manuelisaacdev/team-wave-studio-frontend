"use client";

import React from 'react'

import { FcInfo } from "react-icons/fc";
import { VscError } from "react-icons/vsc";
import { GiConfirmed } from "react-icons/gi";
import { IoCloseOutline, IoWarningOutline } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import AlertProps from './AlertProps';
import { solidVariants, variants } from './AlertVariants';
import { IconButton, Stack } from '@/components';

export default function Alert({title="Título", message, showIcon, solid, variant="info", handleClose, className, ...rest}:AlertProps) {
    const Close = (
        <IconButton onClick={handleClose} size='small' className={cn(
            variant === "info" && 'text-blue-400/50 hover:text-blue-400',
            variant === "success" && 'text-green-400/50 hover:text-green-400',
            variant === "warning" && 'text-orange-400/50 hover:text-orange-400',
            variant === "error" && 'text-red-400/50 hover:text-red-400',
        )}>
            <IoCloseOutline />
        </IconButton>
    );
    return (
        <div {...rest} className={cn('flex gap-3 items-center border rounded-md px-2 py-1',
            className,
            !title && "py-2",
            variants[variant],
            solid && solidVariants[variant],
        )}>
            {showIcon && variant === "info" && <FcInfo className='text-2xl' />}
            {showIcon && variant === "success" && <GiConfirmed className='text-2xl' />}
            {showIcon && variant === "warning" && <IoWarningOutline className='text-2xl' />}
            {showIcon && variant === "error" && <VscError className='text-2xl' />}
            
            <Stack className='flex-grow text-inherit'>
                {title && (
                    <Stack component={"h1"} direction='row' spacing={2} spaceBetween className='text-inherit text-base font-semibold text-nowrap'>
                        {title}
                        {handleClose && Close}
                    </Stack>
                )} 
                <Stack component={"div"} direction='row' spacing={2} spaceBetween className='text-inherit'>
                    <p className='text-inherit text-sm font-light'>{message}</p>
                    {handleClose && !title && Close}
                </Stack>
            </Stack>
        </div>
    )
}
