"use client";

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { CiGlobe } from 'react-icons/ci';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import { AlbumDTO, AlbumType } from '@/interfaces/Album';
import AlbumSchema from '@/schemas/AlbumSchema';
import AlbumDialogProps from './AlbumDialogProps';
import AlbumService from '@/services/AlbumService';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import Privacy, { PrivacyLabel } from '@/interfaces/Privacy';
import { useAppSelector, useError, useNotification } from '@/hooks';
import { DatePicker, Dialog, DialogActions, DialogContent, DialogHeader, Option, Select, TextArea, TextField } from '@/components';
import dayjs from 'dayjs';

const albumService = new AlbumService();

export default function AlbumDialog({open, album, onCreate, onUpdate, handleClose}:AlbumDialogProps) {
    const error = useError();
    const notification = useNotification();
    const [loading, setLoading] = useState(false);
    const {artist: {id}} = useAppSelector(selectSession);
    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm<AlbumDTO>({
        resolver: yupResolver(AlbumSchema),
    });

    const privacy = watch("privacy") as Privacy;
    const albumType = watch("albumType") as AlbumType;

    function handleCreate(albumDTO:AlbumDTO) {
        setLoading(true);
        albumService.create(id, albumDTO).then(response => {
            handleClose?.();
            onCreate?.(response.data);
            notification.success({title: "Album", message: `${response.data.name}, foi criado com sucesso!`})
        }).catch(error).finally(() => setLoading(false));
    }

    function handleUpdate(albumDTO:AlbumDTO) {
        setLoading(true);
        albumService.update(album!.id, albumDTO).then(response => {
            handleClose?.();
            onUpdate?.(response.data);
            notification.success({title: "Album", message: `${response.data.name}, foi atualizado com sucesso!`})
        }).catch(error).finally(function(){
            setLoading(false);
        });
    }

    useEffect(() => {
        if (open && album) {
            setValue("name", album.name);
            setValue("privacy", album.privacy);
            setValue("albumType", album.albumType);
            setValue("description", album.description);
            setValue("releaseDate", album.releaseDate);
        } else {
            setValue("name", "");
            setValue("albumType", "");
            setValue("description", "");
            setValue("privacy", Privacy.PUBLIC);
            setValue("releaseDate", dayjs().toISOString());
        }
    }, [open]);
    
    return (
        <Dialog open={open} size='small' paperProps={{component: "form", onSubmit: handleSubmit(album ? handleUpdate : handleCreate)}}>
            <DialogHeader loading={loading} title={album ? "Alterar Album" : "Nova Album"} handleClose={handleClose}/>
            <DialogContent className="flex flex-col gap-5 py-3">
                <TextField label='Nome:' type='text' error message={errors.privacy?.message} placeholder='Informe o nome...' startIcon={HiOutlineEnvelope} {...register("name")}/>
                <DatePicker textFieldProps={{label: 'Data de Lançamento:', error: true, message: errors.releaseDate?.message, required: true, ...register("releaseDate")}}/>
                <Select inputProps={{label: "Tipo de Album:", value: albumType || "", placeholder: "Selecione o tipo de album...", startIcon: CiGlobe}} >
                    {handleClose => (Object.values(AlbumType) as AlbumType[]).map(value => (
                        <Option key={value} onClick={() => {
                            handleClose();
                            setValue("albumType", value as AlbumType);
                        }} selected={albumType === value}>{value}</Option>
                    ))}
                </Select>
                <Select inputProps={{label: "Privacidade:", value: PrivacyLabel[privacy], placeholder: "Selecione a privacidade...", startIcon: CiGlobe}} >
                    {handleClose => (Object.values(Privacy) as Privacy[]).map(value => (
                        <Option key={value} onClick={() => {
                            handleClose();
                            setValue("privacy", value as Privacy);
                        }} selected={privacy === value}>{PrivacyLabel[value]}</Option>
                    ))}
                </Select>
                <TextArea label='Bigrafia:' error message={errors.description?.message} placeholder='Fale um pouco sobre o album...' {...register("description")}/>
            </DialogContent>
            <DialogActions loading={loading} handleClose={handleClose} showButtonSubmit/>
        </Dialog>
    )
}
