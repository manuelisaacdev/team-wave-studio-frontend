import MusicalGenre from "./MusicalGenre";

export default interface ArtistMusicalGenre {
    id: string,
    artistId: string,
    createdAt: string,
    musicalGenre: MusicalGenre,
}