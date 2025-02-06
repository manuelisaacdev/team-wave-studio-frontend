"use client";

import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

import { GoSearch } from 'react-icons/go';
import { PiPlaylist } from 'react-icons/pi';

import Playlist from '@/interfaces/Playlist';
import FileService from '@/services/FileService';
import PlaylistService from '@/services/PlaylistService';
import CardPlaylist from '@/components/CardPlaylist/CardPlaylist';
import { useError, useNotification, usePlaylists } from '@/hooks';
import SkeletonCardPlaylist from '@/components/CardPlaylist/SkeletonCardPlaylist';
import { Button, LoadingButton, Pagination, PlaylistDialog, Stack, TextField } from '@/components';

const fileService = new FileService();
const playlistService = new PlaylistService();

export default function Playlists() {
    const error = useError();
    const notification = useNotification();
    const { register, handleSubmit } = useForm<{name: string}>();
    const [playlistDialog, setPlaylistDialog] = useState<{open:boolean, playlist?:Playlist}>({open: false});
    const {isLoading, isError, pageRequest, setPageRequest, pagination, setPagination, total, setTotal} = usePlaylists();

    function onUpdate(playlist:Playlist) {
        setPagination(prev => ({...prev!, content: prev!.content.map(p => p.id === playlist.id ? playlist : p)}))
    }

    function handleDelete({id, name}: Playlist, onFinish: () => void) {
        playlistService.delete(id).then(() => {
            onFinish();
            setTotal(prev => prev - 1);
            setPagination(prev => ({...prev!, content: prev!.content.filter(p => p.id !== id)}));
            notification.success({title: 'Playlist', message: `${name}, excluído com sucesso!`});
        }).catch(error).finally(onFinish);
    }

    function handleUpdateCover(playlist: Playlist, file:File, onFinish: () => void) {
        fileService.updatePlaylistCover(playlist.id, file).then(response => {
            const {filename} = response.data;
            onUpdate({...playlist, cover: filename});
            notification.success({title: 'Playlist', message: `Capa da playlist ${playlist.name}, atualizada com sucesso!`});
        }).catch(error).finally(onFinish);
    }

    return (
        <Stack spacing={5} className='py-5 h-full'>
            <Stack spacing={5} direction='row' className='justify-between items-center px-5'>
                <Stack>
                    <h1 className='textt-sm text-gray-500 font-medium'>Playlist</h1>
                    <p className='text-xs text-gray-600'>Há {total} playlists no total.</p>
                </Stack>

                <Stack direction='row' spacing={5} itemsCenter>
                    <Stack component={"form"} onSubmit={handleSubmit((({name}) => setPageRequest(prev => ({...prev, page: 0, name}))))} className='w-screen max-w-sm'>
                        <TextField type='text' placeholder='Pesquisar...' {...register("name")} fullWidth endActionPlacement='out' endAction={
                            <LoadingButton loading={isLoading} type='submit' size='large' className='text-lg w-16 px-0 rounded-e-3xl rounded-s-none self-center'>
                                {!isLoading && <GoSearch />}
                            </LoadingButton>
                        }/>
                    </Stack>

                    <Stack direction='row' className='gap-5 items-center'>
                        <Button size='large' roundedLarger onClick={() => setPlaylistDialog(prev => ({...prev, open: true}))} startIcon={PiPlaylist} data-tooltip-id='btn-social-media-dialog' data-tooltip-content={"Nova"}>Adicionar</Button>
                        <Tooltip id='btn-social-media-dialog' place='bottom'/>
                    </Stack>
                    <PlaylistDialog 
                        {...playlistDialog}
                        onUpdate={onUpdate}
                        handleClose={() => setPlaylistDialog(prev => ({...prev, open: false, playlist: undefined}))} 
                        onCreate={playlist => setPagination(prev => ({...prev!, content: [playlist].concat(prev!.content)}))} 
                    />
                </Stack>
            </Stack>
            <Stack spacing={3} className='flex-grow h-full px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {(isLoading && (pagination?.numberOfElements || 0) === 0)  || isError ? (<>
                    <SkeletonCardPlaylist/>
                    <SkeletonCardPlaylist/>
                    <SkeletonCardPlaylist/>
                    <SkeletonCardPlaylist/>
                    <SkeletonCardPlaylist/>
                    <SkeletonCardPlaylist/>
                    <SkeletonCardPlaylist/>
                    <SkeletonCardPlaylist/>
                    <SkeletonCardPlaylist/>
                    <SkeletonCardPlaylist/>
                </>) : pagination?.content.map((playliast, index) => <CardPlaylist 
                    key={playliast.id}
                    playlist={playliast}
                    placementTop={index > 4}
                    handleRemovePlaylist={handleDelete}
                    handleUpdateCover={handleUpdateCover}
                    handleToUpdatePlaylist={playlist => setPlaylistDialog(prev => ({...prev, open: true, playlist}))}
                />)}
                {isLoading && pagination?.content.length === 0 && (
                    <Stack itemsCenter fullWidth className='justify-center flex-grow'>
                        <ClipLoader size={18} color={"#6b7280"}/>
                    </Stack>
                )}
            </Stack>
            <Pagination currentPage={(pageRequest.page || 0) + 1} totalPages={pagination?.totalPages} onPageChange={newPage => setPageRequest({...pageRequest, page: newPage - 1})} className="flex-grow"/>
        </Stack>
    )
}
