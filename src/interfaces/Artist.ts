export enum Status {
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE",
    BANNED="BANNED",
    BLOCKED="BLOCKED",
}

export enum Popularity {
    LOWEST="LOWEST",
    LOW="LOW",
    MEDIUM="MEDIUM",
    HIGH="HIGH",
    HIGHEST="HIGHEST"
}

export interface ArtistDTO {
    name: string,
    debutYear: number,
    biography: string,
}

export default interface Artist {
    id: string, 
    name: string, 
    verified: boolean, 
    debutYear: number, 
    exercising: boolean,
    follow: boolean, 
    subscribe: boolean, 
    status: Status, 
    popularity: Popularity, 
    createdAt: string,
    updatedAt: string, 
    totalSongs: number, 
    totalAlbums: number, 
    totalPlaylists: number,
    totalEvents: number,
    totalSubscribers: number, 
    totalFollowers: number, 
    totalCollaborations: number, 
    userId: string, 
    biography: string
}

/*
id, name, verified, debutYear, exercising,
    follow, subscribe, status, popularity, createdAt,
    updatedAt, totalSongs, totalAlbums, totalPlaylists,totalEvents,
    totalSubscribers, totalFollowers, totalCollaborations, userId, biography

*/