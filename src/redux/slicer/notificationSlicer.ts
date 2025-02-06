import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import AlertVariant from '@/components/Alert/AlertVariants';

export interface NotificationPayload {
    title?: string,
    message: string,
    autoClose?: boolean,
} 

interface InitialState extends NotificationPayload {
    show?: boolean,
    variant?: keyof AlertVariant,
}

const initialState: InitialState = {
    message: "",
    variant: "info",
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        info: (state, { payload: {title, message, autoClose=true} }: PayloadAction<NotificationPayload>) => {
            return {...state, show: true, title, message, autoClose, variant: "info"};
        },

        success: (state, { payload: {title, message, autoClose=true} }: PayloadAction<NotificationPayload>) => {
            return {...state, show: true, title, message, autoClose, variant: "success"};
        },

        warning: (state, { payload: {title, message, autoClose=true} }: PayloadAction<NotificationPayload>) => {
            return {...state, show: true, title, message, autoClose, variant: "warning"};
        },

        error: (state, { payload: {title, message, autoClose=true} }: PayloadAction<NotificationPayload>) => {
            return {...state, show: true, title, message, autoClose, variant: "error"};
        },

        close: (state) => {
            return {...state, show: false};
        },

        toggle: (state) => {
            return {...state, show: !state.show};
        }
    }
})

export const notification = notificationSlice.actions;
export const selectNotification = (state: RootState) => state.notification;
export default notificationSlice.reducer;