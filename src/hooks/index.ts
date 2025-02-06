import useTabs from "./useTabs";
import useError from "./useError";
import useMusics from "./useMusics";
import useAlbums from "./useAlbums";
import useRegister from "./useRegister";
import usePlaylists from "./usePlaylists";
import useCountries from "./useCountries";
import useAppSession from "./useAppSession";
import useNotification from "./useNotification";
import useAuthenticate from "./useAuthenticate";
import useConfirmation from "./useConfirmation";
import useMusicalGenres from "./useMusicalGenres";
import useSelectSession from "./useSelectSession";
import usePaginationMusicalGenres from "./usePaginationMusicalGenres";
import { useAppDispatch, useAppSelector, useAppStore } from "@/redux/hooks";

export {
    useTabs,
    useError,
    useAlbums,
    useMusics,
    useAppStore,
    useRegister,
    useCountries,
    usePlaylists, 
    useAppSession,
    useAppDispatch, 
    useAppSelector,
    useAuthenticate,
    useConfirmation,
    useNotification,
    useSelectSession,
    useMusicalGenres,
    usePaginationMusicalGenres,
};