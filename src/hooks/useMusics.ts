import { useEffect, useState } from 'react';

import useError from './useError';
import Music from '@/interfaces/Music';
import { useAppSelector } from '@/redux/hooks';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import Pagination, { PageRequest } from '@/interfaces/Pagination';
import MusicService, { QueryMusic } from '@/services/MusicService';

const musicService = new MusicService();

export default function useMusics() {
    const handleError = useError();
    const [total, setTotal] = useState<number>(0);
    const {artist: {id}} = useAppSelector(selectSession);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<Pagination<Music>>();
    const [pageRequest, setPageRequest] = useState<PageRequest & QueryMusic>({page: 0, size: 10, artistId: id});

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            musicService.count({artistId: id}),
            musicService.pagination(pageRequest),
        ]).then(responses => {
            setIsError(false);
            setTotal(responses[0].data);
            setPagination(responses[1].data);
        }).catch(error => {
            setIsError(true);
            handleError(error);
        }).finally(() => setIsLoading(false));
    }, [pageRequest]);

    return {
        total,
        isError,
        setTotal,
        isLoading,
        pagination,
        pageRequest,
        setPagination,
        setPageRequest,
    };
}
