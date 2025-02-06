"use client";

import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { CiGlobe } from 'react-icons/ci';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import MusicSchema from '@/schemas/MusicSchema';
import MusicDialogProps from './MusicDialogProps';
import MusicService from '@/services/MusicService';
import { MusicDTO, ReleaseType } from '@/interfaces/Music';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import { useAppSelector, useError, useMusicalGenres, useNotification } from '@/hooks';
import { DatePicker, Dialog, DialogActions, DialogContent, DialogHeader, Option, Select, TextArea, TextField } from '@/components';

const musicService = new MusicService();

export default function MusicDialog({open, music, onCreate, onUpdate, handleClose}:MusicDialogProps) {
    const error = useError();
    const {data} = useMusicalGenres();
    const notification = useNotification();
    const [loading, setLoading] = useState(false);
    const {artist: {id}} = useAppSelector(selectSession);
    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm<MusicDTO>({
        resolver: yupResolver(MusicSchema),
    });

    const musicalGenreId = watch("musicalGenreId");
    const releaseType = watch("releaseType") as ReleaseType;

    function handleCreate(musicDTO:MusicDTO) {
        setLoading(true);
        musicService.create(id, musicDTO).then(response => {
            handleClose?.();
            onCreate?.(response.data);
            notification.success({title: "Música", message: `${response.data.title}, foi criado com sucesso!`})
        }).catch(error).finally(() => setLoading(false));
    }

    function handleUpdate(musicDTO:MusicDTO) {
        setLoading(true);
        musicService.update(music!.id, musicDTO).then(response => {
            handleClose?.();
            onUpdate?.(response.data);
            notification.success({title: "Album", message: `${response.data.title}, foi atualizado com sucesso!`})
        }).catch(error).finally(function(){
            setLoading(false);
        });
    }

    useEffect(() => {
        if (open && music) {
            setValue("title", music.title);
            setValue("lyrics", music.lyrics);
            setValue("releaseDate", music.releaseDate);
            setValue("releaseType", music.releaseType);
            setValue("description", music.description);
            setValue("musicalGenreId", music.musicalGenreId);
        } else {
            setValue("title", "");
            setValue("lyrics", "");
            setValue("releaseType", "");
            setValue("description", "");
            setValue("musicalGenreId", "");
            setValue("releaseDate", dayjs().toISOString());
        }
    }, [open]);
    
    return (
        <Dialog open={open} size='small' paperProps={{component: "form", onSubmit: handleSubmit(music ? handleUpdate : handleCreate)}}>
            <DialogHeader loading={loading} title={music ? "Alterar Música" : "Nova Música"} handleClose={handleClose}/>
            <DialogContent className="flex flex-col gap-5 py-3">
                <TextField label='Título:' type='text' error message={errors.title?.message} placeholder='Informe o título...' startIcon={HiOutlineEnvelope} {...register("title")}/>
                <DatePicker textFieldProps={{label: 'Data de Lançamento:', error: true, message: errors.releaseDate?.message, required: true, ...register("releaseDate")}}/>
                <Select inputProps={{label: "Gênero Musical:", value: data?.find(m => m.id === musicalGenreId)?.name || "", placeholder: "Selecione a privacidade...", startIcon: CiGlobe}} >
                    {handleClose => data?.map(({id, name}) => (
                        <Option key={id} onClick={() => {
                            handleClose();
                            setValue("musicalGenreId", id);
                        }} selected={musicalGenreId === id}>{name}</Option>
                    ))}
                </Select>
                <Select inputProps={{label: "Tipo de lançamento:", value: releaseType ? releaseType : "", placeholder: "Selecione o tipo de lançamento...", startIcon: CiGlobe}} >
                    {handleClose => (Object.values(ReleaseType) as ReleaseType[]).map(value => (
                        <Option key={value} onClick={() => {
                            handleClose();
                            setValue("releaseType", value as ReleaseType);
                        }} selected={releaseType === value}>{value}</Option>
                    ))}
                </Select>
                <TextArea label='Letra:' error message={errors.description?.message} placeholder='Informe a letra da música...' {...register("lyrics")}/>
                <TextArea label='Descrição:' error message={errors.description?.message} placeholder='Fale um pouco sobre o album...' {...register("description")}/>
            </DialogContent>
            <DialogActions loading={loading} handleClose={handleClose} showButtonSubmit/>
        </Dialog>
    )
}
