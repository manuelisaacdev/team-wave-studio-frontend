"use client";

import dayjs from 'dayjs';
import React, { useState } from 'react';

import { ClipLoader } from 'react-spinners';
import { IoTrashOutline } from 'react-icons/io5';

import { useConfirmation } from '@/hooks';
import { IconButton, Stack } from '@/components';
import CardArtistMusicalGenreProps from './CardArtistMusicalGenreProps';

export default function CardArtistMusicalGenre({artistMusicalGenre, handleRemoveMusicalGenre}:CardArtistMusicalGenreProps) {
    const confirmation = useConfirmation();
    const [loading, setLoading] = useState(false);
    
    function onConfirm() {
        setLoading(true);
        handleRemoveMusicalGenre(artistMusicalGenre, () => setLoading(false));
    }
    
    function onClick(evt:React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();
        confirmation.show({
            onConfirm,
            title: "Remover Rede Social",
            message: <span>Tem certeza que deseja remover o gênero musical <br/><b>{artistMusicalGenre.musicalGenre.name}</b>?</span>,
        });
    }

    return (
        <Stack direction='row' spacing={3} itemsCenter className='justify-between px-5 py-2 border border-white/5 rounded-3xl'>
            <Stack direction='row' itemsCenter className='flex-1 overflow-hidden'>
                <h1 className='text-sm font-medium text-gray-500 truncate'>{artistMusicalGenre.musicalGenre.name}</h1>
            </Stack>
            <Stack direction='row' itemsCenter className='flex-1 justify-center'>
                <p className='text-sm text-gray-500'>{dayjs(artistMusicalGenre.createdAt).format("DD/MM/YYYY HH:mm")}</p>
            </Stack>
            <Stack direction='row' itemsCenter className='flex-1 justify-end'>
                <IconButton onClick={onClick} className='text-gray-700 text-lg hover:text-red-400 hover:bg-red-400/5'>
                    {loading ? <ClipLoader size={18} color={"#6b7280"}/> : <IoTrashOutline className='text-xl'/>}
                </IconButton>
            </Stack>
        </Stack>
    )
}
