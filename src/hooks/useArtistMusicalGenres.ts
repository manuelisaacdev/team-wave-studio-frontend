
import { useEffect, useState } from 'react';

import useError from './useError';
import { useAppSelector } from '@/redux/hooks';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import ArtistMusicalGenre from '@/interfaces/ArtistMusicalGenre';
import ArtistMusicalGenreService from '@/services/ArtistMusicalGenreService';

const artistMusicalGenreService = new ArtistMusicalGenreService();

export default function useArtistMusicalGenres() {
    const error = useError();
    const [isLoading, setIsLoading] = useState(false);
    const {artist: {id}} = useAppSelector(selectSession);
    const [artistMusicalGenres, setArtistMusicalGenres] = useState<ArtistMusicalGenre[]>([]);
    
    useEffect(() => {
        setIsLoading(true);
        artistMusicalGenreService.findAll({artistId: id}).then(response => {
            setArtistMusicalGenres(response.data);
        }).catch(error).finally(() => setIsLoading(false));
    }, []);

    return {
        isLoading,
        artistMusicalGenres,
        setArtistMusicalGenres,
    };
};