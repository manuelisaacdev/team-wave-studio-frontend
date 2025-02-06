import { useEffect } from 'react';
import useError from './useError';
import UserService from '@/services/UserService';
import ArtistService from '@/services/ArtistService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import SocialMediaService from '@/services/SocialMediaService';
import AuthenticationService from '@/services/AuthenticationService';
import { handleChangeSocialMidia } from '@/redux/slicer/socialMediaSlicer';
import { handleChangeArtist, handleChangeUser, selectSession } from '@/redux/slicer/sessionSlicer';

interface UseAppSession {
    onError: () => void,
    onFetch: () => void,
    onSuccess: () => void,
}

const userService = new UserService();
const artistService = new ArtistService();
const socialMediaService = new SocialMediaService();
const authenticationService = new AuthenticationService();

export default function useAppSession({onSuccess, onError, onFetch}:UseAppSession) {
    const handleError = useError();
    const dispatch = useAppDispatch();
    const session = useAppSelector(selectSession);
    useEffect(() => {
        authenticationService.getSession().then(response => {
            onFetch();
            const { userId, artistId } = response.data;
            Promise.all([
                userService.findById(userId),
                artistService.findById(artistId),
                socialMediaService.findAll({artistId}),
            ]).then(responses => {
                dispatch(handleChangeUser(responses[0].data));
                dispatch(handleChangeArtist(responses[1].data));
                dispatch(handleChangeSocialMidia(responses[2].data));
                onSuccess();
            }).catch(error => {
                onError();
                handleError(error);
            });
        }).catch(error => {
            onError();
            handleError(error);
        });
    }, []);
    
    return session;
}
