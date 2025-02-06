"use client";

import React, { useState } from 'react'
import { HiOutlineEnvelope } from 'react-icons/hi2';

import useError from '@/hooks/useError';
import { useForm } from 'react-hook-form';
import { UserEmailDTO } from '@/interfaces/User';
import FormRecoverProps from './FormRecoverProps';
import { yupResolver } from '@hookform/resolvers/yup';
import RecoveryService from '@/services/RecoveryService';
import FormRecoverSchema from '@/schemas/FormRecoverSchema';
import { LoadingButton, Stack, TextField } from '@/components'

const recoveryService = new RecoveryService();

export default function FormRecover({handleConfirm}:FormRecoverProps) {
    const error = useError();
    const [loading, setLoading] = useState<boolean>(false);
    const {register, handleSubmit, getValues, formState: {errors} } = useForm<UserEmailDTO>({
        resolver: yupResolver(FormRecoverSchema),
    });

    function onSubmit(userEmailDTO:UserEmailDTO) {
        setLoading(true);
        recoveryService.recovery(userEmailDTO)
        .then(response => handleConfirm({email: getValues("email"), ...response.data}))
        .catch(error)
        .finally(() => setLoading(false));
    }

    return (
        <Stack onSubmit={handleSubmit(onSubmit)} component={"form"} spacing={5}>
            <TextField label='Email:' type='text' error={!!errors.email} message={errors.email?.message} placeholder='Informe o seu email...' startIcon={HiOutlineEnvelope} {...register("email")}/>
            <LoadingButton loading={loading} className='text-white bg-primary/80 hover:bg-primary border-none rounded-3xl transition-none'>Enviar</LoadingButton>
        </Stack>
    );
}
