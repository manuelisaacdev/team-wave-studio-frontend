import api from "./api";
import AbstractService from "./AbstractService";
import ArtistMusicalGenre from "@/interfaces/ArtistMusicalGenre";

export interface QueryArtistMusicalGenre {
    name?: string,
    artistId?: string,
}

export default class ArtistMusicalGenreService extends AbstractService<ArtistMusicalGenre, QueryArtistMusicalGenre, Object> {

    constructor() {
        super("/musical-genres/artists");
    }
    
    create(artistId: string, musicalGenreId: string) {
        return api.post<ArtistMusicalGenre>(`${super.URL}/${artistId}/${musicalGenreId}`);
    }
        
};
