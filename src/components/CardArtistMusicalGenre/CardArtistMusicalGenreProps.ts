import ArtistMusicalGenre from "@/interfaces/ArtistMusicalGenre";

export default interface CardArtistMusicalGenreProps {
    artistMusicalGenre: ArtistMusicalGenre,
    handleRemoveMusicalGenre: (artistMusicalGenre:ArtistMusicalGenre, onFinish: () => void) => void
}