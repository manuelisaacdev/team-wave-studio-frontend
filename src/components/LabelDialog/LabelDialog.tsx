"use client";

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { HiOutlineEnvelope } from 'react-icons/hi2';

import { LabelDTO } from '@/interfaces/Label';
import LabelSchema from '@/schemas/LabelSchema';
import LabelDialogProps from './LabelDialogProps';
import LabelService from '@/services/LabelService';
import { useError, useNotification } from '@/hooks';
import { Dialog, DialogActions, DialogContent, DialogHeader, TextField } from '@/components/';

const labelService = new LabelService();

export default function LabelDialog({open, label, album, onCreateLabel, onUpdateLabel, handleClose}:LabelDialogProps) {
    const error = useError();
    const notification = useNotification();
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<LabelDTO>({
        resolver: yupResolver(LabelSchema),
    });

    function handleCreate(labelDTO:LabelDTO) {
        setLoading(true);
        labelService.create(album!.id, labelDTO).then(response => {
            handleClose?.();
            onCreateLabel?.(response.data);
            notification.success({title: "Produtora", message: `${response.data.name}, foi criado com sucesso!`})
        }).catch(error).finally(() => setLoading(false));
    }

    function handleUpdate(labelDTO:LabelDTO) {
        setLoading(true);
        labelService.update(label!.id, labelDTO).then(response => {
            handleClose?.();
            onUpdateLabel?.(response.data);
            notification.success({title: "Produtora", message: `${response.data.name}, foi atualizado com sucesso!`})
        }).catch(error).finally(function(){
            setLoading(false);
        });
    }

    useEffect(() => {
        if (open && label) {
            setValue("name", label.name);
        } else {
            setValue("name", "");
        }
    }, [open]);
    
    return (
        <Dialog open={open} size='small' paperProps={{component: "form", onSubmit: handleSubmit(label ? handleUpdate : handleCreate)}}>
            <DialogHeader loading={loading} title={label ? "Alterar Produtora" : "Nova Produtora"} handleClose={handleClose}/>
            <DialogContent className="flex flex-col gap-5 py-3">
                <TextField label='Nome:' type='text' error message={errors.name?.message} placeholder='Informe o nome...' startIcon={HiOutlineEnvelope} {...register("name")}/>
            </DialogContent>
            <DialogActions loading={loading} handleClose={handleClose} showButtonSubmit/>
        </Dialog>
    )
}
