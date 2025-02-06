import React from 'react';
import { Stack } from '@/components';

export default function SkeletonCardArtistMusicalGenre() {
    return (
        <Stack direction='row' spacing={3} itemsCenter role="status" className='animate-pulse justify-between px-5 py-2 border border-white/5 rounded-3xl'>
            <Stack direction='row' itemsCenter className='overflow-hidden items-center' style={{width: 'calc(100% / 3)'}}>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            </Stack>
            <Stack direction='row' itemsCenter className='justify-center items-center' style={{width: 'calc(100% / 3)'}}>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>  
            </Stack>
            <Stack direction='row' itemsCenter className='justify-end items-center' style={{width: 'calc(100% / 3)'}}>
                <div className="bg-gray-200 rounded-full dark:bg-gray-700 h-8 w-8"></div>
            </Stack>
        </Stack>
    )
}
