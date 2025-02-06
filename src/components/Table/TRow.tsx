import React from 'react'
import TRowProps from './TRowProps'
import {Checkbox, Stack} from '@/components'
import { cn } from '@/lib/utils'

import { v4 as uuidv4 } from 'uuid';

export default function TRow({showSelection, columns, row, rowIndex}:TRowProps) {
    return (
        <Stack key={uuidv4()} direction='row' className={cn('border-b border-white/5 hover:bg-gray-700/5 items-center py-3 gap-2')}>
            {showSelection && (
                <Stack direction='row' className='flex-shrink-0 items-center px-5'>
                    <Checkbox className='w-6 h-6 text-sm text-blue-400 border-blue-400/25 has-[input:checked]:bg-blue-400/10'/>
                </Stack>
            )}
            {columns.map(({render, placement="left"},index) => (
                <Stack key={uuidv4()} direction='row' className={cn('flex-grow gap-2 items-center px-5 flex-shrink-0',
                    placement === "center" && "justify-center",
                    placement === "right" && "justify-end",
                )}>
                    {render(row, rowIndex)}
                </Stack>
            ))}
        </Stack>
    )
}
