"use client";

import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { HiOutlineEnvelope } from 'react-icons/hi2';
import { IoCalendarClearOutline } from 'react-icons/io5';

import { ArtistDTO } from '@/interfaces/Artist';
import ArtistService from '@/services/ArtistService';
import UpdateArtistSchema from '@/schemas/UpdateArtistSchema';
import { notification } from '@/redux/slicer/notificationSlicer';
import { useAppDispatch, useAppSelector, useError } from '@/hooks';
import { LoadingButton, Stack, TextArea, TextField } from '@/components';
import { handleChangeArtist, selectSession } from '@/redux/slicer/sessionSlicer';

const now = new Date();
const artistService = new ArtistService();

export default function ArtistAccount() {
    const error = useError();
    const dispatch = useAppDispatch();
    const {artist: {id, name, debutYear, biography}, user} = useAppSelector(selectSession);
    const [loading, setLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors}} = useForm<ArtistDTO>({
        resolver: yupResolver(UpdateArtistSchema),
        defaultValues: {name, debutYear, biography},
    });

    function onSubmit(artistDTO:ArtistDTO) {
        setLoading(true);
        artistService.update(id, artistDTO).then(response => {
            const data = response.data;
            dispatch(handleChangeArtist(data));
            dispatch(notification.success({title: "Atualização de Perfil de Artista", message: `${user.name}, o seu perfil de artista foi atualizado com sucesso!`}));
        }).catch(error).finally(function(){
            setLoading(false);
        });
    }

    return (
        <Stack spacing={5} component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <TextField label='Nome Artístico:' type='text' error message={errors.name?.message} placeholder='Informe o seu nome artístico...' startIcon={HiOutlineEnvelope} {...register("name")}/>
            <TextField label='Data de estreia:' type='number' error message={errors.debutYear?.message} placeholder='Informe a sua data de estreia...' startIcon={IoCalendarClearOutline} defaultValue={now.getFullYear()} min={now.getFullYear() - dayjs(user?.dateOfBirth).date()} max={now.getFullYear()} {...register("debutYear")}/>
            <TextArea label='Bigrafia:' error message={errors.biography?.message} placeholder='Fale um pouco sebre voçê' {...register("biography")} className='h-48'/>
            <LoadingButton loading={loading} type='submit' size='large' className='px-8 rounded-3xl self-center'>Salvar</LoadingButton>
        </Stack>
    )
}
