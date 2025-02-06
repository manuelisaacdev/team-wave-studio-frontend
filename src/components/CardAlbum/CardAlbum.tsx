"use client";

import dayjs from 'dayjs';
import Popup from 'reactjs-popup';
import { Tooltip } from 'react-tooltip';
import { ClipLoader } from 'react-spinners';
import React, { useRef, useState } from 'react';

import { BsDot } from "react-icons/bs";
import { BiLike } from 'react-icons/bi';
import { CgMusic } from 'react-icons/cg';
import { GoImage } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa6';
import { LuCalendar } from 'react-icons/lu';
import { IoIosRecording } from 'react-icons/io';
import { IoTrashOutline } from 'react-icons/io5';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { HiOutlinePencilSquare, HiOutlinePlay } from 'react-icons/hi2';


import { cn } from '@/lib/utils';
import Label from '@/interfaces/Label';
import MIMETYPES from '@/lib/MIMRTYPES';
import { useConfirmation, useError } from '@/hooks';
import CardAlbumProps from './CardAlbumProps';
import { ChipVariant } from '../Chip/ChipProps';
import FileService from '@/services/FileService';
import LabelDialog from '../LabelDialog/LabelDialog';
import MusicalGenre from '@/interfaces/MusicalGenre';
import { TbCategory, TbMusicPlus } from 'react-icons/tb';
import Privacy, { PrivacyLabel } from '@/interfaces/Privacy';
import AlbumMusicalGenreService from '@/services/AlbumMusicalGenreService';
import { Box, Chip, Divider, IconButton, Paper, Stack } from '@/components';
import ToggleMusicalGenreDialog from '../AddMusicalGenreDialog/ToggleMusicalGenreDialog';
import LabelService from '@/services/LabelService';
import LabelItem from './LabelItem';

const CHIP_VARIANT = {
    [Privacy.PUBLIC]: "success" as ChipVariant,
    [Privacy.PRIVATE]: "warning" as ChipVariant,
    [Privacy.FOLLOWER]: "info" as ChipVariant,
    [Privacy.COMMUNITY]: "error" as ChipVariant,
}

const labelService = new LabelService();
const albumMusicalGenreService = new AlbumMusicalGenreService();

export default function CardAlbum({album, placementTop, handleToUpdateAlbum, handleUpdateCover, handleRemoveAlbum, onUpdate}:CardAlbumProps) {
    const handleError = useError();
    const confirmation = useConfirmation();
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openMenuLabel, setOpenMenuLabel] = useState<boolean>(false);
    const [openMusicalGenreDialog, setOpenMusicalGenreDialog] = useState<boolean>(false);
    const [labelDialog, setLabelDialog] = useState<{open?: boolean, label?:Label}>({open: false});

    function handleOpenMenu() {
        setOpenMenu(() => true);
    }

    function handleCloseMenu() {
        setOpenMenu(() => false);
    }

    function onClickRemove(evt: React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();
        confirmation.show({
            onConfirm: () => {
                setLoading(true);
                handleRemoveAlbum?.(album, () => setLoading(false));
            },
            title: "Album",
            message: <span>Tem certeza que deseja remover a playlis <br/> <b>{album.name}</b>?</span>,
        });
    }

    function onChangeCover(evt: React.ChangeEvent<HTMLInputElement>) {
        const file = evt.currentTarget.files?.item(0);
        if (file) {
            setUploading(true);
            handleUpdateCover?.(album, file as File, () => setUploading(false))
        }
    }

    function handleAddMusicalGenre(musicalGenre:MusicalGenre, onFinish:() => void) {
        albumMusicalGenreService.create({albumId: album.id, musicalGenreId: musicalGenre.id}).then(response => {
            album.albumMusicalGenres!.push(response!.data);
            onUpdate?.(album);
        }).catch(handleError).finally(onFinish);
    }

    function handleRemoveMusicalGenre(musicalGenre:MusicalGenre, onFinish:() => void) {
        const {id} = album.albumMusicalGenres!.find(m => m.musicalGenreId === musicalGenre.id) as MusicalGenre;
        albumMusicalGenreService.delete(id).then(() => {
            album.albumMusicalGenres = album.albumMusicalGenres!.filter(m => m.musicalGenreId!== musicalGenre.id);
            onUpdate?.(album);
        }).catch(handleError).finally(onFinish);
    }

    function handleDeleteLabel(label:Label, onFinish:() => void) {
        labelService.delete(label.id).then(() => {
            album.labels = album.labels!.filter(l => l.id!== label.id);
            onUpdate?.(album);
        }).catch(handleError).finally(onFinish);
    }
    
    return (
        <Stack spacing={3} direction='row' itemsCenter className='justify-between rounded-lg border border-white/5 pe-3'>
            <Box component={"div"} className='relative flex-shrink-0 rounded-s-lg w-12 h-12 overflow-hidden'>
                {!album.cover && <span className='absolute z-0 inset-0 bg-paper-primary/50'></span>}
                <img alt={"Capa"} className='w-full h-full' src={album.cover ? FileService.resources(album.cover) : "/img/placeholder-cover-playlist-612x612.jpg"}/>
                <Box component={"span"} className={cn('hidden justify-center items-center absolute inset-0 bg-white/10', uploading && "flex")}>
                    <ClipLoader size={16} color={"#E3651D"}/>
                </Box>
            </Box>

            <Stack className='flex-1 overflow-hidden items-start'>
                <h1 className='text-sm text-gray-500 font-medium truncate' data-tooltip-id={`Album-name-${album.id}`} data-tooltip-content={album.name}>{album.name}</h1>
                <Tooltip id={`album-name-${album.id}`} place='top'/>
                
                <Stack direction='row' spacing={1} itemsCenter className='text-xs text-gray-600 truncate'>
                    <span className='inline-block text-nowrap'>Há {album.faixas?.length || 0} músicas no total</span>
                    <BsDot className='text-sm text-gray-600'/>
                    <span>{album.albumType}</span>
                    {album.albumMusicalGenres && album.albumMusicalGenres.length > 0 && (<>
                        <BsDot className='text-sm text-gray-600'/>
                        <span className='inline-block truncate'>{album.albumMusicalGenres![0].name}</span>
                        {album.albumMusicalGenres!.length - 1 > 0 && (
                            <Popup trigger={<span className='text-nowrap ms-1 cursor-pointer hover:underline'>(+{album.albumMusicalGenres!.length - 1})</span>} position={placementTop ? "top center" : "bottom center"} aria-describedby="album-musical-genres">
                                <Stack component={Paper} spacing={1} className='px-3 py-2 max-w-48 max-h-32 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full' >
                                    {album.albumMusicalGenres.slice(1, album.albumMusicalGenres.length).map(a => (
                                        <div key={a.id} className='text-sm text-gray-600 cursor-default w-full'>
                                            <span className='truncate block' data-tooltip-id={`album-musical-genre-${a.id}`} data-tooltip-content={a.name}>{a.name}</span>
                                            <Tooltip id={`album-musical-genre-${a.id}`} place='left' style={{zIndex: 2000}}/>
                                        </div>
                                    ))}
                                </Stack>
                            </Popup>
                        )}
                    </>)}
                </Stack>
            </Stack>

            <Stack direction='row' spacing={3} itemsCenter className='flex-1 justify-center'>
                <LuCalendar className='text-base text-gray-600'/> 
                <span className='text-sm text-gray-600'>{dayjs(album.createdAt).format("DD/MM/YYYY HH:mm")}</span>
            </Stack>

            <Stack direction='row' spacing={3} itemsCenter className='flex-1 justify-center'>
                <Chip label={PrivacyLabel[album.privacy]} startIcon={MdOutlinePrivacyTip} variant={CHIP_VARIANT[album.privacy]} data-tooltip-id={`album-type-${album.id}`} data-tooltip-content={"Privacidade"}/>
                <Tooltip id={`album-type-${album.id}`} place='top'/>
            </Stack>

            <Stack direction='row' spacing={5} itemsCenter className='flex-1 justify-end' style={{width: 'calc(100% / 4)'}}>
                {loading && <ClipLoader size={18} color={"#6b7280"}/>}
                <IconButton onClick={() => handleToUpdateAlbum?.(album)} data-tooltip-id={`btn-update-${album.id}`} data-tooltip-content={"Alterar"} className='text-gray-700 hover:text-blue-400'>
                    <HiOutlinePencilSquare />
                </IconButton>
                <Tooltip id={`btn-update-${album.id}`} place='top'/>

                <IconButton onClick={() => inputRef.current?.click()} data-tooltip-id={`btn-update-cover-${album.id}`} data-tooltip-content={"Alterar Capa"} className='text-gray-700 hover:text-orange-400'>
                    {uploading ? <ClipLoader size={18} color={"#6b7280"}/> : <GoImage />}
                </IconButton>
                <input type="file" ref={inputRef} className='hidden' accept={MIMETYPES.image} onChange={onChangeCover}/>
                <Tooltip id={`btn-update-cover-${album.id}`} place='top'/>
                
                <Popup open={openMenuLabel} onOpen={() => setOpenMenuLabel(true)} onClose={() => setOpenMenuLabel(false)} trigger={
                    <IconButton data-tooltip-id={`btn-label-${album.id}`} data-tooltip-content={"Produtoras"} className='text-gray-700 hover:text-indigo-400'>
                        <IoIosRecording />
                    </IconButton>
                } arrow={false} position={placementTop ? "top right" : "bottom right"} aria-describedby="input-data-picker">
                        <Stack component={Paper} className='w-80 max-h-48'>
                            <Stack direction='row' itemsCenter spaceBetween className='py-2 px-2'>
                                <Stack>
                                    <h1 className='text-sm text-gray-500'>Produtoras</h1>
                                    <small className='text-xs text-gray-700'>Há {album.labels?.length || 0} produtoras no total.</small>
                                </Stack>
                                <IconButton onClick={() => {setOpenMenuLabel(false);setLabelDialog(prev => ({...prev, open: true}));}} data-tooltip-id={`btn-new-label-${album.id}`} data-tooltip-content={"Adicionar Produtora"}>
                                    <FaPlus />
                                </IconButton>
                                <Tooltip id={`btn-new-label-${album.id}`} place='top'/>
                            </Stack>
                            <Divider />
                            <Stack className='overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                                {(album.labels?.length || 0) === 0 ? (
                                    <Stack itemsCenter className='px-2 py-3'>
                                        <span className='text-sm text-gray-800'>Nenhuma produtora cadastrada.</span>
                                    </Stack>
                                ) : (album.labels?.map(label => <LabelItem 
                                    label={label}
                                    key={label.id}
                                    handleDeleteLabel={handleDeleteLabel}
                                    handleClose={() => setOpenMenuLabel(false)}
                                    handleToUpdateLabel={label => setLabelDialog(prev => ({...prev, open: true, label}))}
                                />))}
                            </Stack>
                        </Stack>
                </Popup>

                <Tooltip id={`btn-label-${album.id}`} place='top'/>

                <IconButton onClick={onClickRemove} data-tooltip-id={`btn-delete-${album.id}`} data-tooltip-content={"Excluir"} className='text-gray-700 hover:text-red-400 '>
                    {loading ? <ClipLoader size={18} color={"#6b7280"}/> : <IoTrashOutline className='text-xl'/>}
                </IconButton>
                <Tooltip id={`btn-delete-${album.id}`} place='top'/>
                <Popup open={openMenu} onOpen={handleOpenMenu} onClose={handleCloseMenu} trigger={
                    <IconButton>
                        <HiOutlineDotsVertical/>
                    </IconButton>
                } arrow={false} position={placementTop ? "top right" : "bottom right"} aria-describedby="input-data-picker">
                    <Box component={Paper} className='w-60'>
                        <Stack spacing={3} component={"ul"} className='py-2'>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <BiLike className='text-lg'/>
                                <span className='text-sm'>Reações ({(album.likes || 0) + (album.dislikes || 0) + (album.loves || 0)})</span>
                            </Stack>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <HiOutlinePlay className='text-lg'/>
                                <span className='text-sm'>Reproduções ({album.reproductions || 0})</span>
                            </Stack>
                            
                            <Divider />
                            
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <CgMusic className='text-lg'/>
                                <span className='text-sm'>Músicas ({album.faixas?.length || 0})</span>
                            </Stack>
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <IoIosRecording className='text-lg'/>
                                <span className='text-sm'>Produtoras ({album.labels?.length || 0})</span>
                            </Stack>
                            <Stack onClick={() => {
                                handleCloseMenu();
                                setOpenMusicalGenreDialog(true);
                            }} component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <TbCategory className='text-lg'/>
                                <span className='text-sm'>Generos Musicais ({album.albumMusicalGenres?.length || 0})</span>
                            </Stack>

                            <Divider />
                            
                            <Stack component={"li"} spacing={3} direction='row' itemsCenter className='text-gray-500 h-8 px-3 cursor-pointer hover:bg-white/5'>
                                <TbMusicPlus className='text-lg'/>
                                <span className='text-sm'>Adicionar Música</span>
                            </Stack>
                        </Stack>
                    </Box>
                </Popup>
            </Stack>
            
            {/* LABEL DIALOG */}
            {labelDialog.open && (
                <LabelDialog
                    album={album}
                    {...labelDialog}
                    onCreateLabel={label => {
                        album.labels?.push(label);
                        onUpdate?.(album);
                    }}
                    onUpdateLabel={label => {
                        album.labels = album.labels!.map(l => l.id === label.id ? label : l);
                        onUpdate?.(album);
                    }}
                    handleClose={() => setLabelDialog(prev => ({...prev, open: false, label: undefined}))}
                />
            )}

            {/* MUSICAL GENRE DIALOG */}
            {openMusicalGenreDialog && (
                <ToggleMusicalGenreDialog 
                    open={openMusicalGenreDialog}
                    handleAddMusicalGenre={handleAddMusicalGenre}
                    handleRemoveMusicalGenre={handleRemoveMusicalGenre} 
                    handleClose={() => setOpenMusicalGenreDialog(false)} 
                    addedMusicalGenres={album.albumMusicalGenres?.map(({musicalGenreId, name}) => ({id: musicalGenreId, name}) as MusicalGenre)}
                />
            )}
        </Stack>
    )
}
