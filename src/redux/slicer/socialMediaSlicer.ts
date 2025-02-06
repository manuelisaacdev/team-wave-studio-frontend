import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import SocialMedia from '@/interfaces/SocialMedia';

export const socialMediaSlice = createSlice({
    name: 'socialMedia',
    initialState: [] as SocialMedia[],
    reducers: {
        handleChangeSocialMidia: (state, { payload }: PayloadAction<SocialMedia[]>) => {
            return payload;
        },

        addSocialMidia: (state, { payload }: PayloadAction<SocialMedia>) => {
            return state.concat(payload);;
        },

        updateSocialMidia: (state, { payload: {id, url, socialMediaType} }: PayloadAction<SocialMedia>) => {
            return state.map(m => m.id === id ? ({...m, url, socialMediaType}) : m);;
        },

        removeSocialMidia: (state, { payload }: PayloadAction<SocialMedia>) => {
            return state.filter(s => s.id !== payload.id);
        },
    }
});

export const {handleChangeSocialMidia, addSocialMidia, updateSocialMidia, removeSocialMidia} = socialMediaSlice.actions;
export const selectSocialMedia = (state: RootState) => state.socialMedia;
export default socialMediaSlice.reducer;