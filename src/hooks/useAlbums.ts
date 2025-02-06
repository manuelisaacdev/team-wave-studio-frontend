import { useEffect, useState } from 'react';

import useError from './useError';
import Album from '@/interfaces/Album';
import { useAppSelector } from '@/redux/hooks';
import { selectSession } from '@/redux/slicer/sessionSlicer';
import Pagination, { PageRequest } from '@/interfaces/Pagination';
import AlbumService, { QueryAlbum } from '@/services/AlbumService';

const albumService = new AlbumService();

export default function useAlbums() {
    const handleError = useError();
    const [total, setTotal] = useState<number>(0);
    const {artist: {id}} = useAppSelector(selectSession);
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<Pagination<Album>>();
    const [pageRequest, setPageRequest] = useState<PageRequest & QueryAlbum>({page: 0, size: 10, artistId: id});

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            albumService.count({artistId: id}),
            albumService.pagination(pageRequest),
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
