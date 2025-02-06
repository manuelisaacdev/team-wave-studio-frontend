"use client";

import React, { use, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { GoBell } from "react-icons/go";
import { GoGraph } from "react-icons/go";
import { GrOverview } from "react-icons/gr";
import { GrLanguage } from "react-icons/gr";
import { TbActivity } from "react-icons/tb";
import { FiHelpCircle } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { LuUserRoundCog } from "react-icons/lu";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { TbCategory, TbLicense } from "react-icons/tb";
import { IoShareSocialOutline } from 'react-icons/io5';
import { MdOutlineRoomPreferences } from "react-icons/md";

import { useTabs } from '@/hooks';
import { Divider, Panel, Paper, Stack, TabContext } from '@/components';
import ArtistMusicalGenresPanel from './components/ArtistMusicalGenresPanel/ArtistMusicalGenresPanel';
import { AccountPanel, BackupAndSecurityPanel, EventsAndLaunchesPanel, FeedbackAndInteractivityPanel, HelpAndSupportPanel, LanguagePanel, LicensingAndDistributionPanel, NotificationsPanel, OverviewPanel, PreferencesPanel, PrivacyPanel, SettingOption, SocialMediaPanel, StatisticsAndAnalysisPanel } from './components';

export default function Settings() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {tabs, setTabs, ids} = useTabs(20);
    const tab = Number(searchParams.get('tab') || 0);

    function handleSelect(value:string) {
        router.push(`/settings?tab=${ids.indexOf(value)}`);
    }

    useEffect(() => {
        setTabs(ids[tab ? tab : 0]);
    }, [tab]);

    return (
        <Stack className='gap-5 p-5 h-full overflow-hidden'>
            <Stack direction='row' className='justify-between items-center'>
                <Stack>
                    <h1 className='textt-sm text-gray-500 font-medium'>Configurações</h1>
                    <p className='text-xs text-gray-600'>Configure as suas informações e privacidade de sua conta.</p>
                </Stack>
            </Stack>

            <Stack direction='row' component={Paper} className='py-4 ps-4 h-full overflow-hidden'>
                <Stack spacing={5} component={"ul"} className='flex-shrink-0 w-96 pe-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                    <SettingOption label='Overview' description='Visão geral das configurações e resumo da conta.' icon={GrOverview} value={ids[0]} selected={ids[0] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Conta' description='Gerencie as informações pessoais, email e senha.' icon={LuUserRoundCog} value={ids[1]} selected={ids[1] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Redes Sociais' description='Conecte e gerencie integrações com suas redes sociais.' icon={IoShareSocialOutline} value={ids[2]} selected={ids[2] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Gêneros Musicais' description='Gêrencie os gêneros musicais.' icon={TbCategory} value={ids[3]} selected={ids[3] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Notificações' description='Personalize suas preferências para notificações.' icon={GoBell} value={ids[4]} selected={ids[4] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Eventos e Lançamentos' description='Configure lançamentos automáticos e gerencie eventos.' icon={MdOutlineEmojiEvents} value={ids[5]} selected={ids[5] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Licenciamento e Distribuição' description='Gerencie direitos autorais.' icon={TbLicense} value={ids[6]} selected={ids[6] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Feedback e Interatividade' description='Configure como receber feedback e interagir com seguidores.' icon={VscFeedback} value={ids[7]} selected={ids[7] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Actividades' description='Visualize os seus acesso na plataforma.' icon={TbActivity} value={ids[8]} selected={ids[8] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Idioma' description='Escolha o idioma para o aplicativo e as preferências regionais.' icon={GrLanguage} value={ids[9]} selected={ids[9] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Estatísticas e Análises' description='Acesse relatórios sobre o desempenho de suas músicas e vídeos.' icon={GoGraph} value={ids[10]} selected={ids[10] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Preferências' description='Personalize a interface e o comportamento do aplicativo.' icon={MdOutlineRoomPreferences} value={ids[11]} selected={ids[11] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Privacidade' description='Gerencie a visibilidade do seu conteúdo.' icon={MdOutlinePrivacyTip} value={ids[12]} selected={ids[12] === tabs} onSelect={handleSelect}/>
                    <SettingOption label='Ajuda e Suporte' description='Acesse a central de ajuda ou entre em contato com o suporte.' icon={FiHelpCircle} value={ids[13]} selected={ids[13] === tabs} onSelect={handleSelect}/>
                </Stack>
                <Divider orientation='vertical'/>
                <Stack className='flex-grow px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
                    <TabContext value={tabs} unrendere>
                        <Panel value={ids[0]}>
                            <OverviewPanel />
                        </Panel>
                        <Panel value={ids[1]}>
                            <AccountPanel />
                        </Panel>
                        <Panel value={ids[2]}>
                            <SocialMediaPanel />
                        </Panel>
                        <Panel value={ids[3]}>
                            <ArtistMusicalGenresPanel />
                        </Panel>
                        <Panel value={ids[4]}>
                            <NotificationsPanel />
                        </Panel>
                        <Panel value={ids[5]}>
                            <EventsAndLaunchesPanel />
                        </Panel>
                        <Panel value={ids[6]}>
                            <LicensingAndDistributionPanel />
                        </Panel>
                        <Panel value={ids[7]}>
                            <FeedbackAndInteractivityPanel />
                        </Panel>
                        <Panel value={ids[8]}>
                            <BackupAndSecurityPanel />
                        </Panel>
                        <Panel value={ids[9]}>
                            <LanguagePanel />
                        </Panel>
                        <Panel value={ids[10]}>
                            <StatisticsAndAnalysisPanel />
                        </Panel>
                        <Panel value={ids[11]}>
                            <PreferencesPanel />
                        </Panel>
                        <Panel value={ids[12]}>
                            <PrivacyPanel />
                        </Panel>
                        <Panel value={ids[13]}>
                            <HelpAndSupportPanel />
                        </Panel>
                    </TabContext>
                </Stack>
            </Stack>
        </Stack>
    );
};