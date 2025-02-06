"use client";

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useRef, useState } from 'react';

import { HiOutlineEnvelope } from 'react-icons/hi2';

import useError from '@/hooks/useError';
import UserService from '@/services/UserService';
import { UserEmailDTO } from '@/interfaces/User';
import UserEmailSchema from '@/schemas/UserEmailSchema';
import RequireAccountActivationProps from './RequireAccountActivationProps';
import { LoadingButton, LoadingOverlay, Stack, TextField } from '@/components'

const userService = new UserService();

export default function RequireAccountActivation({email, handleSuccess}:RequireAccountActivationProps) {
    const handleError = useError();
    const btnRef = useRef<HTMLButtonElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {register, handleSubmit, formState: {errors} } = useForm<UserEmailDTO>({
        defaultValues: {email},
        resolver: yupResolver(UserEmailSchema),
    });

    function onSubmit(userEmailDTO:UserEmailDTO) {
        setLoading(true);
        userService.requireAccountActivation(userEmailDTO)
        .then(response => handleSuccess({...userEmailDTO, ...response.data}))
        .catch(error => {
            setLoading(false);
            handleError(error);
        });
    }

    useEffect(() => {
        email && btnRef.current?.click();
    }, []);

    return (
        <Stack spacing={5}>
            <LoadingOverlay open={loading} />
            <Stack onSubmit={handleSubmit(onSubmit)} component={"form"} spacing={5}>
                <TextField label='Email:' type='text' error={!!errors.email} message={errors.email?.message} placeholder='Informe o seu email...' startIcon={HiOutlineEnvelope} readOnly={!!email} {...register("email")}/>
                <LoadingButton ref={btnRef} loading={loading} className='text-white bg-primary/80 hover:bg-primary border-none rounded-3xl transition-none'>Enviar</LoadingButton>
            </Stack>
            <p className='text-sm text-gray-500 font-light text-center'>Validar o e-mail garante segurança, permite recuperação de conta, melhora a comunicação e evita cadastros inválidos. Esse passo é essencial para oferecer uma experiência segura e confiável na TeamWave Studio.</p>
            <p className='text-sm text-gray-400 font-light text-center'>Já tem uma conta ou já activou a conta? <Link href={"/login"} className='text-blue-400 hover:underline'>Entrar</Link> ou <Link href={"/sign-up"} className='text-blue-400 hover:underline'>Cadastrar</Link></p>
        </Stack>
    );
}
