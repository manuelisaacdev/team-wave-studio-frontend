"use client";

import { useState } from 'react';
import Countdown from 'react-countdown';
import { GoLock } from 'react-icons/go';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

import { formatNumber } from '@/lib/utils';
import { RecoveryDTO } from '@/interfaces/User';
import { useAppDispatch, useError } from '@/hooks';
import RecoveryService from '@/services/RecoveryService';
import { notification } from '@/redux/slicer/notificationSlicer';
import RecoveryConfirmationFormProps from './RecoveryConfirmationFormProps';
import RecoveryConfirmationSchema from '@/schemas/RecoveryConfirmationSchema';
import { IconButton, LoadingButton, Stack, TextArea, TextField } from '@/components';

interface Confirmation extends RecoveryDTO {
    confirmPassword: string,
}

const recoveryService = new RecoveryService();

export default function RecoverConfirmationForm({expiration, email, handleTimeout}:RecoveryConfirmationFormProps) {
    const error = useError();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors} } = useForm<Confirmation>({
        defaultValues: {email},
        resolver: yupResolver(RecoveryConfirmationSchema),
    });

    function onSubmit({token, email, password}:Confirmation) {
        setLoading(true);
        recoveryService.confirmation({token, email, password}).then(response => {
            const {name, email} = response.data;
            dispatch(notification.success({title: "Recuperação de Conta", message: `${name}, A senha da sua conta foi alterada com sucesso.`, autoClose: false}));
            router.push(`/login?email=${email}&password=${password}`);
        }).catch(error).finally(() => setLoading(false));
    }

    return (
        <Stack spacing={3} fullWidth className='mt-3'>
            <Countdown date={Date.now() + expiration} onComplete={handleTimeout} renderer={({ minutes, seconds }) => (
                <p className="text-sm font-semibold text-center text-gray-500">O token expira em: <span className='inline-block min-w-10 text-start'>{formatNumber(minutes)}:{formatNumber(seconds)}</span></p>
            )} />
            <Stack onSubmit={handleSubmit(onSubmit)} component={"form"} spacing={5}>
                <TextField label='Senha:' type={showPassword ? "text" : "password"} error={!!errors.password} message={errors.password?.message} placeholder='Informe a sua senha...' startIcon={GoLock} endAction={<IconButton onClick={() => setShowPassword(prev => !prev)} size='medium'>{showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />} </IconButton>} {...register("password")}/>
                <TextField label='Confirmação da senha:' type={showConfirmPassword ? "text" : "password"} error={!!errors.confirmPassword} message={errors.confirmPassword?.message} placeholder='Informe a confirmação da senha...' startIcon={GoLock} endAction={<IconButton onClick={() => setShowConfirmPassword(prev => !prev)} size='medium'>{showConfirmPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />} </IconButton>} {...register("confirmPassword")}/>
                <TextArea label='Token:' error message={errors.token?.message} placeholder='Informe o token de recuperação...' className='h-16' {...register("token")}/>
                <LoadingButton loading={loading} className='text-white bg-primary/80 hover:bg-primary border-none rounded-3xl transition-none'>Enviar</LoadingButton>
            </Stack>
        </Stack>
    );
}
