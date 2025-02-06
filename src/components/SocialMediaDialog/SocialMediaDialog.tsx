"use client";

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { CiGlobe } from 'react-icons/ci';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import SocialMediaSchema from '@/schemas/SocialMediaSchema';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import SocialMediaDialogProps from './SocialMediaDialogProps';
import SocialMediaService from '@/services/SocialMediaService';
import { notification } from '@/redux/slicer/notificationSlicer';
import { useAppDispatch, useAppSelector, useError } from '@/hooks';
import { SOCIAL_MEDIAS_DATA, SocialMediaDTO } from '@/interfaces/SocialMedia';
import { addSocialMidia, updateSocialMidia } from '@/redux/slicer/socialMediaSlicer';
import { Dialog, DialogActions, DialogContent, DialogHeader, Option, Select, TextField } from '@/components/';

const socialMediaService = new SocialMediaService();

export default function SocialMediaDialog({open, updateSocialMedia, handleClose}: SocialMediaDialogProps) {
    const error = useError();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    
    const {artist: {id}} = useAppSelector(selectSession);
    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm<SocialMediaDTO>({
        resolver: yupResolver(SocialMediaSchema),
    });

    const socialMediaType = watch("socialMediaType");

    function onSubmitCreate(socialMediaDTO:SocialMediaDTO) {
        setLoading(true);
        socialMediaService.create(id, socialMediaDTO).then(response => {
            handleClose?.();
            const data = response.data;
            dispatch(addSocialMidia(data));
            dispatch(notification.success({title: "Rede Social", message: `${SOCIAL_MEDIAS_DATA[data.socialMediaType].label}, adicionado com sucesso!`}));
        }).catch(error).finally(function(){
            setLoading(false);
            handleClose?.();
        });
    }

    function onSubmitUpdate(socialMediaDTO:SocialMediaDTO) {
        setLoading(true);
        socialMediaService.update(updateSocialMedia!.id, socialMediaDTO).then(response => {
            handleClose?.();
            const data = response.data;
            dispatch(updateSocialMidia(data));
            dispatch(notification.success({title: "Rede Social", message: `${SOCIAL_MEDIAS_DATA[data.socialMediaType].label}, atualzado com sucesso!`}));
        }).catch(error).finally(function(){
            setLoading(false);
            handleClose?.();
        });
    }

    useEffect(() => {
        if (open && updateSocialMedia) {
            setValue("url", updateSocialMedia.url);
            setValue("socialMediaType", updateSocialMedia.socialMediaType);
        } else {
            setValue("url", "");
            setValue("socialMediaType", "");
        }
    }, [open]);
    
    return (
        <Dialog open={open} size='small' paperProps={{component: "form", onSubmit: handleSubmit(updateSocialMedia ? onSubmitUpdate : onSubmitCreate)}}>
            <DialogHeader title={updateSocialMedia ? "Alterar Rede Social" : "Nova Rede Social"} handleClose={handleClose}/>
            <DialogContent className="flex flex-col gap-5 py-3">
                <TextField label='URL:' type='text' error message={errors.url?.message} placeholder='Informe a URL/Link...' startIcon={HiOutlineEnvelope} {...register("url")}/>
                <Select inputProps={{label: "Tipo de rede social:", defaultValue: Object.values(SOCIAL_MEDIAS_DATA).find(o => o.key === socialMediaType)?.label, placeholder: "Selecione a sua nacionalidade...", startIcon: CiGlobe}} >
                    {handleClose => Object.keys(SOCIAL_MEDIAS_DATA).map((key) => (
                        <Option onClick={() => {
                            handleClose();
                            setValue("socialMediaType", key);
                        }} key={key} selected={key === socialMediaType}>{Object.values(SOCIAL_MEDIAS_DATA).find(o => o.key === key)?.label}</Option>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions loading={loading} handleClose={handleClose} showButtonSubmit/>
        </Dialog>
    )
}
