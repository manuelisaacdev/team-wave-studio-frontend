"use client";

import AvatarProps from './AvatarProps';
import FileService from '@/services/FileService';
import { cn, placeholderName } from '@/lib/utils';
import { forwardRef, useEffect, useState } from 'react';

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({width=32, height=32, alt="Avatar", src, children, className, imageProps, ...rest}, ref) => {
    const [error, setError] = useState<boolean>(false);
    
    function onError(evt:React.SyntheticEvent<HTMLImageElement>) {
        setError(true);
        evt.currentTarget.onerror = null;
    }

    useEffect(() => {
        if(src) {
            setError(false);
        }
    }, [src])

    return (
        <div ref={ref} {...rest} className={cn('flex justify-center items-center p-[2px] w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 bg-red-400', className)}>
            {src && !error ? (
                <img {...imageProps} width={width} height={height} alt={alt} src={FileService.resources(src)} onError={onError} className={cn("rounded-full", imageProps?.className)} aria-describedby="avatar-item"/>
            ) : (
                <span className='flex justify-center items-center w-full h-full rounded-full bg-paper-primary text-blue-400 text-sm font-medium'>{placeholderName(alt)}</span>
            )}
        </div>
    )
});


export default Avatar;