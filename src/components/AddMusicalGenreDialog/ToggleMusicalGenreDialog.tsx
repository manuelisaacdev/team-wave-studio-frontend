"use client";

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { GoSearch } from 'react-icons/go';

import { usePaginationMusicalGenres } from "@/hooks";
import ToggleMusicalGenreDialogProps from './ToggleMusicalGenreDialogProps';
import SearchMusicalGenreSchema from '@/schemas/SearchMusicalGenreSchema';
import CardAddMusicalGenre from "@/components/CardAddMusicalGenre/CardAddMusicalGenre";
import SkeletonCardAddMusicalGenre from '../CardAddMusicalGenre/SkeletonCardAddMusicalGenre';
import { Dialog, DialogActions, DialogContent, DialogHeader, LoadingButton, Pagination, Stack, TextField } from '@/components';


export default function ToggleMusicalGenreDialog({addedMusicalGenres=[], open, handleClose, handleAddMusicalGenre, handleRemoveMusicalGenre}:ToggleMusicalGenreDialogProps) {
    const {isLoading, isError, pagination, pageRequest, setPageRequest, scrollRef} = usePaginationMusicalGenres();
    const {register, handleSubmit } = useForm<{name?: string}>({resolver: yupResolver(SearchMusicalGenreSchema)});

    return (
        <Dialog open={open} size='small' closeOnBackdropClick handleClose={handleClose}>
            <DialogHeader title='Adicionar Gênero Musical' handleClose={handleClose} afterAction={
                <Stack component={"form"} fullWidth onSubmit={handleSubmit(({name}) => setPageRequest({...pageRequest, name, page: 0}))}>
                    <TextField type='text' placeholder='Pesquisar...' {...register("name")} fullWidth endActionPlacement='out' endAction={
                        <LoadingButton loading={isLoading} type='submit' size='large' className='text-lg w-16 px-0 rounded-e-3xl rounded-s-none self-center'>
                            {!isLoading && <GoSearch />}
                        </LoadingButton>
                    }/>
                </Stack>
            }/>
            <DialogContent ref={scrollRef} className="flex flex-col gap-5 py-3">
                {(isLoading && (pagination?.numberOfElements || 0) === 0) || isError ? (<>
                    <SkeletonCardAddMusicalGenre />
                    <SkeletonCardAddMusicalGenre />
                    <SkeletonCardAddMusicalGenre />
                    <SkeletonCardAddMusicalGenre />
                    <SkeletonCardAddMusicalGenre />
                    <SkeletonCardAddMusicalGenre />
                    <SkeletonCardAddMusicalGenre />
                    <SkeletonCardAddMusicalGenre />
                    <SkeletonCardAddMusicalGenre />
                    <SkeletonCardAddMusicalGenre />
                </>) : (pagination?.content.map(musicalGenre => (
                    <CardAddMusicalGenre 
                        key={musicalGenre.id} 
                        musicalGenres={musicalGenre} 
                        handleAddMusicalGenre={handleAddMusicalGenre} 
                        handleRemoveMusicalGenre={handleRemoveMusicalGenre} 
                        added={!!addedMusicalGenres.find(m => m.id === musicalGenre.id)} 
                    />
                )))}
            </DialogContent>
            <DialogActions>
                <Pagination currentPage={(pageRequest.page || 0) + 1} showMax={5} totalPages={pagination?.totalPages} onPageChange={newPage => setPageRequest({...pageRequest, page: newPage - 1})} className="flex-grow"/>
            </DialogActions>
        </Dialog>
    );
}
