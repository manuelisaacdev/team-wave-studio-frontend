"use client";

import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { ClipLoader } from 'react-spinners';

import { IoTrashOutline } from 'react-icons/io5';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import LabelItemProps from './LabelItemProps';
import { IconButton, Stack } from '@/components';

export default function LabelItem({label, handleClose, handleDeleteLabel, handleToUpdateLabel}:LabelItemProps) {
    const [loading, setLoading] = useState(false);

    function onDelete(evt:React.MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();
        setLoading(true);
        handleDeleteLabel(label, () => setLoading(false));   
    }

    return (
        <Stack key={label.id} direction='row' itemsCenter spaceBetween className='py-2 px-2 border-b border-white/5'>
            <h2 className='text-sm text-gray-600 truncate block' data-tooltip-id={`label-name-${label.id}`} data-tooltip-content={label.name}>{label.name}</h2>
            <Tooltip id={`label-name-${label.id}`} place='top'/>

            <Stack direction='row' itemsCenter spacing={3}>
                <IconButton onClick={() => {handleClose(); handleToUpdateLabel(label);}} size='small' data-tooltip-id={`btn-update-label-${label.id}`} data-tooltip-content={"Alterar"} className='text-gray-700 hover:text-blue-400'>
                    <HiOutlinePencilSquare className='text-base' />
                </IconButton>
                <Tooltip id={`btn-update-label-${label.id}`} place='top'/>
                
                <IconButton onClick={onDelete} size='small' data-tooltip-id={`btn-delete-label-${label.id}`} data-tooltip-content={"Excluir"} className='text-gray-700 hover:text-red-400'>
                    {loading ? <ClipLoader size={18} color={"#6b7280"}/> : <IoTrashOutline className='text-base'/>}
                </IconButton>
            </Stack>
        </Stack>
    );
}
