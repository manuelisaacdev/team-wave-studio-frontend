"use client";

import Link from 'next/link';
import { GoLock } from 'react-icons/go';
import { useForm } from 'react-hook-form';
import LoginDTO from '@/interfaces/LoginDTO';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiOutlineEnvelope, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

import { Role } from '@/interfaces/User';
import LoginSchema from '@/schemas/LoginSchema';
import { buildAuthorization } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAuthenticate } from '@/hooks';
import { notification } from '@/redux/slicer/notificationSlicer';
import { Checkbox, FormControlLabel, IconButton, LoadingButton, LoadingOverlay, Stack, TextField } from '@/components';

export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const btnRef = useRef<HTMLButtonElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    const email = searchParams.get('email') || undefined;
    const password = searchParams.get('password') || undefined;
    const {register, handleSubmit, getValues, formState: {errors}} = useForm<LoginDTO>({
        resolver: yupResolver(LoginSchema),
        defaultValues: {email, password, rememberMe: !!(email && password)},
    });
    
    const authenticate = useAuthenticate({
        onError: () => setLoading(false),
        onStarting: () => setLoading(true),
        onSuccess: authentication => {
            const {accessToken, refreshToken, user: { id, name, artistId, roles }} = authentication;
            if (!roles.includes(Role.ARTIST)) {
                return dispatch(notification.warning({title: "Acesso negado", message: "Você não possui permissão para acessar esse recurso.",}));
            }
            dispatch(notification.success({title: "Login", message: `${name}, O seu login foi efetuado.`}));
            router.push(buildAuthorization({userId: id, artistId, accessToken, refreshToken, redirect: "/", rememberMe: getValues("rememberMe")}));
        },
    });

    useEffect(() => {
        if (email && password) {
            btnRef.current?.click();
        }
    }, []);
    
    return (
        <Stack fullWidth className='mt-3'>
            <LoadingOverlay open={loading} />
            <h2 className="text-2xl text-center text-gray-500">Login</h2>
            <Stack onSubmit={handleSubmit(authenticate)} component={"form"} spacing={5}>
                <TextField label='Email:' type='text' error={!!errors.email} message={errors.email?.message} placeholder='Informe o seu email...' startIcon={HiOutlineEnvelope} {...register("email")}/>
                <TextField label='Senha:' type={showPassword ? "text" : "password"} error={!!errors.password} message={errors.password?.message} placeholder='Informe a sua senha...' startIcon={GoLock} endAction={<IconButton onClick={() => setShowPassword(prev => !prev)} size='medium'>{showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />} </IconButton>} {...register("password")}/>
                <Stack direction="row" spaceBetween itemsCenter>
                    <FormControlLabel label="Lembrar-me" control={<Checkbox  {...register("rememberMe")}/>} />
                    <Link href="/forgot-password" className='text-sm text-gray-500 hover:underline'>Esqueceu sua senha?</Link>
                </Stack>
                <LoadingButton ref={btnRef} loading={loading} roundedLarger size='large' primary>Entrar</LoadingButton>
            </Stack>
            <p className='text-sm text-gray-400 font-light text-center mt-5'>Ainda não tem uma conta? <Link href={"/sign-up"} className='text-blue-400 hover:underline'>Cadastrar</Link></p>
        </Stack>
    );
}
