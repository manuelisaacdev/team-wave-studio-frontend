import { useEffect, useState } from 'react';

import useError from './useError';
import Playlist from '@/interfaces/Playlist';
import { useAppSelector } from '@/redux/hooks';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import Pagination, { PageRequest } from '@/interfaces/Pagination';
import PlaylistService, { QueryPlaylist } from '@/services/PlaylistService';

const playlistService = new PlaylistService();

export default function usePlaylists() {
    const handleError = useError();
    const [total, setTotal] = useState<number>(0);
    const {artist: {id}} = useAppSelector(selectSession);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<Pagination<Playlist>>();
    const [pageRequest, setPageRequest] = useState<PageRequest & QueryPlaylist>({page: 0, size: 10, artistId: id});

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            playlistService.count({artistId: id}),
            playlistService.pagination(pageRequest),
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
