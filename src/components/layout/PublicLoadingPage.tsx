"use client";

import React from 'react';
import { PropagateLoader } from 'react-spinners';

import {Stack} from '@/components';

export default function PublicLoadingPage() {
    return (
        <Stack fullWidth itemsCenter className="mt-3">
            <span>
                <PropagateLoader color="#E3651D"  />
            </span>
            <p className="text-sm text-gray-500 font-light text-center mt-8">Aguarde o carregamento da página.</p>
        </Stack>
    )
}
