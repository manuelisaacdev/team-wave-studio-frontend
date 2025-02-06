import type { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ArtistMusicalGenre from '@/interfaces/ArtistMusicalGenre';

export const artistMusicalGenresSlice = createSlice({
    name: 'artistMusicalGenres',
    initialState: [] as ArtistMusicalGenre[],
    reducers: {
        setAllArtistMusicalGenres: (state, { payload }: PayloadAction<ArtistMusicalGenre[]>) => {
            return payload;
        },
        
        addArtistMusicalGenre: (state, { payload }: PayloadAction<ArtistMusicalGenre | ArtistMusicalGenre[]>) => {
            return state.concat(payload);
        },
        
        removeArtistMusicalGenre: (state, { payload }: PayloadAction<ArtistMusicalGenre>) => {
            return state.filter(a => a.id !== payload.id);
        },
    }
})

export const { 
    addArtistMusicalGenre, 
    removeArtistMusicalGenre,
    setAllArtistMusicalGenres, 
} = artistMusicalGenresSlice.actions;
export const selectArtistMusicalGenres = (state: RootState) => state.artistMusicalGenres;
export default artistMusicalGenresSlice.reducer;