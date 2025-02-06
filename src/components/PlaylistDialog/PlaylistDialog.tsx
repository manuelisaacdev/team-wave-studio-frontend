"use client";

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { CiGlobe } from 'react-icons/ci';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import { PlaylistDTO } from '@/interfaces/Playlist';
import PlaylistDialogProps from './PlaylistDialogProps';
import PlaylistService from '@/services/PlaylistService';
import PlaylistDTOSchema from '@/schemas/PlaylistDTOSchema';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import Privacy, { PrivacyLabel } from '@/interfaces/Privacy';
import { useAppSelector, useError, useNotification } from '@/hooks';
import { Dialog, DialogActions, DialogContent, DialogHeader, Option, Select, TextArea, TextField } from '@/components/';

const playlistService = new PlaylistService();

export default function PlaylistDialog({open, playlist, onCreate, onUpdate, handleClose}:PlaylistDialogProps) {
    const error = useError();
    const notification = useNotification();
    const [loading, setLoading] = useState(false);
    const {user: {id}} = useAppSelector(selectSession);
    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm<PlaylistDTO>({
        resolver: yupResolver(PlaylistDTOSchema),
    });

    const privacy = watch("privacy") as Privacy;

    function handleCreate(playlistDTO:PlaylistDTO) {
        setLoading(true);
        playlistService.create(id, playlistDTO).then(response => {
            handleClose?.();
            onCreate?.(response.data);
            notification.success({title: "Playlist", message: `${response.data.name}, foi criado com sucesso!`})
        }).catch(error).finally(() => setLoading(false));
    }

    function handleUpdate(playlistDTO:PlaylistDTO) {
        setLoading(true);
        playlistService.update(playlist!.id, playlistDTO).then(response => {
            handleClose?.();
            onUpdate?.(response.data);
            notification.success({title: "Playlist", message: `${response.data.name}, foi atualizado com sucesso!`})
        }).catch(error).finally(function(){
            setLoading(false);
        });
    }

    useEffect(() => {
        if (open && playlist) {
            setValue("name", playlist.name);
            setValue("privacy", playlist.privacy);
            setValue("description", playlist.description);
        } else {
            setValue("name", "");
            setValue("description", "");
            setValue("privacy", Privacy.PUBLIC);
        }
    }, [open]);
    
    return (
        <Dialog open={open} size='small' paperProps={{component: "form", onSubmit: handleSubmit(playlist ? handleUpdate : handleCreate)}}>
            <DialogHeader loading={loading} title={playlist ? "Alterar Rede Social" : "Nova Rede Social"} handleClose={handleClose}/>
            <DialogContent className="flex flex-col gap-5 py-3">
                <TextField label='Nome:' type='text' error message={errors.privacy?.message} placeholder='Informe o nome...' startIcon={HiOutlineEnvelope} {...register("name")}/>
                <Select inputProps={{label: "Privacidade:", value: PrivacyLabel[privacy] || "", placeholder: "Selecione a privacidade...", startIcon: CiGlobe}} >
                    {handleClose => (Object.values(Privacy) as Privacy[]).map(value => (
                        <Option key={value} onClick={() => {
                            handleClose();
                            setValue("privacy", value as Privacy);
                        }} selected={privacy === value}>{PrivacyLabel[value]}</Option>
                    ))}
                </Select>
                <TextArea label='Bigrafia:' error message={errors.description?.message} placeholder='Fale um pouco sobre a playlist...' {...register("description")}/>
            </DialogContent>
            <DialogActions loading={loading} handleClose={handleClose} showButtonSubmit/>
        </Dialog>
    )
}
