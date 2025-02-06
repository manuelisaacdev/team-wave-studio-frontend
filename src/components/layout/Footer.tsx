"use client";

import React from 'react'
import Link from 'next/link'
import { Tooltip } from 'react-tooltip';

import { GoPlusCircle } from 'react-icons/go';

import { useAppSelector } from '@/hooks';
import { IconButton, Stack, } from '@/components';
import { SOCIAL_MEDIAS_DATA } from '@/interfaces/SocialMedia';
import { selectSocialMedia } from '@/redux/slicer/socialMediaSlicer';

export default function Footer() {
    const socialMidias = useAppSelector(selectSocialMedia);

    return (
        <Stack component={"footer"} direction='row' spacing={5} spaceBetween itemsCenter className='flex-shrink-0 h-16 px-5 bg-paper-primary border-t border-white/5'>
            <p className='text-gray-500 text-sm'>Todos os direitos reservados &copy; 2023 - Team Wave Studio</p>
            
            <Stack component={"ul"} direction='row' spacing={5}>
                <li><Link href='#' className='text-sm text-gray-600 hover:underline hover:text-gray-500'>Sobre nós</Link></li>
                <li><Link href='#' className='text-sm text-gray-600 hover:underline hover:text-gray-500'>Termos de uso</Link></li>
                <li><Link href='#' className='text-sm text-gray-600 hover:underline hover:text-gray-500'>Política de privacidade</Link></li>
            </Stack>

            <Stack direction='row'>
                <Stack component={"ul"} direction='row' itemsCenter spacing={5}>
                    {socialMidias.length === 0 ? (<>
                        <p className='text-sm text-gray-500 font-light'>Você não tem nenhuma rede social.</p>
                        <Link href={"/settings?tab=2"}>
                            <IconButton data-tooltip-id='bgn-add-social-midia' data-tooltip-content={"Adicionar"}>
                                <GoPlusCircle />
                            </IconButton>
                            <Tooltip id='bgn-add-social-midia' place='top'/>
                        </Link>    
                    </>) : (<>
                        {socialMidias.length > 3 && (
                            <Link href={"/settings?tab=2"} className='text-sm text-gray-600 hover:text-gray-500 hover:underline'>Ver todos (+{socialMidias.length - 3})</Link>
                        )}
                        {socialMidias.slice(0, 3).map(({id, url, createdAt, socialMediaType}, index) => {
                            const {label, Icon} = SOCIAL_MEDIAS_DATA[socialMediaType];
                            return (
                                <li key={id} data-tooltip-id={`link-${id}`} data-tooltip-content={label}>
                                    <Link href={url} className='text-lg text-gray-600 hover:text-blue-400 hover:underline'>
                                        <Icon />
                                    </Link>
                                    <Tooltip id={`link-${id}`} place='top'/>
                                </li>
                            );
                        })}
                    </>
                    )}
                </Stack>
            </Stack>
        </Stack>
    )
}
