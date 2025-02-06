"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

import { GoLock } from 'react-icons/go';
import { CiGlobe } from 'react-icons/ci';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { HiOutlineEnvelope, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

import FormRegister from '@/interfaces/FormRegister';
import RegisterSchema from '@/schemas/RegisterSchema';
import { notification } from '@/redux/slicer/notificationSlicer';
import { useAppDispatch, useCountries, useRegister, useTabs } from '@/hooks';
import { Button, DatePicker, FormControlLabel, IconButton, LoadingButton, LoadingOverlay, Option, Panel, Radio, Select, Stack, TabContext, TextArea, TextField } from '@/components';

const now = new Date();
const MAX_YEAR = now.getFullYear();
const MIN_YEAR = now.getFullYear() - 100;

export default function SignUp() {
    const router = useRouter();
    const {data} = useCountries();
    const dispatch = useAppDispatch();
    const { tabs, setTabs, ids } = useTabs(4);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const { register, handleSubmit, watch, setValue, getValues, formState: {errors} } = useForm<FormRegister>({
        resolver: yupResolver(RegisterSchema),
    });

    const countryId = watch("countryId");
    const registe = useRegister({
        onSuccess: user => {
            dispatch(notification.success({title: "Cadastro", message: `${user.name}, A sua conta foi criada. Efetue a ativação da conta.`}));
            router.push(`/account-activation?email=${getValues("email")}&password=${getValues("password")}`);
        },
        onStart: () => setLoading(true),
        onError: () => setLoading(false), 
    });
    
    return (
        <Stack fullWidth className='mt-3'>
            <LoadingOverlay open={loading} />
            <h2 className="text-2xl text-center text-gray-500">Cadastro</h2>
            <Stack onSubmit={handleSubmit(registe)} component={"form"} spacing={5} className='mt-3'>
                <TabContext value={tabs}>
                    <Panel value={ids[0]}>
                        <Stack spacing={5}>
                            <TextField label='Nome:' type='text' error message={errors.name?.message} placeholder='Informe o seu email...' startIcon={HiOutlineEnvelope} {...register("name")}/>
                            <TextField label='Email:' type='email' error message={errors.email?.message} placeholder='Informe o seu email...' startIcon={HiOutlineEnvelope} {...register("email")}/>
                            <div className="flex gap-3 justify-between items-center">
                                <FormControlLabel label={"Masculino"} htmlFor='male' className='flex-grow h-10 px-3 border border-white/5 rounded-3xl' control={<Radio id='male' name='gender' defaultChecked/>} />
                                <FormControlLabel label={"Feminino"} htmlFor='female' className='flex-grow h-10 px-3 border border-white/5 rounded-3xl' control={<Radio id='female' name='gender'/>} />
                            </div>
                            <Button onClick={() => setTabs(ids[1])} size='large' className='px-8 rounded-3xl' fullWidth>Seguinte</Button>
                        </Stack>
                    </Panel>
                    <Panel value={ids[1]}>
                        <Stack spacing={5}>
                            <DatePicker textFieldProps={{label: 'Data de Nascimento:', error: true, message: errors.dateOfBirth?.message, required: true, ...register("dateOfBirth")}}/>
                            <TextArea label='Bigrafia:' error message={errors.biography?.message} placeholder='Fale um pouco sebre voçê' {...register("biography")}/>
                            <Stack direction='row' spaceBetween itemsCenter>
                                <Button onClick={() => setTabs(ids[0])} size='large' className='px-8 rounded-3xl'>Anterior</Button>
                                <Button onClick={() => setTabs(ids[2])} size='large' className='px-8 rounded-3xl'>Seguinte</Button>
                            </Stack>
                        </Stack>

                    </Panel>
                    <Panel value={ids[2]}>
                        <Stack spacing={5}>
                            <TextField label='Nome Artístico:' type='text' error message={errors.artisticName?.message} placeholder='Informe o seu nome artístico...' startIcon={HiOutlineEnvelope} {...register("artisticName")}/>
                            <TextField label='Data de estreia:' type='number' error message={errors.debutYear?.message} placeholder='Informe a sua data de estreia...' startIcon={IoCalendarClearOutline} defaultValue={now.getFullYear()} min={MIN_YEAR} max={MAX_YEAR} {...register("debutYear")}/>
                            <Select inputProps={{label: "Nacionalidade:", defaultValue: data?.data.find(c => c.id === countryId)?.name, placeholder: "Selecione a sua nacionalidade...", startIcon: CiGlobe}} >
                                {handleClose => data?.data.map(country => (
                                    <Option onClick={() => {
                                        handleClose();
                                        setValue("countryId", country.id);
                                    }} key={country.id} selected={countryId === country.id}>{country.name}</Option>
                                ))}
                            </Select>
                            <Stack direction='row' spaceBetween itemsCenter>
                                <Button onClick={() => setTabs(ids[1])} size='large' className='px-8 rounded-3xl'>Anterior</Button>
                                <Button onClick={() => setTabs(ids[3])} size='large' className='px-8 rounded-3xl'>Seguinte</Button>
                            </Stack>
                        </Stack>
                    </Panel>
                    <Panel value={ids[3]}>
                        <Stack spacing={5}>
                            <TextField label='Senha:' type={showPassword ? "text" : "password"} error={!!errors.password} message={errors.password?.message} placeholder='Informe a sua senha...' startIcon={GoLock} endAction={<IconButton onClick={() => setShowPassword(prev => !prev)} size='medium'>{showPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />} </IconButton>} {...register("password")}/>
                            <TextField label='Confirmação da senha:' type={showConfirmPassword ? "text" : "password"} error={!!errors.confirmPassword} message={errors.confirmPassword?.message} placeholder='Informe a confirmação da senha...' startIcon={GoLock} endAction={<IconButton onClick={() => setShowConfirmPassword(prev => !prev)} size='medium'>{showConfirmPassword ? <HiOutlineEye /> : <HiOutlineEyeSlash />} </IconButton>} {...register("confirmPassword")}/>
                            <Stack direction='row' spaceBetween itemsCenter>
                                <Button onClick={() => setTabs(ids[2])} size='large' className='px-8 rounded-3xl'>Anterior</Button>
                                <LoadingButton loading={loading} size='large' className='px-8 rounded-3xl'>Cadastrar</LoadingButton>
                            </Stack>
                        </Stack>
                    </Panel>
                </TabContext>
            </Stack>
            <p className='text-sm text-gray-400 font-light text-center mt-5'>Já tem uma conta? <Link href={"/login"} className='text-blue-400 hover:underline'>Entrar</Link> ou <Link href={"/account-activation"} className='text-blue-400 hover:underline'>Activar</Link></p>
        </Stack>
    );
}
