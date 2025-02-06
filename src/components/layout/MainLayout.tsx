"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { PropagateLoader } from 'react-spinners';

import Footer from './Footer';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Stack } from "@/components";
import { useAppSession } from '@/hooks';
import PublicLayout from './PublicLayout';

enum Status {
    INIT,
    LOADING,
    SUCCESS,
    ERROR
}

export default function MainLayout({children}:{children:React.ReactNode}) {
    const [status, setStatus] = useState<Status>(Status.INIT);

    const data = useAppSession({
        onError: () => setStatus(Status.ERROR),
        onFetch: () => setStatus(Status.LOADING),
        onSuccess: () => setStatus(Status.SUCCESS),
    });

    return ( 
        status === Status.SUCCESS ? (
            <Stack direction='row' component={"main"} className='w-screen h-screen bg-paper-secondary'>
                <Sidebar/>
                <Stack component={"section"} className="flex-1 items-stretch">
                    <Topbar/>
                    <Stack className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                        {children}
                    </Stack>
                    <Footer />
                </Stack>
            </Stack>
        ) : (
            <PublicLayout>
                {status === Status.INIT && (
                    <Stack spacing={5} itemsCenter className='mt-3'>
                        <PropagateLoader color="#E3651D" />
                        <p className="text-sm text-gray-500 font-light text-center">Preparando para carregar os dados.</p>
                    </Stack>
                )}

                {status === Status.LOADING && (
                    <Stack spacing={5} itemsCenter className='mt-3'>
                        <PropagateLoader color="#E3651D" />
                        <p className="text-sm text-gray-500 font-light text-center">Carregando dados.</p>
                    </Stack>
                )}

                {status === Status.ERROR && (
                    <Stack itemsCenter>
                        <Image width={96} height={96} alt='Error' src={"/img/error-cloud-96.png"} />
                        <p className="text-sm text-red-400/80 font-light text-center">Não foi possível carregar os dados.</p>
                    </Stack>
                )}
            </PublicLayout>
        )
    )
}
