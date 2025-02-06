"use client";

import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';

import { CgMusic } from 'react-icons/cg';
import { GoSearch } from 'react-icons/go';

import Music from '@/interfaces/Music';
import FileService from '@/services/FileService';
import MusicService from '@/services/MusicService';
import CardMusic from '@/components/CardMusic/CardMusic';
import MusicDialog from '@/components/MusicDialog/MusicDialog';
import { useError, useMusics, useNotification } from '@/hooks';
import SkeletonCardMusic from '@/components/CardMusic/SkeletonCardMusic';
import { Button, LoadingButton, Pagination, Stack, TextField } from '@/components';

const fileService = new FileService();
const musicService = new MusicService();

export default function Musics() {
    const error = useError();
    const notification = useNotification();
    const { register, handleSubmit } = useForm<{title: string}>();
    const [musicDialog, setMusicDialog] = useState<{open:boolean, music?:Music}>({open: false});
    const {isLoading, isError, pageRequest, setPageRequest, pagination, setPagination, total, setTotal} = useMusics();

    function onUpdate(music:Music) {
        setPagination(prev => ({...prev!, content: prev!.content.map(p => p.id === music.id ? music : p)}))
    }

    function handleDelete({id, title}: Music, onFinish: () => void) {
        musicService.delete(id).then(() => {
            onFinish();
            setTotal(prev => prev - 1);
            setPagination(prev => ({...prev!, content: prev!.content.filter(p => p.id !== id)}));
            notification.success({title: 'Música', message: `${title}, excluído com sucesso!`});
        }).catch(error).finally(onFinish);
    }

    function handleUpdateCover(music: Music, file:File, onFinish: () => void) {
        fileService.updateMusicCover(music.id, file).then(response => {
            const {filename} = response.data;
            onUpdate({...music, cover: filename});
            notification.success({title: 'Música', message: `Capa da música ${music.title}, atualizada com sucesso!`});
        }).catch(error).finally(onFinish);
    }

    function handleUpdateAudio(music: Music, file:File, onFinish: () => void) {
        fileService.updateMusicAudio(music.id, file).then(response => {
            const {filename} = response.data;
            onUpdate({...music, audio: filename, available: true});
            notification.success({title: 'Música', message: `Audio da música ${music.title}, atualizada com sucesso!`});
        }).catch(error).finally(onFinish);
    }

    return (
        <Stack spacing={5} className='py-5 h-full'>
            <Stack spacing={5} direction='row' className='justify-between items-center px-5'>
                <Stack>
                    <h1 className='textt-sm text-gray-500 font-medium'>Músicas</h1>
                    <p className='text-xs text-gray-600'>Há {total} músicas no total.</p>
                </Stack>

                <Stack direction='row' spacing={5} itemsCenter>
                    <Stack component={"form"} onSubmit={handleSubmit((({title}) => setPageRequest(prev => ({...prev, page: 0, title}))))} className='w-screen max-w-sm'>
                        <TextField type='text' placeholder='Pesquisar...' {...register("title")} fullWidth endActionPlacement='out' endAction={
                            <LoadingButton loading={isLoading} type='submit' size='large' className='text-lg w-16 px-0 rounded-e-3xl rounded-s-none self-center'>
                                {!isLoading && <GoSearch />}
                            </LoadingButton>
                        }/>
                    </Stack>

                    <Stack direction='row' className='gap-5 items-center'>
                        <Button size='large' roundedLarger onClick={() => setMusicDialog(prev => ({...prev, open: true}))} startIcon={CgMusic} data-tooltip-id='btn-social-media-dialog' data-tooltip-content={"Nova Música"}>Adicionar</Button>
                        <Tooltip id='btn-social-media-dialog' place='bottom'/>
                    </Stack>
                    <MusicDialog 
                        {...musicDialog}
                        onUpdate={onUpdate}
                        handleClose={() => setMusicDialog(prev => ({...prev, open: false, music: undefined}))} 
                        onCreate={music => setPagination(prev => ({...prev!, content: [music].concat(prev!.content)}))} 
                    />
                </Stack>
            </Stack>
            <Stack spacing={3} className='flex-grow h-full px-5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {(isLoading && (pagination?.numberOfElements || 0) === 0)  || isError ? (<>
                    <SkeletonCardMusic/>
                    <SkeletonCardMusic/>
                    <SkeletonCardMusic/>
                    <SkeletonCardMusic/>
                    <SkeletonCardMusic/>
                    <SkeletonCardMusic/>
                    <SkeletonCardMusic/>
                    <SkeletonCardMusic/>
                    <SkeletonCardMusic/>
                    <SkeletonCardMusic/>
                </>) : pagination?.content.map((music, index) => <CardMusic
                    key={music.id}
                    music={music}
                    placementTop={index > 4}
                    handleRemoveMusic={handleDelete}
                    handleUpdateAudio={handleUpdateAudio}
                    handleUpdateCover={handleUpdateCover}
                    handleToUpdateMusic={music => setMusicDialog(prev => ({...prev, open: true, music}))}
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
