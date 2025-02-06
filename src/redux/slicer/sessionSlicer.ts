import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import Artist from '@/interfaces/Artist';
import User from '@/interfaces/User';
import FileUploaded from '@/interfaces/FileUploaded';

interface InitialState {
    user: User,
    artist: Artist,
}

export const sessionSlice = createSlice({
    name: 'sidebar',
    initialState: {} as InitialState,
    reducers: {
        handleChangeUser: (state, { payload }: PayloadAction<User>) => {
            return {...state, user: payload};
        },

        handleChangeUserProfilePicture: (state, { payload: {filename} }: PayloadAction<FileUploaded>) => {
            return {...state, user: {...state.user, profilePicture: filename}};
        },

        handleChangeUserCoverPicture: (state, { payload: {filename} }: PayloadAction<FileUploaded>) => {
            return {...state, user: {...state.user, coverPicture: filename}};
        },

        handleChangeArtist: (state, { payload }: PayloadAction<Artist>) => {
            return {...state, artist: payload};
        },
    }
})

export const { handleChangeUser, handleChangeUserProfilePicture, handleChangeUserCoverPicture, handleChangeArtist } = sessionSlice.actions;
export const selectSession = (state: RootState) => state.session;
export default sessionSlice.reducer;