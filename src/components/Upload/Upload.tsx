"use client";

import React, { useRef, useState } from 'react'

import { FcCancel, FcFile, FcOk } from "react-icons/fc";


import { cn } from '@/lib/utils';
import UploadProps from './UploadProps';
import UploadState from './UploadState';
import { Box, Stack } from '@/components';

export default function Upload({accept="image/.png,.jpeg,.jpg,.webp"}:UploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [{uploadState, dragOver}, setUploadState] = useState<{dragOver?:boolean, uploadState: UploadState}>({uploadState: UploadState.IDLE});

    function onClick(evt:React.MouseEvent<HTMLSpanElement>) {
        evt.preventDefault();
        inputRef.current?.click();
    }

    function onDragOver(evt:React.DragEvent<HTMLDivElement>) {
        evt.preventDefault();
        const file = evt.dataTransfer.items[0];
        
        setUploadState(prevState => ({
            ...prevState, dragOver: true,
            uploadState: file.type.split("/")[0] === accept.split("/")[0] ? UploadState.ACCEPTED : UploadState.REJECTED
        }));
    }

    function onDragLeave(evt:React.DragEvent<HTMLDivElement>) {
        evt.preventDefault();
        setUploadState(prevState => ({...prevState, dragOver: false, uploadState: UploadState.IDLE}));
    }

    function onDrop(evt:React.DragEvent<HTMLDivElement>) {
        evt.preventDefault();
        const file: File = evt.dataTransfer.files[0];
        console.log("FILE: ", file)
    }

    return (
        <Box className='w-full h-full p-5 bg-blue-300/10 rounded-xl'>
            <Stack onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave} spacing={5} itemsCenter className={cn('justify-center h-full p-5 border border-dashed border-blue-400 rounded-xl', dragOver && "bg-blue-300/25")}>
                {uploadState === UploadState.IDLE && <FcFile className='text-8xl'/>}
                {uploadState === UploadState.ACCEPTED && <FcOk className='text-8xl'/>}
                {uploadState === UploadState.REJECTED && <FcCancel className='text-8xl'/>}
                <p className='text-sm text-gray-500'>Arraste um arquivo ou clique <span onClick={onClick} className='text-blue-400 hover:text-blue-400/80 cursor-pointer'>aquí</span></p>
                <input type="file" ref={inputRef} className='hidden' accept={accept}/>
            </Stack>
        </Box>
    )
}
