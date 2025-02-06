"use client";

import Link from 'next/link';
import { useState } from 'react';

import { Stack } from '@/components';
import Recovery, { RecoveryDTO } from '@/interfaces/Recovery';
import FormRecover from './components/FormRecover/FormRecover';
import RecoverConfirmationForm from './components/RecoveryConfirmationForm/RecoveryConfirmationForm';

export default function ForgotPassword() {
    const [recovery, setRecovery] = useState<Recovery & RecoveryDTO | null>();
    
    return (
        <Stack fullWidth className='mt-3'>
            <h2 className="text-2xl text-center text-gray-500">Recuperação de Conta</h2>
            {recovery ? <RecoverConfirmationForm duration={recovery.duration} email={recovery.email} handleTimeout={() => setRecovery(null)} /> : <FormRecover handleConfirm={recover => setRecovery(recover)} /> }
            <p className='text-sm text-gray-400 font-light text-center my-5'>Lembrou da sua senha? <Link href={"/login"} className='text-blue-400 hover:underline'>Entrar</Link></p>
        </Stack>
    )
}
