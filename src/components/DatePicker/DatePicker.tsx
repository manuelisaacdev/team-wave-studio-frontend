"use client";

import dayjs from 'dayjs';
import Popup from 'reactjs-popup';
import React, { useState } from 'react';

import { CiCalendar } from 'react-icons/ci';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import Day from './Day';
import Week from './Week';
import DatePickerProps from './DatePickerProps';
import { buildMaxDaysOfMonths } from '@/lib/utils';
import { IconButton, Paper, Portal, TextField, Wrapper} from '@/components';

const NOW = new Date();
const DAYS_SHOW = 5 * 7;
const DAYS:number[] = [];

for (let i = 1; i <= DAYS_SHOW; i++) {
    DAYS.push(i);
}

interface SelectedDate {
    day: number;
    month: number;
    year: number;
}

export default function DatePicker({maxDate=NOW, textFieldProps}:DatePickerProps) {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<SelectedDate>({
        day: maxDate.getDate(),
        month: maxDate.getMonth(),
        year: maxDate.getFullYear(),
    });

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function onChange(evt:React.ChangeEvent<HTMLInputElement>) {
        const newDate = new Date(evt.target.value);
        setSelectedDate({...selectedDate, 
            day: newDate.getDate(),
            month: newDate.getMonth(),
            year: newDate.getFullYear(),
        });
    }

    function handleSelect(day:number) {
        setSelectedDate(() => ({...selectedDate, day }));
        handleClose();
    }
    
    return (
        <Popup open={open} onClose={handleClose} trigger={
            <Wrapper>
                <TextField {...textFieldProps} type='date' value={dayjs(new Date(selectedDate.year, selectedDate.month, selectedDate.day)).format("YYYY-MM-DD")} onChange={onChange} endAction={
                    <IconButton onClick={handleOpen}>
                        <CiCalendar />
                    </IconButton>
                } />
            </Wrapper>
        } arrow={false} position="bottom left" aria-describedby="input-data-picker">
            <Paper className="absolute flex flex-col w-[300px]">
                <div className='flex justify-between items-center py-2 px-3 border-b border-white/5'>
                    <div className="flex gap-2 items-center">
                        <IconButton onClick={() => setSelectedDate(({month}) => ({...selectedDate, month: month - 1 }))} disabled={selectedDate.month === 0} size='small'>
                            <GoChevronLeft />
                        </IconButton>
                        <span className='text-gray-500 text-sm font-medium'>{new Date(selectedDate.year, selectedDate.month, 1).toLocaleDateString('pt-BR', { month: 'long' })}</span>
                        <IconButton  onClick={() => setSelectedDate(({month}) => ({...selectedDate, month: month + 1 }))} disabled={selectedDate.month === 11} size='small'>
                            <GoChevronRight />
                        </IconButton>
                    </div>
                    <div className="flex gap-2 items-center">
                        <IconButton onClick={() => setSelectedDate(({year}) => ({...selectedDate, year: year - 1 }))} disabled={selectedDate.year <= NOW.getFullYear() - 100} size='small'>
                            <GoChevronLeft />
                        </IconButton>
                        <span className='text-gray-500 text-sm font-medium'>{selectedDate.year}</span>
                        <IconButton onClick={() => setSelectedDate(({year}) => ({...selectedDate, year: year + 1 }))} disabled={selectedDate.year === NOW.getFullYear()}  size='small'>
                            <GoChevronRight />
                        </IconButton>
                    </div>
                </div>

                <div className="flex flex-col p-3">
                    <div className='grid grid-cols-7 gap-4'>
                        <Week day="D"/>
                        <Week day="S"/>
                        <Week day="T"/>
                        <Week day="Q"/>
                        <Week day="Q"/>
                        <Week day="S"/>
                        <Week day="S"/>
                    </div>
                    <div className='grid grid-cols-7 gap-4'>
                        {DAYS.map((day, index) => day <= buildMaxDaysOfMonths(selectedDate.year)[selectedDate.month] ? (
                            <Day 
                                key={index} 
                                value={day} 
                                onClick={() => handleSelect(day)} 
                                selected={day === selectedDate.day} 
                                currentDay={day === NOW.getDate() && selectedDate.month === NOW.getMonth() && selectedDate.year === NOW.getFullYear()} 
                                disabled={dayjs(new Date(selectedDate.year, selectedDate.month, day)).isAfter(dayjs())}/>
                        ) : (
                            <Day key={index} value={day - buildMaxDaysOfMonths(selectedDate.year)[selectedDate.month]} disabled />
                        ))}
                    </div>
                </div>
            </Paper>
        </Popup>
    )
}
