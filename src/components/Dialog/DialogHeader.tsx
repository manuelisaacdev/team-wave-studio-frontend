import React from 'react'
import DialogHeaderProps from './DialogHeaderProps'
import {IconButton, Stack} from '@/components'
import { IoCloseOutline } from 'react-icons/io5'

export default function DialogHeader({title, children, loading, afterAction, handleClose}:DialogHeaderProps) {
    return (
        <Stack fullWidth>
            <Stack direction='row' spaceBetween itemsCenter className="flex-shrink-0 py-2 px-3 border-b border-white/5">
                <div className="flex gap-3 items-center">
                    {title && <h1 className='text-gray-500 font-medium text-base'>{title}</h1>}
                    {children}
                </div>
                {handleClose && (
                    <IconButton onClick={handleClose} disabled={loading}>
                        <IoCloseOutline />
                    </IconButton>
                )}
            </Stack>
            {afterAction && (
                <Stack direction='row' spaceBetween itemsCenter className="flex-shrink-0 py-2 px-3">
                    {afterAction}
                </Stack>
            )}
        </Stack>
    )
}
