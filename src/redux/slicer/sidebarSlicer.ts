import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface InitialState {
    open?: boolean,
}

const initialState: InitialState = {
    open: true,
}

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        handleOpenSidebar: (state) => {
            return {...state, open: true};
        },

        handleCloseSidebar: (state) => {
            return {...state, open: false};
        },

        handleToggleSidebar: (state) => {
            return {...state, open: !state.open};
        },
    }
})

export const { handleOpenSidebar, handleCloseSidebar, handleToggleSidebar} = sidebarSlice.actions;
export const selectSidebar = (state: RootState) => state.sidebar;
export default sidebarSlice.reducer;