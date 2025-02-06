"use client";

import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

import { GoSearch } from 'react-icons/go';
import { PiPlaylist } from 'react-icons/pi';

import Album from '@/interfaces/Album';
import FileService from '@/services/FileService';
import AlbumService from '@/services/AlbumService';
import CardAlbum from '@/components/CardAlbum/CardAlbum';
import { useAlbums, useError, useNotification } from '@/hooks';
import AlbumDialog from '@/components/AlbumDialog/AlbumDialog';
import SkeletonCardAlbum from '@/components/CardAlbum/SkeletonCardAlbum';
import { Button, LoadingButton, Pagination, Stack, TextField } from '@/components';

const fileService = new FileService();
const albumService = new AlbumService();

export default function Albums() {
    const error = useError();
    const notification = useNotification();
    const { register, handleSubmit } = useForm<{name: string}>();
    const [albumDialog, setAlbumDialog] = useState<{open:boolean, album?:Album}>({open: false});
    const {isLoading, isError, pageRequest, setPageRequest, pagination, setPagination, total, setTotal} = useAlbums();

    function onUpdate(album:Album) {
        setPagination(prev => ({...prev!, content: prev!.content.map(a => a.id === album.id ? album : a)}))
    }

    function handleDelete({id, name}: Album, onFinish: () => void) {
        albumService.delete(id).then(() => {
            onFinish();
            setTotal(prev => prev - 1);
            setPagination(prev => ({...prev!, content: prev!.content.filter(p => p.id !== id)}));
            notification.success({title: 'Album', message: `${name}, excluído com sucesso!`});
        }).catch(error).finally(onFinish);
    }

    function handleUpdateCover(album: Album, file:File, onFinish: () => void) {
        fileService.updateAlbumCover(album.id, file).then(response => {
            const {filename} = response.data;
            onUpdate({...album, cover: filename});
            notification.success({title: 'Album', message: `Capa do album ${album.name}, atualizada com sucesso!`});
        }).catch(error).finally(onFinish);
    }

    return (
        <Stack spacing={5} className='py-5 h-full'>
            <Stack spacing={5} direction='row' className='justify-between items-center px-5'>
                <Stack>
                    <h1 className='textt-sm text-gray-500 font-medium'>Album</h1>
                    <p className='text-xs text-gray-600'>Há {total} albums no total.</p>
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
                        <Button size='large' roundedLarger onClick={() => setAlbumDialog(prev => ({...prev, open: true}))} startIcon={PiPlaylist} data-tooltip-id='btn-social-media-dialog' data-tooltip-content={"Nova"}>Adicionar</Button>
                        <Tooltip id='btn-social-media-dialog' place='bottom'/>
                    </Stack>
                    <AlbumDialog 
                        {...albumDialog}
                        onUpdate={onUpdate}
                        handleClose={() => setAlbumDialog(prev => ({...prev, open: false, playlist: undefined}))} 
                        onCreate={album => setPagination(prev => ({...prev!, content: [album].concat(prev!.content)}))} 
                    />
                </Stack>
            </Stack>
            <Stack spacing={3} className='flex-grow h-full px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {(isLoading && (pagination?.numberOfElements || 0) === 0) || isError ? (<>
                    <SkeletonCardAlbum />
                    <SkeletonCardAlbum />
                    <SkeletonCardAlbum />
                    <SkeletonCardAlbum />
                    <SkeletonCardAlbum />
                    <SkeletonCardAlbum />
                    <SkeletonCardAlbum />
                    <SkeletonCardAlbum />
                    <SkeletonCardAlbum />
                    <SkeletonCardAlbum />
                </>) : pagination?.content.map((album, index) => <CardAlbum 
                    album={album}
                    key={album.id}
                    onUpdate={onUpdate}
                    placementTop={index > 4}
                    handleRemoveAlbum={handleDelete}
                    handleUpdateCover={handleUpdateCover}
                    handleToUpdateAlbum={album => setAlbumDialog(prev => ({...prev, open: true, album}))}
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
