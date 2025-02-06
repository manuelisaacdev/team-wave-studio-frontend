"use client";

import dayjs from 'dayjs';
import Popup from 'reactjs-popup';
import { Tooltip } from 'react-tooltip';
import React, { useRef, useState } from 'react';

import { GoImage } from 'react-icons/go';
import { LuCalendar } from 'react-icons/lu';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { BiDislike, BiLike } from 'react-icons/bi';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlinePencilSquare, HiOutlinePlay } from 'react-icons/hi2';


import MIMETYPES from '@/lib/MIMRTYPES';
import { useConfirmation } from '@/hooks';
import { ChipVariant } from '../Chip/ChipProps';
import FileService from '@/services/FileService';
import CardPlaylistProps from './CardPlaylistProps';
import Privacy, { PrivacyLabel } from '@/interfaces/Privacy';
import { Box, Chip, Divider, IconButton, Paper, Stack } from '@/components';
import { ClipLoader } from 'react-spinners';
import { cn } from '@/lib/utils';
import { CgMusic } from 'react-icons/cg';

const CHIP_VARIANT = {
    [Privacy.PUBLIC]: "success" as ChipVariant,
    [Privacy.PRIVATE]: "warning" as ChipVariant,
    [Privacy.FOLLOWER]: "info" as ChipVariant,
    [Privacy.COMMUNITY]: "error" as ChipVariant,
}

export default function CardPlaylist({playlist, placementTop, handleToUpdatePlaylist, handleUpdateCover, handleRemovePlaylist}:CardPlaylistProps) {
    const confirmation = useConfirmation();
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [uploading, setUploading] = useState(false);

    function handleOpen() {
        setOpen(() => true);
    }

    function handleClose() {
        setOpen(() => false);
    }

    function onClickRemove(evt: React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();
        confirmation.show({
            onConfirm: () => {
                setLoading(true);
                handleRemovePlaylist?.(playlist, () => setLoading(false));
            },
            title: "Playlist",
            message: <span>Tem certeza que deseja remover a playlis <br/> <b>{playlist.name}</b>?</span>,
        });
    }

    function onChangeCover(evt: React.ChangeEvent<HTMLInputElement>) {
        const file = evt.currentTarget.files?.item(0);
        if (file) {
            setUploading(true);
            handleUpdateCover?.(playlist, file as File, () => setUploading(false))
        }
    }
    
    return (
        <Stack spacing={5} direction='row' itemsCenter className='justify-between rounded-lg border border-white/5 pe-3'>
            <Box component={"div"} className='relative flex-shrink-0 rounded-s-lg w-12 h-12 overflow-hidden'>
                {!playlist.cover && <span className='absolute z-0 inset-0 bg-paper-primary/50'></span>}
                <img alt={"Capa"} className='w-full h-full' src={playlist.cover ? FileService.resources(playlist.cover) : "/img/placeholder-cover-playlist-612x612.jpg"}/>
                <Box component={"span"} className={cn('hidden justify-center items-center absolute inset-0 bg-white/10', uploading && "flex")}>
                    <ClipLoader size={16} color={"#E3651D"}/>
                </Box>
            </Box>

            <Stack className='flex-1 items-start'>
                <h1 className='text-sm text-gray-500 truncate' data-tooltip-id={`playlist-name-${playlist.id}`} data-tooltip-content={playlist.name}>{playlist.name}</h1>
                <Tooltip id={`playlist-name-${playlist.id}`} place='top'/>
                <span className='text-xs text-gray-600 truncate'>Há {playlist.musicsPlaylist.length} músicas no total</span>
            </Stack>

            <Stack direction='row' spacing={3} itemsCenter className='flex-1 justify-center'>
                <LuCalendar className='text-base text-gray-600'/> 
                <span className='text-sm text-gray-600'>{dayjs(playlist.createdAt).format("DD/MM/YYYY HH:mm")}</span>
            </Stack>

            <Stack direction='row' spacing={3} itemsCenter className='flex-1 justify-center'>
                <Chip label={PrivacyLabel[playlist.privacy]} startIcon={MdOutlinePrivacyTip} variant={CHIP_VARIANT[playlist.privacy]} data-tooltip-id={`playlist-privacy-${playlist.id}`} data-tooltip-content={"Privacidade"}/>
                <Tooltip id={`playlist-privacy-${playlist.id}`} place='top'/>
            </Stack>

            <Stack direction='row' spacing={5} itemsCenter className='flex-1 justify-end'>
                {loading && <ClipLoader size={18} color={"#6b7280"}/>}
                <IconButton onClick={() => handleToUpdatePlaylist?.(playlist)} data-tooltip-id={`btn-update-${playlist.id}`} data-tooltip-content={"Alterar"} className='text-gray-700 hover:text-blue-400'>
                    <HiOutlinePencilSquare />
                </IconButton>
                <Tooltip id={`btn-update-${playlist.id}`} place='top'/>

                <IconButton onClick={() => inputRef.current?.click()} data-tooltip-id={`btn-update-cover-${playlist.id}`} data-tooltip-content={"Alterar Capa"} className='text-gray-700 hover:text-orange-400'>
                    {uploading ? <ClipLoader size={18} color={"#6b7280"}/> : <GoImage />}
                </IconButton>
                <input type="file" ref={inputRef} className='hidden' accept={MIMETYPES.image} onChange={onChangeCover}/>
                <Tooltip id={`btn-update-cover-${playlist.id}`} place='top'/>
                
                <IconButton onClick={onClickRemove} data-tooltip-id={`btn-delete-${playlist.id}`} data-tooltip-content={"Excluir"} className='text-gray-700 hover:text-red-400 '>
                    {loading ? <ClipLoader size={18} color={"#6b7280"}/> : <IoTrashOutline className='text-xl'/>}
                </IconButton>
                <Tooltip id={`btn-delete-${playlist.id}`} place='top'/>
                <Popup open={open} onOpen={handleOpen} onClose={handleClose} trigger={
                    <IconButton>
                        <HiOutlineDotsVertical/>
                    </IconButton>
                } arrow={false} position={placementTop ? "top right" : "bottom right"} aria-describedby="input-data-picker">
                    <Box component={Paper} className='w-60'>
                        <Stack spacing={3} component={"ul"} className='py-2'>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <IoIosHeartEmpty className='text-lg'/>
                                <span className='text-sm'>Amam ({playlist.reproductions})</span>
                            </Stack>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <BiLike className='text-lg'/>
                                <span className='text-sm'>Gostam ({playlist.reproductions || 0})</span>
                            </Stack>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <BiDislike className='text-lg'/>
                                <span className='text-sm'>Não gostam ({playlist.reproductions || 0})</span>
                            </Stack>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <HiOutlinePlay className='text-lg'/>
                                <span className='text-sm'>Reproduções ({playlist.reproductions || 0})</span>
                            </Stack>
                            <Divider />
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <CgMusic className='text-lg'/>
                                <span className='text-sm'>Músicas ({playlist.musicsPlaylist.length || 0})</span>
                            </Stack>
                        </Stack>
                    </Box>
                </Popup>
            </Stack>
        </Stack>
    )
}
