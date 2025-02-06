"use client";

import { useState } from 'react';

import UpdateEmailForm from './UpdateEmailForm';
import RequireUpdateEmail from './RequireUpdateEmail';
import { EmailToken, UserEmailDTO } from '@/interfaces/User';

export default function UpdateEmailPanel() {
    const [requireAccountActivation, setRequireAccountActivation] = useState<EmailToken & UserEmailDTO | null>();

    return (
        requireAccountActivation ? <UpdateEmailForm email={requireAccountActivation.email} expiration={requireAccountActivation.expiration} handleTimeout={() => setRequireAccountActivation(null)} /> : <RequireUpdateEmail handleSuccess={setRequireAccountActivation} />
    )
}
