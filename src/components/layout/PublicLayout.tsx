import React from 'react';
import Image from 'next/image';
import { Box, Paper, Stack } from '@/components';


export default function PublicLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <Stack direction='row' className='gap-16 justify-center lg:justify-between items-center w-screen h-screen relative z-0 xl:p-10 lg:p-8 md:p-6 sm:p-5 object-cover bg-[url("/img/bg-authentication.webp")] before:z-[-1] before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/50 before:from-20% before:to-transparent'>
            <Stack className='hidden lg:flex'>
                <Stack className='items-center flex-col xl:flex-row'>
                    <Image width={192} height={192} alt='Logo' src={"/img/logo-192x192.webp"} className='animate-wiggle animate-infinite'/>
                    <h1 className='text-6xl text-primary font-bold text-center'>Team<span className='text-secondary inline-block animate-add animate-shake'>Wave</span> <span className='text-white inline-block animate-pulse'>Studio</span></h1>
                </Stack>
                <h2 className='text-lg font-medium text-blue-400'>Bem-vindo(a) ao TeamWave Studio! <span className='inline-block animate-wiggle animate-infinite'>🎶</span><span className='inline-block animate-bounce animate-infinite du'>🌊</span>.</h2>
                <p className='text-sm text-gray-300 font-light max-w-[720px] mt-3'>A plataforma onde a música ganha vida! Explore um universo de sons, descubra novos talentos e curta suas playlists favoritas. Seja você um fã, artista ou criador, aqui é o lugar perfeito para compartilhar e celebrar sua paixão pela música.</p>
                <small className='text-sm text-gray-500 font-semibold mt-3 animate-pulse animate-infinite'>Vamos criar ondas juntos!</small>
            </Stack>

            <Box component={"span"} className='relative z-0 before:z-[-1] before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:via-blue-400 before:to-pink-500 before:blur-[200px] before:saturate-200 before:opacity-50 before:backdrop-blur-sm before:animate-pulse'>
                <Stack component={Paper} className='items-center w-[512px] p-5'>
                    <Image width={32} height={32} alt='Logo' src={"/img/logo-192x192.webp"} className='animate-wiggle'/>
                    <h1 className='text-2xl font-medium text-primary text-center'>Team<span className='text-secondary'>Wave</span></h1>
                    {children}
                    <p className='text-sm text-gray-700 font-light text-center mt-5'>Todos os direitos estão resevado - ManuelDesign&copy;</p>
                </Stack>
            </Box>
        </Stack>
    )
}
