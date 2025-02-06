"use client";

import React from 'react';

import { useTabs } from '@/hooks';
import { cn } from '@/lib/utils';
import UpdateEmailPanel from './UpdateEmailPanel';
import UserAccount from './UserAccount';
import ArtistAccount from './ArtistAccount';
import UpdatePassword from './UpdatePassword';
import ProfilePhotoUpdateForm from './ProfilePhotoUpdateForm';
import ProfileCoverUpdateForm from './ProfileCoverUpdateForm';
import { Button, Divider, Panel, Stack, TabContext } from '@/components';

export default function AccountPanel() {
    const {tabs, setTabs, ids} = useTabs(6);

    return (
        <Stack spacing={5}>
            <Stack direction='row' spacing={3} itemsCenter className='flex-wrap'>
                <Button onClick={() => setTabs(ids[0])} size='large' roundedLarger className={cn(ids[0] === tabs && "bg-blue-400/25 hover:bg-blue-400/25")}>Conta Usuário</Button>
                <Button onClick={() => setTabs(ids[1])} size='large' roundedLarger className={cn(ids[1] === tabs && "bg-blue-400/25 hover:bg-blue-400/25")}>Conta Artístca</Button>
                <Button onClick={() => setTabs(ids[2])} size='large' roundedLarger className={cn(ids[2] === tabs && "bg-blue-400/25 hover:bg-blue-400/25")}>Alterar Email</Button>
                <Button onClick={() => setTabs(ids[3])} size='large' roundedLarger className={cn(ids[3] === tabs && "bg-blue-400/25 hover:bg-blue-400/25")}>Alterar Senha</Button>
                <Button onClick={() => setTabs(ids[4])} size='large' roundedLarger className={cn(ids[4] === tabs && "bg-blue-400/25 hover:bg-blue-400/25")}>Capa & Foto de Perfil</Button>
            </Stack>
            <TabContext value={tabs} unrendere>
                <Panel value={ids[0]}>
                    <UserAccount />
                </Panel>
                <Panel value={ids[1]}>
                    <ArtistAccount />
                </Panel>
                <Panel value={ids[2]}>
                    <UpdateEmailPanel />
                </Panel>
                <Panel value={ids[3]}>
                    <UpdatePassword />
                </Panel>
                <Panel value={ids[4]}>
                    <Stack spacing={5}>
                        <ProfilePhotoUpdateForm />
                        <Divider />
                        <ProfileCoverUpdateForm />
                    </Stack>
                </Panel>
            </TabContext>
        </Stack>
    )
}
