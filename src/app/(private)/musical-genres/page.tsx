"use client";

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { GoSearch } from 'react-icons/go';
import { TbCategory } from 'react-icons/tb';
import { IoTrashOutline } from 'react-icons/io5';

import { useError, useSelectSession } from '@/hooks';
import MusicalGenre from '@/interfaces/MusicalGenre';
import TableColumn from '@/components/Table/TableColumn';
import ArtistMusicalGenre from '@/interfaces/ArtistMusicalGenre';
import { Button, IconButton, Stack, Table, TextField } from '@/components';
import ArtistMusicalGenreService from '@/services/ArtistMusicalGenreService';
import AddMusicalGenreDialog from '@/components/AddMusicalGenreDialog/AddMusicalGenreDialog';

const artistMusicalGenreService = new ArtistMusicalGenreService();

export default function MusicalGenres() {
    const error = useError();
    const {artist: {id}} = useSelectSession();
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const columnDefinition = buildColumnDefinition(handleRemoveMusicalGender);
    const [artistMusicalGenres, setArtistMusicalGenres] = useState<ArtistMusicalGenre[]>([]);
    const [openAddMusicalGenreDialog, setOpenAddMusicalGenreDialog] = useState<boolean>(false);

    function handleAddMusicalGender(musicalGenre:MusicalGenre, onFinally: () => void) {
        artistMusicalGenreService.create(id, musicalGenre.id).then(response => {
            setArtistMusicalGenres(prevState => prevState.concat(response.data));
        }).catch(error).finally(onFinally)
    }

    function handleRemoveMusicalGender(artistMusicalGenre:ArtistMusicalGenre, onFinally: () => void) {
        artistMusicalGenreService.delete(artistMusicalGenre.id).then(() => {
            setArtistMusicalGenres(prevState => prevState.filter(m => m.id !== artistMusicalGenre.id));
        }).catch(error).finally(onFinally)
    }

    useEffect(() => {
        setLoading(true);
        artistMusicalGenreService.findAll({artistId: id}).then(response => {
            setArtistMusicalGenres(response.data);
        }).catch(error).finally(function() {
            setLoading(false);
        });
    }, []);

    return (
        <Stack className='gap-5 p-5 h-full overflow-hidden'>
            <Stack direction='row' className='justify-between items-center'>
                <Stack>
                    <h1 className='textt-sm text-gray-500 font-medium'>Gêneros Musicais</h1>
                    <p className='text-xs text-gray-500'>Há {artistMusicalGenres.length || 0} gêneros musicais no total.</p>
                </Stack>

                <Stack direction='row' className='gap-5 items-center'>
                    <TextField type='search' startIcon={GoSearch} placeholder='Pesquisar...' className='w-screen max-w-sm' onChange={evt => setQuery(evt.currentTarget.value)} />

                    <Button size='large' roundedLarger onClick={() => setOpenAddMusicalGenreDialog(true)} startIcon={TbCategory}>Adicionar</Button>
                    <AddMusicalGenreDialog artistMusicalGenres={artistMusicalGenres} open={openAddMusicalGenreDialog} handleClose={() => setOpenAddMusicalGenreDialog(false)} handleAddMusicalGenre={handleAddMusicalGender} />
                </Stack>
            </Stack>
            <Table 
                showSelection
                loading={loading}
                columns={columnDefinition}
                data={artistMusicalGenres.filter(m => m.musicalGenre.name.toLowerCase().includes(query.toLowerCase()))}
            />
        </Stack>
    )
}

function buildColumnDefinition(handleRemoveMusicalGender: (artistMusicalGenre:ArtistMusicalGenre, onFinally: () => void) => void) {
    const columns: TableColumn[] = [
        {
            title: "Nome",
            field: "name", 
            message: "Nome do gênero musical",
            render: (artistMusicalGenre: ArtistMusicalGenre) => <h2 className='text-sm text-gray-500 font-light'>{artistMusicalGenre.musicalGenre.name}</h2>
        },
        {
            title: "Adicionado Em",
            field: "createdAt", 
            placement: "center",
            message: "Data de registro",
            render: (artistMusicalGenre: ArtistMusicalGenre) => <span className='text-sm text-gray-500 font-light'>{dayjs(artistMusicalGenre.createdAt).format("DD/MM/YYYY - HH:mm")}</span>
        },
        {
            title: "Acções",
            field: "actions",
            message: "Gerencie os seus gêneros musicais",
            placement: "center", 
            render: (artistMusicalGenre: ArtistMusicalGenre) => {
                const [loading, setLoading] = useState(false);
                function onClick(evt:React.MouseEvent<HTMLButtonElement>) {
                    evt.preventDefault();
                    setLoading(true);
                    handleRemoveMusicalGender(artistMusicalGenre, () => setLoading(false));
                }
                return (
                    <Stack direction='row' className='items-center justify-center'>
                        <IconButton onClick={onClick} className='text-gray-700 text-lg hover:text-red-400 hover:bg-red-400/5'>
                            {loading ? <ClipLoader size={18} color={"#6b7280"}/> : <IoTrashOutline className='text-xl'/>}
                        </IconButton>
                    </Stack>
                )
            }
        }
    ];

    return columns;
}