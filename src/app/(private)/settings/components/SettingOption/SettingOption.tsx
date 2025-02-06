"use client";

import { Stack } from '@/components'
import React from 'react'
import SettingOptionProps from './SettingOptionProps'
import { cn } from '@/lib/utils'

export default function SettingOption({label, value, description, icon: Icon, selected, onSelect}:SettingOptionProps) {
    
    function onClick(evt: React.MouseEvent<HTMLLIElement>) {
        evt.preventDefault();
        onSelect(value);
    }

    return (
        <Stack component={"li"} onClick={onClick} direction='row' itemsCenter spacing={3} className={cn('border border-white/5 cursor-pointer p-3 rounded-md hover:bg-white/5', 
            selected && 'bg-white/5'
        )}>
            {Icon && <Icon className='text-lg text-gray-500'/>}
            <Stack>
                <h2 className='text-sm text-gray-500 font-medium'>{label}</h2>
                <p className='text-xs text-gray-600'>{description}</p>
            </Stack>
        </Stack>
    )
}
