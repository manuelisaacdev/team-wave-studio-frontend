"use client";

import React, { useRef, useState } from 'react';

import { MdOutlineFileUpload } from 'react-icons/md';

import useError from '@/hooks/useError';
import FileService from '@/services/FileService';
import { LoadingButton, Stack, TextField } from '@/components';
import { useAppDispatch, useAppSelector, useNotification } from '@/hooks';
import { handleChangeUserProfilePicture } from '@/redux/slicer/sessionSlicer';

const fileService = new FileService();

export default function ProfilePhotoUpdateForm() {
    const error = useError();
    const dispatch = useAppDispatch();
    const notification = useNotification();
    const resetRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>();
    const {user: {id}} = useAppSelector(state => state.session);
    const [loading, setLoading] = useState<boolean>(false);

    function onSubmit(evt:React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setLoading(true);
        fileService.updateUserProfilePicture(id, file!).then(response => {
            setFile(undefined);
            resetRef.current?.click();
            dispatch(handleChangeUserProfilePicture(response.data));
            notification.success({message: 'Foto de perfil atualizada com sucesso!', title: 'Foto de perfil'});
        }).catch(error).finally(() => setLoading(false));
    }

    return (
        <Stack onSubmit={onSubmit} component={"form"} spacing={5}>
            <TextField onChange={evt => setFile(evt.currentTarget.files?.item(0))} label='Foto de Perfil:' type='file' placeholder='Informe uma imagem...' startIcon={MdOutlineFileUpload} required endActionPlacement='out' endAction={
                <LoadingButton loading={loading} disabled={!file} type='submit' size='large' className='px-10 rounded-e-3xl rounded-s-none self-center'>Salvar</LoadingButton>
            }/>
            <input type="reset" ref={resetRef} className='hidden'/>
        </Stack>
    )
}
