"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

import { GoLock } from 'react-icons/go';
import UserService from '@/services/UserService';
import { UpdateUserPasswordDTO } from '@/interfaces/User';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import { notification } from '@/redux/slicer/notificationSlicer';
import { useAppDispatch, useAppSelector, useError } from '@/hooks';
import UpdateUserPasswordSchema from '@/schemas/UpdateUserPasswordSchema';
import { IconButton, LoadingButton, Stack, TextField } from '@/components/';

const userService = new UserService();

interface FormUpdateUserPasswordDTO extends UpdateUserPasswordDTO {
    confirmNewPassword: string;
}

interface ShowPassword {
    newPassword?: boolean,
    currentPassword?: boolean,
    confirmNewPassword?: boolean,
}

export default function UpdatePassword() {
    const error = useError();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [{currentPassword, newPassword, confirmNewPassword}, setShowPassword] = useState<ShowPassword>({})

    const {user: {id, name}} = useAppSelector(selectSession);
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<FormUpdateUserPasswordDTO>({
        resolver: yupResolver(UpdateUserPasswordSchema),
    });

    function handleClear() {
        setValue("newPassword", "");
        setValue("currentPassword", "");
        setValue("confirmNewPassword", "");
    }

    function onSubmit({confirmNewPassword, ...updateUserPassworsDTO}:FormUpdateUserPasswordDTO) {
        setLoading(true);
        userService.updatePassword(id, updateUserPassworsDTO).then(() => {
            handleClear();
            dispatch(notification.success({title: "Atualização da senha", message: `${name}, a sua senha foi atualizado com sucesso!`}));
        }).catch(error).finally(function(){
            setLoading(false);
        });
    }
    
    return (
        <Stack spacing={5} component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <TextField label='Senha Atual:' type={currentPassword ? "text" : "password"} error={!!errors.currentPassword} message={errors.currentPassword?.message} placeholder='Informe a senha atual...' startIcon={GoLock} endAction={<IconButton onClick={() => setShowPassword(prev => ({...prev, currentPassword: !prev.currentPassword}))} size='medium'>{currentPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />} </IconButton>} {...register("currentPassword")}/>
            <TextField label='Nova Senha:' type={newPassword ? "text" : "password"} error={!!errors.newPassword} message={errors.newPassword?.message} placeholder='Informe a nova senha...' startIcon={GoLock} endAction={<IconButton onClick={() => setShowPassword(prev => ({...prev, newPassword: !prev.newPassword}))} size='medium'>{newPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />} </IconButton>} {...register("newPassword")}/>
            <TextField label='Confirmação da nova senha:' type={confirmNewPassword ? "text" : "password"} error={!!errors.confirmNewPassword} message={errors.confirmNewPassword?.message} placeholder='Informe a confirmação da nova senha...' startIcon={GoLock} endAction={<IconButton onClick={() => setShowPassword(prev => ({...prev, confirmNewPassword: !prev.confirmNewPassword}))} size='medium'>{confirmNewPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />} </IconButton>} {...register("confirmNewPassword")}/>
            <LoadingButton loading={loading} type='submit' size='large' className='px-10 rounded-3xl self-center'>Salvar</LoadingButton>
        </Stack>
    )
}