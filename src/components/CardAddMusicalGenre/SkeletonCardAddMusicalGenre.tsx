"use client";

import { Stack } from '@/components';

export default function SkeletonCardAddMusicalGenre() {
    return (
        <Stack direction='row' className='animate-pulse gap-3 justify-between items-center px-3 py-2 border border-white/5 rounded-3xl'>
            <div className="bg-gray-200 rounded-full dark:bg-gray-700 h-1.5 w-28"></div>
            <div className="bg-gray-200 rounded-3xl dark:bg-gray-700 h-6 w-28"></div>
        </Stack>
    )
}
