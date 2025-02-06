"use client";

import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { ClipLoader } from 'react-spinners';

import { TbCategory } from 'react-icons/tb';
import { IoTrashOutline } from 'react-icons/io5';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import TableColumn from '@/components/Table/TableColumn';
import SocialMediaService from '@/services/SocialMediaService';
import { Button, IconButton, Stack, Table } from '@/components';
import SocialMedia, { SOCIAL_MEDIAS_DATA } from '@/interfaces/SocialMedia';
import { removeSocialMidia, selectSocialMedia } from '@/redux/slicer/socialMediaSlicer';
import { useAppDispatch, useAppSelector, useConfirmationDialog, useError } from '@/hooks';
import { handleChangeSocialMediaDialog, handleOpenSocialMediaDialog } from '@/redux/slicer/socialMediaDialogSlicer';

const socialMediaService = new SocialMediaService();

export default function page() {
    const error = useError();
    const dispatch = useAppDispatch();
    const socialMidias = useAppSelector(selectSocialMedia);
    const columnDefinition = buildColumnDefinition(updateSocialMedia => dispatch(handleChangeSocialMediaDialog({updateSocialMedia, open: true})), handleRemoveSocialMedia);
    
    function handleRemoveSocialMedia(socialMedia:SocialMedia, onFinally: () => void) {
        socialMediaService.delete(socialMedia.id).then(() => {
            dispatch(removeSocialMidia(socialMedia));
        }).catch(error).finally(onFinally)
    };

    return (
        <Stack className='gap-5 p-5 h-full overflow-hidden'>
            <Stack direction='row' className='justify-between items-center'>
                <Stack>
                    <h1 className='textt-sm text-gray-500 font-medium'>Redes Social</h1>
                    <p className='text-xs text-gray-500'>Há {socialMidias.length || 0} redes sociais no total.</p>
                </Stack>

                <Stack direction='row' className='gap-5 items-center'>
                    <Button size='large' roundedLarger onClick={() => dispatch(handleOpenSocialMediaDialog())} startIcon={TbCategory} data-tooltip-id='btn-social-media-dialog' data-tooltip-content={"Nova Rede Social"}>Adicionar</Button>
                    <Tooltip id='btn-social-media-dialog' place='bottom'/>
                </Stack>
            </Stack>
            <Table 
                data={socialMidias}
                columns={columnDefinition}
            />
        </Stack>
    )
}

function buildColumnDefinition(
    handleUpdateSocialMedia: (socialMedia:SocialMedia) => void,
    handleRemoveSocialMedia: (socialMedia:SocialMedia, onFinally: () => void) => void) {
    const columns: TableColumn[] = [
        {
            title: "URL",
            field: "url", 
            message: "Link da rede social",
            render: (socialMedia: SocialMedia) => <Link href={socialMedia.url} target="_blank" rel="noopener noreferrer" className='text-sm text-gray-500 font-light hover:underline hover:text-blue-400'>{socialMedia.url}</Link>
        },
        {
            title: "Tipo",
            field: "socialMediaType", 
            message: "O tipo de Rede social",
            render: (socialMedia: SocialMedia) => <h2 className='text-sm text-gray-500 font-light'>{SOCIAL_MEDIAS_DATA[socialMedia.socialMediaType].label}</h2>
        },
        {
            title: "Adicionado Em",
            field: "createdAt", 
            placement: "center",
            message: "Data de registro",
            render: (socialMedia: SocialMedia) => <span className='text-sm text-gray-500 font-light'>{dayjs(socialMedia.createdAt).format("DD/MM/YYYY - HH:mm")}</span>
        },
        {
            title: "Acções",
            field: "actions",
            message: "Gerencie os seus link da redes sociais",
            placement: "center", 
            render: (socialMedia: SocialMedia) => {
                const dispatch = useAppDispatch();
                const [loading, setLoading] = useState(false);
                const confirmationDialog = useConfirmationDialog();
                
                function onConfirm() {
                    setLoading(true);
                    handleRemoveSocialMedia(socialMedia, () => setLoading(false));
                }

                function onClick() {
                    confirmationDialog.show({
                        onConfirm,
                        title: "Remover Rede Social",
                        message: `Tem certeza que deseja remover a rede social ${SOCIAL_MEDIAS_DATA[socialMedia.socialMediaType].label}?`,
                    });
                }

                return (
                    <Stack direction='row' spacing={5} className='items-center justify-center'>
                        <IconButton onClick={() => handleUpdateSocialMedia(socialMedia)} className='text-gray-700 text-lg hover:text-red-400 hover:bg-red-400/5'>
                            <HiOutlinePencilSquare />
                        </IconButton>
                        <IconButton onClick={onClick} className='text-gray-700 text-lg hover:text-red-400 hover:bg-red-400/5'>
                            {loading ? <ClipLoader size={18} color={"#6b7280"}/> : <IoTrashOutline className='text-xl'/>}
                        </IconButton>
                    </Stack>
                )
            }
        }
    ];

    return columns;
}
