"use client";

import Link from 'next/link';
import Popup from 'reactjs-popup';
import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip';

import { IoIosLogOut } from 'react-icons/io';
import { GoBell, GoSearch } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuChevronRight, LuUserRoundPen } from 'react-icons/lu';

import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import NotificationsMenu from './Notifications/Notifications';
import { handleToggleSidebar, selectSidebar } from '@/redux/slicer/sidebarSlicer';
import { Avatar, Badge, Box, IconButton, Paper, Stack, TextField } from "@/components";
import { GrConnect } from 'react-icons/gr';
import { TbCategory } from 'react-icons/tb';

export default function Topbar() {
    const dispatch = useAppDispatch();
    const sidebar = useAppSelector(selectSidebar);
    const {user, artist} = useAppSelector(selectSession);
    const [openProfile, setOpenProfile] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);

    function handleCloseProfile() {
        setOpenProfile(false);
    }

    function handleCloseNotifications() {
        setOpenNotifications(false);
    }
    
    return (
        <Stack direction='row' className='gap-3 justify-between items-center flex-shrink-0 h-16 pe-5 bg-paper-primary border-b border-white/5'>
            <Stack direction='row'>
                <IconButton onClick={() => dispatch(handleToggleSidebar())} size='large' data-tooltip-id='btn-toggle-sidebar' data-tooltip-content={sidebar.open ? "Compactar" : "Expandir"}>
                    <LuChevronRight className={cn('rotate-180 transition-all', !sidebar.open && 'rotate-0')} />
                </IconButton>
                <Tooltip id='btn-toggle-sidebar' place='bottom' className='text-xl'/>
            </Stack>

            <Stack component={"form"} className='w-screen max-w-sm'>
                <TextField type='search' startIcon={GoSearch} placeholder='Pesquisar...'/>
            </Stack>

            <Stack direction='row' className="gap-5 justify-end items-center">
                <Popup open={openNotifications} onClose={handleCloseNotifications} onOpen={() => setOpenNotifications(true)} trigger={
                    <IconButton size='large' data-tooltip-id='btn-notifications-topbar' data-tooltip-content={"Notificações"} aria-describedby="popup-notifications">
                        <Badge>
                            <GoBell/>
                        </Badge>
                    </IconButton>
                } arrow={false} position="bottom center" aria-describedby="popup-notifications">
                    <NotificationsMenu handleClose={handleCloseNotifications} aria-describedby="popup-notifications"/>
                </Popup>
                <Tooltip id='btn-notifications-topbar' place='bottom'/>

                <Stack className="items-end">
                    <small className='text-sm text-gray-500'>{artist.name}</small>
                    <h1 className='text-xs text-gray-600 font-light'>{user.name}</h1>
                </Stack>
                
                <Popup open={openProfile} onClose={handleCloseProfile} onOpen={() => setOpenProfile(true)} trigger={<Avatar className='cursor-pointer' src={user.profilePicture} alt={artist.name} data-tooltip-id='btn-profile-menu' data-tooltip-content={"Perfil"} aria-describedby="popup-profile"/>} arrow={false} position="bottom right" aria-describedby="popup-profile">
                    <Paper component={"ul"} className='flex flex-col w-screen max-w-48 bg-paper-primary border border-white/5 rounded-md p-2' aria-describedby="popup-profile">
                        <Box component={"li"}>
                            <Link onClick={handleCloseProfile} href={"/settings?tab=1"} className='flex gap-3 items-center w-full h-8 text-gray-500 px-2 hover:bg-white/5 rounded-md outline-none'>
                                <LuUserRoundPen className='text-lg'/>
                                <span className='text-sm'>Conta</span>
                            </Link>
                        </Box>
                        <Box component={"li"}>
                            <Link onClick={handleCloseProfile} href={"/settings?tab=2"} className='flex gap-3 items-center w-full h-8 text-gray-500 px-2 hover:bg-white/5 rounded-md outline-none'>
                                <GrConnect className='text-lg'/>
                                <span className='text-sm'>Redes Sociais</span>
                            </Link>
                        </Box>
                        <Box component={"li"}>
                            <Link onClick={handleCloseProfile} href={"/settings?tab=3"} className='flex gap-3 items-center w-full h-8 text-gray-500 px-2 hover:bg-white/5 rounded-md outline-none'>
                                <TbCategory className='text-lg'/>
                                <span className='text-sm'>Gêneros Musicais</span>
                            </Link>
                        </Box>
                        <Box component={"li"}>
                            <Link onClick={handleCloseProfile} href={"/settings"} className='flex gap-3 items-center w-full h-8 text-gray-500 px-2 hover:bg-white/5 rounded-md'>
                                <IoSettingsOutline className='text-lg'/>
                                <span className='text-sm'>Configuraões</span>
                            </Link>
                        </Box>
                        <Box component={"li"}>
                            <Link onClick={handleCloseProfile} href={"/logout"} className='flex gap-3 items-center w-full h-8 text-gray-500 hover:text-white hover:bg-red-500 px-2 rounded-md'>
                                <IoIosLogOut className='text-lg'/>
                                <span className='text-sm'>Sair</span>
                            </Link>
                        </Box>
                    </Paper>
                </Popup>
                <Tooltip id='btn-profile-menu' place='bottom'/>
            </Stack>
        </Stack>
    )
}
