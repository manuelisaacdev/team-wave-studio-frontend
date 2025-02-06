"use client";

import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { CiGlobe } from 'react-icons/ci';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import UserService from '@/services/UserService';
import { UpdateUserDTO } from '@/interfaces/User';
import UpdateUserSchema from '@/schemas/UpdateUserSchema';
import { notification } from '@/redux/slicer/notificationSlicer';
import { handleChangeUser, selectSession } from '@/redux/slicer/sessionSlicer';
import { useAppDispatch, useAppSelector, useCountries, useError } from '@/hooks';
import { DatePicker, FormControlLabel, LoadingButton, Option, Radio, Select, Stack, TextField } from '@/components/';

const userService = new UserService();

export default function UserAccount() {
    const error = useError();
    const {data} = useCountries();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    
    const {user: {id, name, gender, dateOfBirth, countryId}} = useAppSelector(selectSession);
    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm<UpdateUserDTO>({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues: {name, gender, dateOfBirth, countryId},
    });

    const formCountryId = watch("countryId");

    function onSubmit(updateUserDTO:UpdateUserDTO) {
        console.log(updateUserDTO);
        userService.update(id, updateUserDTO).then(response => {
            const user = response.data;
            dispatch(handleChangeUser(user));
            dispatch(notification.success({title: "Atualização de Perfil de Usuário", message: `${user.name}, o seu perfil de usuário foi atualizado com sucesso!`}));
        }).catch(error).finally(function(){
            setLoading(false);
        });
    }
    
    return (
        <Stack spacing={5} component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <TextField label='Nome:' type='text' error message={errors.name?.message} placeholder='Informe o seu email...' startIcon={HiOutlineEnvelope} {...register("name")}/>
            <div className="flex gap-3 justify-between items-center">
                <FormControlLabel label={"Masculino"} htmlFor='male' className='flex-grow h-10 px-3 border border-white/5 rounded-3xl' control={<Radio id='male' name='gender' defaultChecked/>} />
                <FormControlLabel label={"Feminino"} htmlFor='female' className='flex-grow h-10 px-3 border border-white/5 rounded-3xl' control={<Radio id='female' name='gender'/>} />
            </div>
            <DatePicker textFieldProps={{label: 'Data de Nascimento:', error: true, message: errors.dateOfBirth?.message, required: true, ...register("dateOfBirth")}}/>
            <Select inputProps={{label: "Nacionalidade:", defaultValue: data?.data.find(c => c.id === formCountryId)?.name, placeholder: "Selecione a sua nacionalidade...", startIcon: CiGlobe}} >
                {handleClose => data?.data.map(({id, name}) => (
                    <Option onClick={() => {
                        handleClose();
                        setValue("countryId", id);
                    }} key={id} selected={formCountryId === id}>{name}</Option>
                ))}
            </Select>
            <LoadingButton loading={loading} type='submit' size='large' className='px-8 rounded-3xl self-center'>Salvar</LoadingButton>
        </Stack>
    )
}