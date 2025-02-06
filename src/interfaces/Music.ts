export enum ReleaseType {
    EP="EP", 
    ALBUM="ALBUM", 
    SINGLE="SINGLE",
}

export interface MusicDTO {
    title: string, 
    lyrics?: string,
    description?: string,
    releaseDate: string,
    releaseType: string,
    musicalGenreId: string, 
}

export default interface Music {
    id: string, 
    title: string, 
    duration?: number, 
    available: boolean, 
    releaseType: ReleaseType, 
    releaseDate: string, 
    clipId: string,
    audio: string, 
    cover: string, 
    createdAt: string, 
    updatedAt: string, 
    likes: number, 
    dislikes?: string, 
    loves?: string,
    playlists?: string, 
    reproductions?: string, 
    musicalGenreId: string, 
    musicalGenreName: string, 
    albumId?: string, 
    albumName?: string, 
    artistId: string, 
    lyrics: string,
    description: string,
}