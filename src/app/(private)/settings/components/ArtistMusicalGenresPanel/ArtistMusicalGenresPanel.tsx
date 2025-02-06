"use client";

import { useState } from 'react';

import { GoSearch } from 'react-icons/go';
import { TbCategory } from 'react-icons/tb';

import MusicalGenre from '@/interfaces/MusicalGenre';
import { Button, Stack, TextField } from '@/components';
import ArtistMusicalGenre from '@/interfaces/ArtistMusicalGenre';
import useArtistMusicalGenres from '@/hooks/useArtistMusicalGenres';
import { useError, useNotification, useSelectSession } from '@/hooks';
import ArtistMusicalGenreService from '@/services/ArtistMusicalGenreService';
import CardArtistMusicalGenre from '@/components/CardArtistMusicalGenre/CardArtistMusicalGenre';
import ToggleMusicalGenreDialog from '@/components/AddMusicalGenreDialog/ToggleMusicalGenreDialog';
import SkeletonCardMusicalGenre from '@/components/CardArtistMusicalGenre/SkeletonCardArtistMusicalGenre';

const artistMusicalGenreService = new ArtistMusicalGenreService();

export default function ArtistMusicalGenresPanel() {
    const error = useError();
    const notification = useNotification();
    const {artist} = useSelectSession();
    const [query, setQuery] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const {isLoading, artistMusicalGenres, setArtistMusicalGenres} = useArtistMusicalGenres();

    function handleAddMusicalGender(musicalGenre:MusicalGenre, onFinally: () => void) {
        artistMusicalGenreService.create(artist.id, musicalGenre.id).then(response => {
            setArtistMusicalGenres(prevState => [response.data].concat(prevState));
            notification.success({title: "Gênero Musical", message: `${musicalGenre.name}, adicionado com sucesso!`});
        }).catch(error).finally(onFinally)
    }

    function handleRemoveMusicalGender({id, musicalGenre: {name}}:ArtistMusicalGenre, onFinally: () => void) {
        artistMusicalGenreService.delete(id).then(() => {
            setArtistMusicalGenres(prevState => prevState.filter(m => m.id !== id));
            notification.success({title: "Gênero Musical", message: `${name}, removido com sucesso!`});
        }).catch(error).finally(onFinally)
    }

    return (
        <Stack spacing={5} className='flex-1'>
            <Stack direction='row' className='justify-between items-start'>
                <Stack>
                    <h1 className='textt-sm text-gray-500 font-medium'>Gêneros Musicais</h1>
                    <p className='text-xs text-gray-500'>Há {artistMusicalGenres.length || 0} gêneros musicais no total.</p>
                </Stack>

                <Stack direction='row' className='gap-5 items-center'>
                    <TextField type='search' startIcon={GoSearch} placeholder='Pesquisar...' className='w-screen max-w-sm' onChange={evt => setQuery(evt.currentTarget.value)} />
                    <Button size='large' roundedLarger onClick={() => setOpen(true)} startIcon={TbCategory}>Adicionar</Button>
                    <ToggleMusicalGenreDialog 
                        open={open}
                        handleClose={() => setOpen(false)} 
                        handleAddMusicalGenre={handleAddMusicalGender}
                        addedMusicalGenres={artistMusicalGenres.map(a => a.musicalGenre)}
                    />
                </Stack>
            </Stack>
            <Stack spacing={5} className='flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full' style={{height: 'calc(100vh - 322px)'}}>
                {isLoading ? (
                    <>
                        <SkeletonCardMusicalGenre />
                        <SkeletonCardMusicalGenre />
                        <SkeletonCardMusicalGenre />
                        <SkeletonCardMusicalGenre />
                        <SkeletonCardMusicalGenre />
                        <SkeletonCardMusicalGenre />
                        <SkeletonCardMusicalGenre />
                        <SkeletonCardMusicalGenre />
                    </>
                ) : artistMusicalGenres.filter(artistMusicalGenre => artistMusicalGenre.musicalGenre.name.toLowerCase().includes(query.toLowerCase())).map(artistMusicalGenre => (
                    <CardArtistMusicalGenre 
                        key={artistMusicalGenre.id}
                        artistMusicalGenre={artistMusicalGenre}
                        handleRemoveMusicalGenre={handleRemoveMusicalGender}
                    />
                ))}
            </Stack>
        </Stack>
    )
}
