"use client";

import Image from 'next/image';
import { Tooltip } from 'react-tooltip';

import { BiAlbum } from 'react-icons/bi';
import { CgMusic } from 'react-icons/cg';
import { CiVideoOn } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { GoBell, GoHome } from "react-icons/go";
import { RiUserCommunityLine } from 'react-icons/ri';
import { PiPlaylist, PiUsersThree } from 'react-icons/pi';
import { MdAutoGraph, MdOutlineEmojiEvents } from 'react-icons/md';
import { IoFlagOutline, IoHelpCircleOutline, IoSettingsOutline } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import { useAppSelector } from '@/hooks';
import { Divider, NavLink, Stack } from '@/components';
import { selectSidebar } from '@/redux/slicer/sidebarSlicer';

export default function Sidebar() {
    const {open} = useAppSelector(selectSidebar);
    return (
        <Stack component={"aside"} className={cn('flex-shrink-0 w-[300px] h-full bg-paper-primary transition-all', !open && "w-[64px]")}>
            <Stack spacing={3} direction='row' itemsCenter className="h-16 flex-shrink-0 ps-5 pe-3 border-b border-white/5">
                <Image className='object-cover' width={32} height={32} loading='eager' alt='Logo' src={"/img/logo-192x192.webp"} />
                <h1 className={cn('text-sm font-light text-primary text-nowrap transition-all', !open && "hidden")}>Team<span className='text-orange-400'>Wave</span> <span className='text-blue-400'>Studio</span></h1>
            </Stack>

            <Stack spacing={4} component={"nav"} className={cn('flex-grow pr-3 py-3 border-e border-white/5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full', !open && "pr-0")}>
                <Stack spacing={2}>
                    <h2 className={cn('text-sm font-medium text-gray-400 ps-5 transition-all', !open && "hidden")}>Menu</h2>
                    <Stack spacing={2} component={"ul"} itemsCenter>
                        <NavLink label='Dashboard' href={"/"} open={open} Icon={GoHome} data-tooltip-id="btn-dashboard" data-tooltip-content="Dashboard"/>
                        <Tooltip id="btn-dashboard" hidden={open}  place='right' style={{zIndex: 1000}}/>

                        <NavLink label='Músicas' href={"/musics"} open={open} Icon={CgMusic} data-tooltip-id="btn-musics" data-tooltip-content="Músicas"/>
                        <Tooltip id="btn-musics" hidden={open}  place='right' style={{zIndex: 1000}}/>

                        <NavLink label='Albums' href={"/albums"} open={open} Icon={BiAlbum} data-tooltip-id="btn-albums" data-tooltip-content="Albums"/>
                        <Tooltip id="btn-albums" hidden={open}  place='right' style={{zIndex: 1000}}/>
                        
                        <NavLink label='Playlists' href={"/playlists"} open={open} Icon={PiPlaylist} data-tooltip-id="btn-playlists" data-tooltip-content="Playlists"/>
                        <Tooltip id="btn-playlists" hidden={open}  place='right' style={{zIndex: 1000}}/>
                        
                        <NavLink label='Clips' href={"#"} open={open} Icon={CiVideoOn} data-tooltip-id="btn-clips" data-tooltip-content="Clips"/>
                        <Tooltip id="btn-clips" hidden={open}  place='right' style={{zIndex: 1000}}/>
                    </Stack>
                </Stack>

                <Divider className={cn('pl-5 transition-all', !open && "px-5")}/>

                <Stack spacing={2}>
                    <h2 className={cn('text-sm font-medium text-gray-400 ps-5 transition-all', !open && "hidden")}>Feedback</h2>
                    <Stack component={"ul"} spacing={2} itemsCenter>
                        <NavLink label='Eventos' href={"#"} open={open} Icon={MdOutlineEmojiEvents} data-tooltip-id="btn-events" data-tooltip-content="Eventos"/>
                        <Tooltip id="btn-events" hidden={open}  place='right' style={{zIndex: 1000}}/>

                        <NavLink label='Seguidores' href={"#"} open={open} Icon={PiUsersThree} data-tooltip-id="btn-followers" data-tooltip-content="Seguidores"/>
                        <Tooltip id="btn-followers" hidden={open}  place='right' style={{zIndex: 1000}}/>
                        
                        <NavLink label='Comunidade' href={"#"} open={open} Icon={RiUserCommunityLine} data-tooltip-id="btn-community" data-tooltip-content="Comunidade"/>
                        <Tooltip id="btn-community" hidden={open}  place='right' style={{zIndex: 1000}}/>
                        
                        <NavLink label='Postagens' href={"#"} open={open} Icon={IoFlagOutline} data-tooltip-id="btn-posts" data-tooltip-content="Postagens"/>
                        <Tooltip id="btn-posts" hidden={open}  place='right' style={{zIndex: 1000}}/>
                        
                        <NavLink label='Notificações' href={"#"} open={open} Icon={GoBell} data-tooltip-id="btn-notifications" data-tooltip-content="Notificações"/>
                        <Tooltip id="btn-notifications" hidden={open}  place='right' style={{zIndex: 1000}}/>
                    </Stack>
                </Stack>
                
                <Divider className={cn('pl-5 transition-all', !open && "px-5")}/>
                
                <Stack spacing={2}>
                    <h2 className={cn('text-sm font-medium text-gray-400 ps-5 transition-all', !open && "hidden")} data-tooltip-id="btn-dashboard" data-tooltip-content="Dashboard">Status</h2>
                    <Stack component={"ul"} spacing={2} itemsCenter>
                        <NavLink label='Estatísticas' href={"#"} open={open} Icon={MdAutoGraph} data-tooltip-id="btn-statistics" data-tooltip-content="Estatística"/>
                        <Tooltip id="btn-statistics" hidden={open}  place='right' style={{zIndex: 1000}}/>
                        
                        <NavLink label='Ajuda e Suporte' href={"#"} open={open} Icon={IoHelpCircleOutline} data-tooltip-id="btn-help-&-suport" data-tooltip-content="Ajuda e Suporte"/>
                        <Tooltip id="btn-help-&-suport" hidden={open}  place='right' style={{zIndex: 1000}}/>
                        
                        <NavLink label='Configurações' href={"/settings"} open={open} Icon={IoSettingsOutline} data-tooltip-id="btn-settings" data-tooltip-content="Configurações"/>
                        <Tooltip id="btn-settings" hidden={open}  place='right' style={{zIndex: 1000}}/>
                    </Stack>
                </Stack>
            </Stack>

            <Stack component={"nav"} className={cn('flex-shrink-0 pr-3 pb-3 h-16 border-e border-white/5', !open && "pr-0")}>
                <Stack component={"ul"} itemsCenter className='justify-end flex-grow'>
                    <NavLink linkClassName={"text-gray-400 hover:text-blue-400 bg-blue-400/5"} className='[&:hover>a]:bg-blue-400/10' label='Sair' href={"#"} open={open} Icon={IoIosLogOut} data-tooltip-id="btn-logout" data-tooltip-content="Sair"/>
                    <Tooltip id="btn-logout" hidden={open}  place='right' style={{zIndex: 1000}}/>
                </Stack>
            </Stack>
        </Stack>
    )
}
