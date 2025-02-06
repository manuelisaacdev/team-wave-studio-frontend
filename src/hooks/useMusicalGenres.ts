import { useEffect, useState } from 'react';

import useError from './useError';
import { Sort } from '@/interfaces/Pagination';
import MusicalGenre from '@/interfaces/MusicalGenre';
import MusicalGenreService, { QueryMusicalGenre } from '@/services/MusicalGenreService';

const musicalGenreService = new MusicalGenreService();

export default function useMusicalGenres() {
    const handleError = useError();
    const [data, setata] = useState<MusicalGenre[]>();
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<QueryMusicalGenre & Sort>({});

    useEffect(() => {
        setIsLoading(true);
        musicalGenreService.findAll(query).then(response => {
            setIsError(false);
            setata(response.data);
        }).catch(error => {
            setIsError(true);
            handleError(error);
        }).finally(() => setIsLoading(false));
    }, [query]);

    return {
        data,
        isError,
        setQuery,
        isLoading,
    };
}
