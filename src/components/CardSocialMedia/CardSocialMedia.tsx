"use client";

import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { Tooltip } from 'react-tooltip';
import { IoTrashOutline } from 'react-icons/io5';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import { useConfirmation } from '@/hooks';
import { IconButton, Stack } from '@/components';
import CardSocialMediaProps from './CardSocialMediaProps';
import { SOCIAL_MEDIAS_DATA } from '@/interfaces/SocialMedia';

export default function CardSocialMedia({socialMedia, handleUpdateSocialMedia, handleRemoveSocialMedia}:CardSocialMediaProps) {
    const confirmation = useConfirmation();
    const [loading, setLoading] = useState(false);
    const {Icon, label} = SOCIAL_MEDIAS_DATA[socialMedia.socialMediaType];
    
    function onConfirm() {
        setLoading(true);
        handleRemoveSocialMedia(socialMedia, () => setLoading(false));
    }

    function onClick() {
        confirmation.show({
            onConfirm,
            title: "Remover Rede Social",
            message: `Tem certeza que deseja remover a rede social ${SOCIAL_MEDIAS_DATA[socialMedia.socialMediaType].label}?`,
        });
    }

    return (
        <Stack spacing={5} direction='row' spaceBetween itemsCenter className='border border-white/5 py-2 px-4 rounded-3xl hover:shadow-lg'>
            <Stack spacing={3} direction='row' itemsCenter className='overflow-hidden' style={{width: 'calc(100% / 3)'}}>
                <Icon className='text-gray-500 flex-shrink-0'/>
                <Link href={socialMedia.url} target="_blank" rel="noopener noreferrer" data-tooltip-id={socialMedia.id} data-tooltip-content={label} className='text-sm text-gray-500 font-light hover:underline hover:text-blue-400 inline-block truncate'>{label}</Link>
                <Tooltip id={socialMedia.id} place='top'/>
            </Stack>

            <Stack direction='row' itemsCenter className='justify-center' style={{width: 'calc(100% / 3)'}}>
                <span className='text-sm text-gray-500 font-light'>{dayjs(socialMedia.createdAt).format("DD/MM/YYYY - HH:mm")}</span>
            </Stack>
            
            <Stack direction='row' spacing={5} itemsCenter className='justify-end' style={{width: 'calc(100% / 3)'}}>
                <IconButton onClick={() => handleUpdateSocialMedia(socialMedia)} className='text-gray-700 text-lg hover:text-red-400 hover:bg-red-400/5'>
                    <HiOutlinePencilSquare />
                </IconButton>
                <IconButton onClick={onClick} className='text-gray-700 text-lg hover:text-red-400 hover:bg-red-400/5'>
                    {loading ? <ClipLoader size={18} color={"#6b7280"}/> : <IoTrashOutline className='text-xl'/>}
                </IconButton>
            </Stack>
        </Stack>
    )
}
