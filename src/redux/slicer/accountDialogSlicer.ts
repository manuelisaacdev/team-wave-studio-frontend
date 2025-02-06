import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface InitialState {
    open?: boolean,
}

const initialState: InitialState = {
    open: false,
}

export const accountDialogSlice = createSlice({
    name: 'accountDialog',
    initialState,
    reducers: {
        handleOpenAccountDialog: (state) => {
            return {...state, open: true};
        },

        handleCloseAccountDialog: (state) => {
            return {...state, open: false};
        },
    }
})

export const {handleOpenAccountDialog, handleCloseAccountDialog} = accountDialogSlice.actions;
export const selectAccountDialog = (state: RootState) => state.accountDialog;
export default accountDialogSlice.reducer;