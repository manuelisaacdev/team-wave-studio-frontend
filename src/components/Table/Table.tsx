"use client";

import { v4 as uuidv4 } from 'uuid';

import TRow from './TRow';
import THeader from './THeader';
import TableProps from './TableProps';
import { BeatLoader } from 'react-spinners';
import { Checkbox, Paper, Stack } from '@/components';
import Image from 'next/image';

export default function Table({columns=[], data=[], height="calc(100vh - 400px)", loading, showSelection}:TableProps) {
    return (
        <Stack component={Paper} className={"flex-grow"}>
            <Stack direction='row' className='flex-shrink-0 py-5 bg-blue-400/5 gap-2 overflow-x-hidden overflow-y-scroll scrollbar-thin scroll-smooth scrollbar-track-transparent scrollbar-thumb-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                {showSelection && (
                    <Stack direction='row' className='flex-shrink-0 items-center px-5'>
                        <Checkbox className='w-6 h-6 text-sm text-blue-400 border-blue-400/25 has-[input:checked]:bg-blue-400/10'/>
                    </Stack>
                )}
                {columns.map((tableColumn) => <THeader key={tableColumn.field} tableColumn={tableColumn} /> )}
            </Stack>

            <Stack className='flex-grow relative overflow-x-auto overflow-y-scroll scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full' style={{height}}>
                {loading && (
                    <Stack itemsCenter className="justify-center absolute inset-0 bg-[rgba(255, 255, 255, 0.1)]" style={{backdropFilter: "blur(5px)"}}>
                        <BeatLoader color="#60a5fa"/>
                    </Stack>
                )}
                {data.length === 0 && (
                    <Stack spacing={5} className='justify-center items-center absolute inset-0'>
                        <Image width={128} height={128} alt='Tabela Vazia' src={"/img/empty-box.png"} className='backdrop-saturate-50'/>
                        <p className='text-sm text-gray-600 font-medium'>Nenhum dado encontrado.</p>
                    </Stack>
                )}
                {data.map((row, rowIndex, array) => <TRow key={uuidv4()} columns={columns} row={row} rowIndex={rowIndex} showSelection={showSelection} />)}
            </Stack>
        </Stack>
    )
}
