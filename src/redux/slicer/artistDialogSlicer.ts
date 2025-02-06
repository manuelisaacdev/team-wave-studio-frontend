import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface InitialState {
    open?: boolean,
}

const initialState: InitialState = {
    open: false,
}

export const artistDialogSlice = createSlice({
    name: 'artistDialog',
    initialState,
    reducers: {
        handleOpenArtistDialog: (state) => {
            return {...state, open: true};
        },

        handleCloseArtistDialog: (state) => {
            return {...state, open: false};
        },
    }
})

export const {handleOpenArtistDialog, handleCloseArtistDialog} = artistDialogSlice.actions;
export const selectArtistDialog = (state: RootState) => state.artistDialog;
export default artistDialogSlice.reducer;