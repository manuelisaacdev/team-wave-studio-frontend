import Faixa from "./Faixa";
import Label from "./Label";
import Privacy from "./Privacy";
import AlbumMusicalGenre from "./AlbumMusicalGenre";

export enum AlbumType {
    SINGLE="SINGLE",
    EP="EP",
    STUDIO="STUDIO",
    COLLECTION="COLLECTION",
    REMIX="REMIX",
    COMPILATION="COMPILATION",
    LIVE="LIVE",
    OTHER="OTHER",
}

export interface AlbumDTO {
    name: string,
    description: string,
    releaseDate: string,
    privacy: string | Privacy,
    albumType: string | AlbumType,
}

export default interface Album {
    id: string, 
    name: string, 
    releaseDate: string, 
    privacy: Privacy,
    albumType: AlbumType, 
    featured: string,
    createdAt: string, 
    updatedAt: string, 
    reproductions: number, 
    likes: number,
    dislikes: number, 
    loves: number,
    galleries: number, 
    cover: string, 
    artistId: string, 
    description: string, 
    labels?: Label[], 
    faixas?: Faixa[],
    albumMusicalGenres?: AlbumMusicalGenre[], 
}