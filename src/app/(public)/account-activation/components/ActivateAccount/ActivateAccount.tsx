"use client";

import { useState } from 'react';
import Countdown from 'react-countdown';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import { formatNumber } from '@/lib/utils';
import UserService from '@/services/UserService';
import { useAppDispatch, useError } from '@/hooks';
import { ActivateAccountDTO } from '@/interfaces/User';
import ActivateAccountProps from './ActivateAccountProps';
import { notification } from '@/redux/slicer/notificationSlicer';
import ActivateAccountSchema from '@/schemas/ActivateAccountSchema';
import { LoadingButton, LoadingOverlay, Stack, TextArea } from '@/components';

const userService = new UserService();

export default function ActivateAccount({expiration, email, password, handleTimeout}:ActivateAccountProps) {
    const router = useRouter();
    const handleError = useError();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors} } = useForm<ActivateAccountDTO>({
        defaultValues: {email},
        resolver: yupResolver(ActivateAccountSchema),
    });

    function onSubmit(activateAccountDTO:ActivateAccountDTO) {
        setLoading(true);
        userService.activateAccount(activateAccountDTO).then(response => {
            const {name, email} = response.data;
            if (password) {
                dispatch(notification.success({title: "Activação de Conta", message: `${name}, a sua conta foi activada com successo!`, autoClose: false}));
                return router.push(`/login?email=${email}&password=${password}`);
            }
            dispatch(notification.success({title: "Activação de Conta", message: `${name}, a sua conta foi activada com successo!. Efetue o login.`}));
            router.push(`/login?email=${email}`);
        }).catch(error => {
            setLoading(false);
            handleError(error);
        });
    }

    return (
        <Stack spacing={3} fullWidth className='mt-3'>
            <LoadingOverlay open={loading} />
            <Countdown date={Date.now() + expiration} onComplete={handleTimeout} renderer={({ minutes, seconds }) => (
                <p className="text-sm font-semibold text-center text-gray-500">O token expira em: <span className='inline-block min-w-10 text-start'>{formatNumber(minutes)}:{formatNumber(seconds)}</span></p>
            )} />
            <Stack onSubmit={handleSubmit(onSubmit)} component={"form"} spacing={5}>
                <TextArea label='Token de activação:' error message={errors.token?.message} placeholder='Informe o token de activação...' className='h-16' {...register("token")}/>
                <LoadingButton loading={loading} className='text-white bg-primary/80 hover:bg-primary border-none rounded-3xl transition-none'>Activar</LoadingButton>
            </Stack>
        </Stack>
    );
}
