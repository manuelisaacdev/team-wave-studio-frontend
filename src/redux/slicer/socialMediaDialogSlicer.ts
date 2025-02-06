import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SocialMedia from '@/interfaces/SocialMedia';

import type { RootState } from '../store';

interface InitialState {
    open?: boolean,
    updateSocialMedia?: SocialMedia,
}

const initialState: InitialState = {
    open: false,
}

export const socialMediaDialogSlice = createSlice({
    name: 'socialMediaDialog',
    initialState,
    reducers: {
        handleOpenSocialMediaDialog: (state) => {
            return {...state, open: true};
        },

        handleCloseSocialMediaDialog: (state) => {
            return {...state, open: false};
        },

        handleChangeSocialMediaDialog: (state, {payload}: PayloadAction<InitialState>) => {
            return {...state, ...payload};
        },
    }
})

export const {handleOpenSocialMediaDialog, handleCloseSocialMediaDialog, handleChangeSocialMediaDialog} = socialMediaDialogSlice.actions;
export const selectSocialMediaDialog = (state: RootState) => state.socialMediaDialog;
export default socialMediaDialogSlice.reducer;