"use client";

import React from 'react';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import { IoMdCheckmark } from 'react-icons/io';

import { cn } from '@/lib/utils';
import {IconButton, Paper} from '@/components';
import NotificationsProps from './NotificationsProps';

export default function Notifications({handleClose, className, ...rest}:NotificationsProps) {
    return (
        <Paper className={cn("flex flex-col w-[400px] h-[512px]")} {...rest}>
            <div className="flex justify-between items-center p-3 border-b border-white/5">
                <h3 className="text-gray-500 font-semibold text-sm">Notificações</h3>
                <IconButton onClick={handleClose} data-tooltip-id='btn-mark-as-seen' data-tooltip-content={"Marcar como visto"}>
                    <IoMdCheckmark />
                </IconButton>
                <Tooltip id='btn-mark-as-seen' place='bottom'/>
            </div>

            <div className="flex flex-col flex-grow px-3 border-b border-white/5"></div>

            <div className="flex justify-center items-center px-3 py-2">
                <Link onClick={handleClose} href={"#"} className="text-blue-500 hover:text-blue-500 flex items-center h-8 px-5 hover:bg-blue-400/5 rounded-md font-light text-sm">
                    Ver más
                </Link>
            </div>
        </Paper>
    )
}
