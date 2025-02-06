import api from "./api";
import Privacy from "@/interfaces/Privacy";
import AbstractService from "./AbstractService";
import Album, { AlbumDTO, AlbumType } from "@/interfaces/Album";

export interface QueryAlbum {
    name?: string,
    artistId?: string,
    privacy?: Privacy,
    albumType?: AlbumType,
}

export default class AlbumService extends AbstractService<Album, QueryAlbum, AlbumDTO> {
    constructor(){
        super("/albums");
    };

    create(artistId: string, albumDTO: AlbumDTO) {
        return api.post<Album>(`${super.URL}/${artistId}`, albumDTO);
    };
};
