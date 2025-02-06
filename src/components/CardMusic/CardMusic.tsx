"use client";

import dayjs from 'dayjs';
import Popup from 'reactjs-popup';
import { Tooltip } from 'react-tooltip';
import { ClipLoader } from 'react-spinners';
import React, { useRef, useState } from 'react';

import { BsDot } from "react-icons/bs";
import { CgMusic } from 'react-icons/cg';
import { GoImage } from 'react-icons/go';
import { LuCalendar } from 'react-icons/lu';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoIosHeartEmpty } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { BiDislike, BiLike } from 'react-icons/bi';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlinePencilSquare, HiOutlinePlay } from 'react-icons/hi2';


import { cn } from '@/lib/utils';
import MIMETYPES from '@/lib/MIMRTYPES';
import { useConfirmation } from '@/hooks';
import { ChipVariant } from '../Chip/ChipProps';
import FileService from '@/services/FileService';
import CardMusicProps from './CardMusicProps';
import Privacy, { PrivacyLabel } from '@/interfaces/Privacy';
import { Box, Chip, Divider, IconButton, Paper, Stack } from '@/components';

const CHIP_VARIANT = {
    [Privacy.PUBLIC]: "success" as ChipVariant,
    [Privacy.PRIVATE]: "warning" as ChipVariant,
    [Privacy.FOLLOWER]: "info" as ChipVariant,
    [Privacy.COMMUNITY]: "error" as ChipVariant,
}

export default function CardMusic({music, placementTop, handleToUpdateMusic, handleUpdateCover, handleUpdateAudio, handleRemoveMusic}:CardMusicProps) {
    const confirmation = useConfirmation();
    const [loading, setLoading] = useState(false);
    const inputCoverRef = useRef<HTMLInputElement>(null);
    const inputAudioRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingAudio, setUploadingAudio] = useState(false);

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
                handleRemoveMusic?.(music, () => setLoading(false));
            },
            title: "Música",
            message: <span>Tem certeza que deseja excluir a música <br/> <b>{music.title}</b>?</span>,
        });
    }

    function onChangeCover(evt: React.ChangeEvent<HTMLInputElement>) {
        const file = evt.currentTarget.files?.item(0);
        if (file) {
            setUploadingCover(true);
            handleUpdateCover?.(music, file as File, () => setUploadingCover(false))
        }
    }

    function onChangeAudio(evt: React.ChangeEvent<HTMLInputElement>) {
        const file = evt.currentTarget.files?.item(0);
        if (file) {
            setUploadingAudio(true);
            handleUpdateAudio?.(music, file as File, () => setUploadingAudio(false))
        }
    }
    
    return (
        <Stack spacing={3} direction='row' itemsCenter className='justify-between rounded-lg border border-white/5 pe-3'>
            <Box component={"div"} className='relative flex-shrink-0 rounded-s-lg w-12 h-12 overflow-hidden'>
                {!music.cover && <span className='absolute z-0 inset-0 bg-paper-primary/50'></span>}
                <img alt={"Capa"} className='w-full h-full' src={music.cover ? FileService.resources(music.cover) : "/img/placeholder-cover-playlist-612x612.jpg"}/>
                <Box component={"span"} className={cn('hidden justify-center items-center absolute inset-0 bg-white/10', uploadingCover && "flex")}>
                    <ClipLoader size={16} color={"#E3651D"}/>
                </Box>
            </Box>

            <Stack className='flex-1 overflow-hidden items-start'>
                <h1 className='text-sm text-gray-500 font-medium truncate' data-tooltip-id={`music-title-${music.id}`} data-tooltip-content={music.title}>{music.title}</h1>
                <Tooltip id={`music-title-${music.id}`} place='top'/>

                <Stack direction='row' spacing={1} itemsCenter className='text-xs text-gray-600 truncate'>
                    <span className='inline-block text-nowrap' data-tooltip-id={`music-genre-${music.id}`} data-tooltip-content={"Gênero Musical"}>{music.musicalGenreName}</span>
                    <Tooltip id={`music-genre-${music.id}`} place='top'/>
                    
                    <BsDot className='text-sm'/>
                    
                    <span data-tooltip-id={`music-release-type-${music.id}`} data-tooltip-content={"Tipo de Lançamento"}>{music.releaseType}</span>
                    <Tooltip id={`music-release-type-${music.id}`} place='top'/>

                    {music.albumName && (<>
                        <BsDot className='text-sm'/>
                        <span data-tooltip-id={`music-title-${music.id}`} data-tooltip-content={`Album: ${music.albumName}`}>{music.albumName}</span>
                        <Tooltip id={`music-album-${music.id}`} place='top'/>
                    </>)}
                </Stack>
            </Stack>

            <Stack direction='row' spacing={3} itemsCenter className='flex-1 justify-center'>
                <LuCalendar className='text-base text-gray-600'/> 
                <span className='text-sm text-gray-600' data-tooltip-id={`music-created-at-${music.id}`} data-tooltip-content={"Data de registo"}>{dayjs(music.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                <Tooltip id={`music-created-at-${music.id}`} place='top'/>
            </Stack>

            <Stack direction='row' spacing={3} itemsCenter className='flex-1 justify-center'>
                <Chip label={music.available ? "Disponível" : "Indisponível"} startIcon={music.available ? AiOutlineEye : AiOutlineEyeInvisible} variant={music.available ? "success" : "error"} data-tooltip-id={`music-available-${music.id}`} data-tooltip-content={"Disponibilidade"}/>
                <Tooltip id={`music-available-${music.id}`} place='top'/>
            </Stack>

            <Stack direction='row' spacing={5} itemsCenter className='flex-1 justify-end' style={{width: 'calc(100% / 4)'}}>
                {loading && <ClipLoader size={18} color={"#6b7280"}/>}
                <IconButton onClick={() => handleToUpdateMusic?.(music)} data-tooltip-id={`btn-update-${music.id}`} data-tooltip-content={"Alterar Música"} className='text-gray-700 hover:text-blue-400'>
                    <HiOutlinePencilSquare />
                </IconButton>
                <Tooltip id={`btn-update-${music.id}`} place='top'/>

                <IconButton onClick={() => inputAudioRef.current?.click()} data-tooltip-id={`btn-update-audio-${music.id}`} data-tooltip-content={"Alterar Áudio"} className='text-gray-700 hover:text-green-400'>
                    {uploadingAudio ? <ClipLoader size={18} color={"#6b7280"}/> : <CgMusic />}
                </IconButton>
                <Tooltip id={`btn-update-audio-${music.id}`} place='top'/>
                <input type="file" ref={inputAudioRef} className='hidden' accept={MIMETYPES.audio} onChange={onChangeAudio}/>

                <IconButton onClick={() => inputCoverRef.current?.click()} data-tooltip-id={`btn-update-cover-${music.id}`} data-tooltip-content={"Alterar Capa"} className='text-gray-700 hover:text-orange-400'>
                    {uploadingCover ? <ClipLoader size={18} color={"#6b7280"}/> : <GoImage />}
                </IconButton>
                <Tooltip id={`btn-update-cover-${music.id}`} place='top'/>
                <input type="file" ref={inputCoverRef} className='hidden' accept={MIMETYPES.image} onChange={onChangeCover}/>
                
                <IconButton onClick={onClickRemove} data-tooltip-id={`btn-delete-${music.id}`} data-tooltip-content={"Excluir"} className='text-gray-700 hover:text-red-400 '>
                    {loading ? <ClipLoader size={18} color={"#6b7280"}/> : <IoTrashOutline className='text-xl'/>}
                </IconButton>
                <Tooltip id={`btn-delete-${music.id}`} place='top'/>
                <Popup open={open} onOpen={handleOpen} onClose={handleClose} trigger={
                    <IconButton>
                        <HiOutlineDotsVertical/>
                    </IconButton>
                } arrow={false} position={placementTop ? "top right" : "bottom right"} aria-describedby="input-data-picker">
                    <Box component={Paper} className='w-60'>
                        <Stack spacing={3} component={"ul"} className='py-2'>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <IoIosHeartEmpty className='text-lg'/>
                                <span className='text-sm'>Amam ({music.reproductions || 0})</span>
                            </Stack>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <BiLike className='text-lg'/>
                                <span className='text-sm'>Gostam ({music.reproductions || 0})</span>
                            </Stack>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <BiDislike className='text-lg'/>
                                <span className='text-sm'>Não gostam ({music.reproductions || 0})</span>
                            </Stack>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <HiOutlinePlay className='text-lg'/>
                                <span className='text-sm'>Reproduções ({music.reproductions || 0})</span>
                            </Stack>
                            <Divider />
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <CgMusic className='text-lg'/>
                                <span className='text-sm'>Playlists ({music.playlists || 0})</span>
                            </Stack>
                        </Stack>
                    </Box>
                </Popup>
            </Stack>
        </Stack>
    )
}
