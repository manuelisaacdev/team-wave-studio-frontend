"use client";

import React from 'react';

import { useAppSelector } from '@/hooks';
import { Avatar, Stack } from '@/components';
import { selectSession } from '@/redux/slicer/sessionSlicer';

export default function OverviewPanel() {
    const {user, artist} = useAppSelector(selectSession);

    return (
        <Stack spacing={5}>
            <Stack spacing={2} direction='row' itemsCenter>
                <Avatar className='cursor-pointer' width={256} height={256} src={user.profilePicture} alt={artist.name}/>
                <Stack>
                    <h1 className='text-lg font-medium'>{artist.name}</h1>
                    <p className='text-sm text-gray-500'>{user.email}</p>
                </Stack>
            </Stack>
        </Stack>
    )
}
