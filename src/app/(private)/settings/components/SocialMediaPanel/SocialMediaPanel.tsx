"use client";

import { useState } from 'react';
import { Tooltip } from 'react-tooltip';

import { TbCategory } from 'react-icons/tb';

import SocialMedia from '@/interfaces/SocialMedia';
import SocialMediaService from '@/services/SocialMediaService';
import { Button, SocialMediaDialog, Stack } from '@/components';
import { useAppDispatch, useAppSelector, useError } from '@/hooks';
import CardSocialMedia from '@/components/CardSocialMedia/CardSocialMedia';
import { removeSocialMidia, selectSocialMedia } from '@/redux/slicer/socialMediaSlicer';

const socialMediaService = new SocialMediaService();

export default function SocialMediaPanel() {
    const error = useError();
    const dispatch = useAppDispatch();
    const socialMidias = useAppSelector(selectSocialMedia);
    const [socialMediaDialog, setSocialMediaDialog] = useState<{open?:boolean, updateSocialMedia?: SocialMedia}>()
    
    function handleRemoveSocialMedia(socialMedia:SocialMedia, onFinally: () => void) {
        socialMediaService.delete(socialMedia.id).then(() => {
            dispatch(removeSocialMidia(socialMedia));
        }).catch(error).finally(onFinally)
    };

    return (
        <Stack spacing={5} className='h-full overflow-hidden'>
            <Stack direction='row' className='justify-between items-center'>
                <Stack>
                    <h1 className='textt-sm text-gray-500 font-medium'>Redes Social</h1>
                    <p className='text-xs text-gray-600'>Há {socialMidias.length || 0} redes sociais no total.</p>
                </Stack>

                <Stack direction='row' className='gap-5 items-center'>
                    <Button size='large' roundedLarger onClick={() => setSocialMediaDialog(prev => ({...prev, open: true}))} startIcon={TbCategory} data-tooltip-id='btn-social-media-dialog' data-tooltip-content={"Nova"}>Adicionar</Button>
                    <Tooltip id='btn-social-media-dialog' place='bottom'/>
                </Stack>
                <SocialMediaDialog open={socialMediaDialog?.open} updateSocialMedia={socialMediaDialog?.updateSocialMedia} handleClose={() => setSocialMediaDialog(prev => ({...prev, open: false, updateSocialMedia: undefined}))} />
            </Stack>
            {socialMidias.map(socialMidia => (
                <CardSocialMedia 
                    key={socialMidia.id}
                    socialMedia={socialMidia}
                    handleRemoveSocialMedia={handleRemoveSocialMedia}
                    handleUpdateSocialMedia={updateSocialMedia => setSocialMediaDialog(prev => ({...prev, open: true, updateSocialMedia}))}
                />
            ))}
        </Stack>
    )
};