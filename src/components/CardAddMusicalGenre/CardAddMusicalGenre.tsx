import React, { useState } from 'react'

import { LoadingButton, Stack } from '@/components';
import CardAddMusicalGenreProps from './CardAddMusicalGenreProps';
import { IoTrashOutline } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';

export default function CardAddMusicalGenre({musicalGenres, added, handleAddMusicalGenre, handleRemoveMusicalGenre}:CardAddMusicalGenreProps) {
    const [loading, setLoading] = useState<boolean>(false);
    function onClick(evt:React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();
        setLoading(true);
        if (added) {
            return handleRemoveMusicalGenre?.(musicalGenres, () => setLoading(false));
        }
        handleAddMusicalGenre?.(musicalGenres, () => setLoading(false));
    }

    return (
        <Stack direction='row' className='gap-3 justify-between items-center px-3 py-2 border border-white/5 rounded-3xl'>
            <h1 className='text-sm font-medium text-gray-500 truncate'>{musicalGenres.name}</h1>
            {added ? (<>
                {handleRemoveMusicalGenre && <LoadingButton loading={loading} onClick={onClick} roundedLarger startIcon={IoTrashOutline} className='text-red-400 border border-red-500/10 rounded-3xl bg-red-500/5 hover:bg-red-500/10 disabled:text-red-400/25'>Remover</LoadingButton>}
            </>) : (
                <LoadingButton loading={loading} onClick={onClick} roundedLarger startIcon={FaPlus}>Adicionar</LoadingButton>
            )}
        </Stack>
    )
}