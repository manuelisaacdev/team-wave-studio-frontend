import api from "./api";
import AbstractService from "./AbstractService";
import Music, { MusicDTO, ReleaseType } from "@/interfaces/Music";

export interface QueryMusic {
    name?: string,
    artistId: string,
    available?: boolean,
    musicalGenreId?: string,
    releaseType?: ReleaseType,
}

export default class MusicService extends AbstractService<Music, QueryMusic, MusicDTO> {
    constructor() {
        super("/musics");
    };

    create(artistId: string, musicDTO: MusicDTO) {
        return api.post<Music>(`${super.URL}/${artistId}`, musicDTO);
    }
};
