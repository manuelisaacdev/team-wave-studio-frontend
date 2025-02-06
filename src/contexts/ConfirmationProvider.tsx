"use client";

import { createContext, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogHeader, Portal } from '@/components';

interface Payload {
    title?: string,
    onCancel?: () => void,
    onConfirm?: () => void,
    message?: string | React.ReactNode,
}

interface Confirmation {
    show: (payload: Payload) => void;
}

export const ConfirmationContext = createContext({} as Confirmation); 

export default function ConfirmationProvider({children}:Readonly<{children:React.ReactNode}>) {
    const [payload, setPayload] = useState<Payload & {open?:boolean}>();

    function handleClose() {
        setPayload(prev => ({...prev, open: false}));        
    }

    function handleCencel() {
        handleClose();
        payload?.onCancel?.();
    }

    function handleConfirm() {
        handleClose();
        payload?.onConfirm?.();
    }

    function show(payload:Payload) {
        setPayload(prev => ({...prev, open: true, ...payload}));
    }

    return (
        <ConfirmationContext.Provider value={{show}}>
            {children}
            <Dialog open={payload?.open} size='xsmall'>
                <DialogHeader title={payload?.title} handleClose={handleCencel}/>
                <DialogContent className="flex flex-col gap-5 py-3">
                    <p className='text-sm text-gray-500 text-center'>{payload?.message}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCencel} roundedLarger className='text-red-400 border-red-500/10 bg-red-500/5 hover:bg-red-500/10'>Cancelar</Button>
                    <Button onClick={handleConfirm} roundedLarger>Excluir</Button>
                </DialogActions>
            </Dialog>
        </ConfirmationContext.Provider>
    )
}
