import React from 'react'
import FormControlLabelProps from './FormControlLabelProps'
import { cn } from '@/lib/utils'

export default function FormControlLabel({label, control, labelPlacement="end", className, ...rest}:FormControlLabelProps) {
    return (
        <label {...rest} className={cn('flex gap-3 items-center text-gray-500', className)}>
            {labelPlacement === "start" && <span className='cursor-pointer'>{label}</span>}
            {control}
            {labelPlacement === "end" && <span className='cursor-pointer'>{label}</span>}
        </label>
    )
}
