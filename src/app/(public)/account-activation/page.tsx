"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Stack } from '@/components';
import { EmailToken, UserEmailDTO } from '@/interfaces/User';
import ActivateAccount from './components/ActivateAccount/ActivateAccount';
import RequireAccountActivation from './components/RequireAccountActivation/RequireAccountActivation';

export default function AccountActivation() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || undefined;
    const password = searchParams.get('password') || undefined;
    const [requireAccountActivation, setRequireAccountActivation] = useState<EmailToken & UserEmailDTO | null>();

    return (
        <Stack fullWidth className='mt-3'>
            <h2 className="text-2xl text-center text-gray-500">Activação de Conta</h2>
            {requireAccountActivation ? <ActivateAccount email={requireAccountActivation.email} expiration={requireAccountActivation.expiration} password={password} handleTimeout={() => setRequireAccountActivation(null)} /> : <RequireAccountActivation email={email} handleSuccess={setRequireAccountActivation} />}
        </Stack>
    )
}
