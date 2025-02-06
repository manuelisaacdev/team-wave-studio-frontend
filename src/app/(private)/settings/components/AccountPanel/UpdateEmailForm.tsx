"use client";

import { useState } from 'react';
import Countdown from 'react-countdown';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { GoLock } from 'react-icons/go';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

import { formatNumber } from '@/lib/utils';
import UserService from '@/services/UserService';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import { notification } from '@/redux/slicer/notificationSlicer';
import { useAppDispatch, useAppSelector, useError } from '@/hooks';
import { EmailToken, UpdateUserEmailDTO } from '@/interfaces/User';
import UpdateUserEmailSchema from '@/schemas/UpdateUserEmailSchema';
import { IconButton, LoadingButton, LoadingOverlay, Stack, TextArea, TextField } from '@/components';

const userService = new UserService();

interface UpdateEmailFormProps extends EmailToken {
    email: string,
    handleTimeout: () => void,
}

export default function UpdateEmailForm({expiration, email, handleTimeout}:UpdateEmailFormProps) {
    const error = useError();
    const dispatch = useAppDispatch();
    const { user: {id} } = useAppSelector(selectSession);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const {register, handleSubmit, formState: {errors} } = useForm<UpdateUserEmailDTO>({
        defaultValues: {email},
        resolver: yupResolver(UpdateUserEmailSchema),
    });

    function onSubmit(updateUserEmailDTO:UpdateUserEmailDTO) {
        setLoading(true);
        userService.updateEmail(id, updateUserEmailDTO).then(response => {
            handleTimeout();
            const {name} = response.data;
            dispatch(notification.success({title: "Atualização de E-mail", message: `${name}, o email da sua conta foi atualizada com successo!`}));
        }).catch(error).finally(() => setLoading(false));
    }

    return (
        <Stack spacing={3} fullWidth className='mt-3'>
            <LoadingOverlay open={loading} />
            <Countdown date={Date.now() + expiration} onComplete={handleTimeout} renderer={({ minutes, seconds }) => (
                <p className="text-sm font-semibold text-center text-gray-500">O token expira em: <span className='inline-block min-w-10 text-start'>{formatNumber(minutes)}:{formatNumber(seconds)}</span></p>
            )} />
            <Stack onSubmit={handleSubmit(onSubmit)} component={"form"} spacing={5}>
                <TextField label='Senha:' type={showPassword ? "text" : "password"} error={!!errors.password} message={errors.password?.message} placeholder='Informe a sua senha...' startIcon={GoLock} endAction={<IconButton onClick={() => setShowPassword(prev => !prev)} size='medium'>{showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />} </IconButton>} {...register("password")}/>
                <TextArea label='Token de autorização:' error message={errors.token?.message} placeholder='Informe o token de autorização...' className='h-16' {...register("token")}/>
                <LoadingButton loading={loading} type='submit' size='large' className='px-10 rounded-3xl self-center'>Salvar</LoadingButton>
            </Stack>
        </Stack>
    );
}
