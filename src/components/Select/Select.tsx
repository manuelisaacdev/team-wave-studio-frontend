"use client";

import React, { useState } from 'react'

import Popup from 'reactjs-popup';
import { IoChevronUp } from 'react-icons/io5';

import { cn } from '@/lib/utils';
import SelectProps from './SelectProps';
import { IconButton, Paper, TextField, Wrapper } from '@/components';

export default function Select({children, inputProps}:SelectProps) {
    const [open, setOpen] = useState<boolean>(false);

    function handleOpen() {
        setOpen(() => true);
    }

    function handleClose() {
        setOpen(() => false);
    }

    return (
        <Popup open={open} onOpen={handleOpen} onClose={handleClose} trigger={
            <Wrapper>
                <TextField focus={open} readOnly {...inputProps} endAction={
                    <IconButton onClick={handleOpen}>
                        <IoChevronUp className={cn("origin-center rotate-180 transition-all", open && "rotate-0")} />
                    </IconButton>
                } />
            </Wrapper>
        } arrow={false} position="bottom left" aria-describedby="input-select" offsetY={inputProps?.message ? -20 : 0}>
            <Paper component={"ul"} style={{maxHeight: "30dvh"}} className='absolute flex flex-col w-80 min-h-5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {children && children(handleClose)}
            </Paper>
        </Popup>
    )
}
