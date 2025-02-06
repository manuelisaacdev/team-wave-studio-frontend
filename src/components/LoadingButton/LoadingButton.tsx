"use client";

import React, { forwardRef } from 'react';
import { ClipLoader } from 'react-spinners';

import { Button } from '@/components';
import LoadingButtonProps from './LoadingButtonProps';

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(({children, icon, type="submit", startIcon, loading, ...rest}, ref) => {
    return (
        <Button type={type} ref={ref} disabled={loading} {...rest} startIcon={loading ? undefined : startIcon}>
            {loading && <ClipLoader size={icon?.size || 16} color={icon?.color || '#6b7280'}/>}
            <span>{ children }</span>
        </Button>
    );
});

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;