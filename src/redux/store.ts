import { configureStore } from '@reduxjs/toolkit';
import sessionSlicer from './slicer/sessionSlicer';
import sidebarSlicer from './slicer/sidebarSlicer';
import socialMediaSlicer from './slicer/socialMediaSlicer';
import notificationSlicer from './slicer/notificationSlicer';
import artistDialogSlicer from './slicer/artistDialogSlicer';
import accountDialogSlicer from './slicer/accountDialogSlicer';
import socialMediaDialogSlicer from './slicer/socialMediaDialogSlicer';
import artistMusicalGenresSlicer from './slicer/artistMusicalGenresSlicer';

export const makeStore = () => {
    return configureStore({
        reducer: {
            session: sessionSlicer,
            sidebar: sidebarSlicer,
            socialMedia: socialMediaSlicer,
            artistDialog: artistDialogSlicer,
            notification: notificationSlicer,
            accountDialog: accountDialogSlicer,
            socialMediaDialog: socialMediaDialogSlicer,
            artistMusicalGenres: artistMusicalGenresSlicer,
        }
    });
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']