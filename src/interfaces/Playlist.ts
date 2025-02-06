import Privacy from "./Privacy";

export interface MusicPlaylist {
    id: string, 
    duration: number, 
    createdAt: string, 
    musicId: string, 
    cover?: string
}

export interface PlaylistDTO {
    name: string,
    privacy: string,
    description?: string,
}

export default interface Playlist {
    id: string,
    name: string,
    cover?: string, 
    userId: string, 
    privacy: Privacy,
    createdAt: string,
    updatedAt: string,
    description?: string,
    likes: number, 
    loves: number, 
    dislikes: number, 
    galleries: number,
    reproductions: number, 
    musicsPlaylist: MusicPlaylist[],
}