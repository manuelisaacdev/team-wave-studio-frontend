"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { HiOutlineEnvelope } from 'react-icons/hi2';

import useError from '@/hooks/useError';
import UserService from '@/services/UserService';
import { EmailToken, UserEmailDTO } from '@/interfaces/User';
import UserEmailSchema from '@/schemas/UserEmailSchema';
import { LoadingButton, Stack, TextField } from '@/components'

const userService = new UserService();

interface RequireUpdateEmailProps {
    handleSuccess: (data: UserEmailDTO & EmailToken) => void,
};

export default function RequireUpdateEmail({handleSuccess}:RequireUpdateEmailProps) {
    const handleError = useError();
    const [loading, setLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors} } = useForm<UserEmailDTO>({
        resolver: yupResolver(UserEmailSchema),
    });

    function onSubmit(userEmailDTO:UserEmailDTO) {
        setLoading(true);
        userService.requireUpdateEmail(userEmailDTO)
        .then(response => handleSuccess({...userEmailDTO, ...response.data}))
        .catch(error => {
            setLoading(false);
            handleError(error);
        });
    }

    return (
        <Stack onSubmit={handleSubmit(onSubmit)} component={"form"} spacing={5}>
            <TextField label='Email:' type='text' error={!!errors.email} message={errors.email?.message} placeholder='Informe o seu email...' startIcon={HiOutlineEnvelope} {...register("email")}/>
            <LoadingButton loading={loading} type='submit' size='large' className='px-10 rounded-3xl self-center'>Solicitar</LoadingButton>
        </Stack>
    );
}
