import api from "./api";
import AbstractService from "./AbstractService";
import Artist, { ArtistDTO } from "@/interfaces/Artist";

interface QueryArtist {
    name?: string,
}

export default class ArtistService extends AbstractService<Artist, QueryArtist, ArtistDTO> {

    constructor(){
        super("/artists")
    };
    
    findByUserId(userId: string) {
        return api.get<Artist>(`${super.URL}/user/${userId}`);
    }
    
};
