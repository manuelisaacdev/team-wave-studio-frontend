"use client";

import React, { useContext } from 'react';

import { cn } from '@/lib/utils';
import PanelProps from './PanelProps';
import { TabsContext } from './TabContext';

export default function Panel({value, children, className, ...rest}:PanelProps) {
    const {value: tabs, unrendere} = useContext(TabsContext);
    return (
        <div {...rest}  className={cn(className, value !== tabs && "hidden")}>{unrendere ? (<>{value === tabs && children}</>) : children}</div>
    )
}
