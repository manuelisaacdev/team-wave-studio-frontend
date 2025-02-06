import api from "./api";
import AlbumMusicalGenre, { AlbumMusicalGenreDTO } from "@/interfaces/AlbumMusicalGenre";

export default class AlbumMusicalGenreService {
    private static URL = "/albums/musical-genres";

    create(albumMusicalGenreDTO: AlbumMusicalGenreDTO) {
        return api.post<AlbumMusicalGenre>(AlbumMusicalGenreService.URL, albumMusicalGenreDTO);
    }
    
    delete(albumMusicalGenreId: string) {
        return api.delete<void>(`${AlbumMusicalGenreService.URL}/${albumMusicalGenreId}`);
    }
};
