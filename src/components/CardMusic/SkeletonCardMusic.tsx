"use client";

import React from 'react'
import { BsDot } from 'react-icons/bs';
import { Box, Stack } from '@/components';

export default function SkeletonCardMusic() {
    return (
        <Stack spacing={3} direction='row' itemsCenter className='animate-pulse justify-between rounded-lg border border-white/5 pe-3'>
            <Box component={"div"} className='relative flex-shrink-0 rounded-s-lg w-12 h-12 overflow-hidden'>
                <span className='absolute z-0 inset-0 bg-paper-primary/50'></span>
                <img alt={"Capa"} className='w-full h-full' src={"/img/placeholder-cover-playlist-612x612.jpg"}/>
            </Box>

            <Stack className='flex-1 gap-1 overflow-hidden'>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
                
                <Stack direction='row' spacing={1} itemsCenter className='text-xs text-gray-600 truncate'>
                    <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                    <BsDot className='text-sm text-gray-600'/>
                    <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                </Stack>
            </Stack>

            <Stack direction='row' spacing={3} itemsCenter className='flex-1 justify-center'>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            </Stack>

            <Stack direction='row' spacing={3} itemsCenter className='flex-1 justify-center'>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
            </Stack>

            <Stack direction='row' spacing={5} itemsCenter className='flex-1 justify-end' style={{width: 'calc(100% / 4)'}}>
                <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </Stack>
        </Stack>
    )
}
