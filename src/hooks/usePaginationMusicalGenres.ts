import { useEffect, useRef, useState } from 'react';

import useError from './useError';
import MusicalGenre from '@/interfaces/MusicalGenre';
import Pagination, { PageRequest } from '@/interfaces/Pagination';
import MusicalGenreService, { QueryMusicalGenre } from '@/services/MusicalGenreService';

const musicalGenreService = new MusicalGenreService();

export default function usePaginationMusicalGenres() {
    const handleError = useError();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<Pagination<MusicalGenre>>();
    const [pageRequest, setPageRequest] = useState<PageRequest & QueryMusicalGenre>({page: 0, size: 10});

    useEffect(() => {
        setIsLoading(true);
        musicalGenreService.pagination(pageRequest).then(response => {
            setIsError(false);
            setPagination(response.data);
            scrollRef.current?.scrollTo({behavior: "smooth", top: 0, left: 0});
        }).catch(error => {
            setIsError(true);
            handleError(error);
        }).finally(() => setIsLoading(false));
    }, [pageRequest]);

    return {
        isError,
        isLoading,
        scrollRef,
        pagination,
        pageRequest,
        setPagination,
        setPageRequest,
    };
}
