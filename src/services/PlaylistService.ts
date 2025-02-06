import api from "./api";
import AbstractService from "./AbstractService";
import Playlist, { PlaylistDTO } from "@/interfaces/Playlist";

export interface QueryPlaylist {
    name?: string,
    artistId?: string,
    privary?: string
}

export default class PlaylistService extends AbstractService<Playlist, QueryPlaylist, PlaylistDTO> {
    
    constructor() {
        super("/playlists");
    }

    create(userId: string, playlistDTO: PlaylistDTO) {
        return api.post<Playlist>(`${super.URL}/${userId}`, playlistDTO);
    }

};
