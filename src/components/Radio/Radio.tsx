"use client";

import React, { forwardRef } from 'react';

import styles from './Radio.module.css';

import { cn } from '@/lib/utils';
import RadioProps from './RadioProps';

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
    return (
        <div className={cn('relative flex justify-center items-center p-1.5 w-6 h-6 border border-primary rounded-full transition-all', styles.radio)}>
            <input {...props} type="radio" ref={ref} style={{all: "unset", position: "absolute", inset: 0, zIndex: 10, borderRadius: "inherit", backgroundColor: "transparent", cursor: "pointer"}}/>
            <span className={cn("w-full h-full rounded-full bg-primary transition-all", styles.checkmark)}></span>
        </div>
    )
});

Radio.displayName = 'Radio';

export default Radio;