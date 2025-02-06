"use client";

import { useEffect } from 'react';
import { Portal } from '@/components';
import Alert from '@/components/Alert/Alert';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { notification, selectNotification } from '@/redux/slicer/notificationSlicer';

export default function NotificationProvider({children}:Readonly<{children:React.ReactNode}>) {
    const dispatch = useAppDispatch();
    const {show, title, message, variant, autoClose} = useAppSelector(selectNotification);

    function handleClose() {
        dispatch(notification.close());        
    }

    useEffect(() => {
        if (!show || !autoClose) return;
        const timeout = setTimeout(() => dispatch(notification.close()), 3000);
        return () => clearTimeout(timeout);
    }, [show]);

    return (
        <>
            {children}
            <Portal>
                <Alert title={title} message={message} variant={variant} solid showIcon handleClose={handleClose} 
                    style={{
                        position: 'absolute',
                        left: 20,
                        bottom: 20,
                        zIndex: 1000,
                        transition: "all 0.4s ease", 
                        transform: show ? "translateX(0)" : "translateX(calc(-100% - 21px))"
                    }} 
                />
            </Portal>
        </>
    )
}
