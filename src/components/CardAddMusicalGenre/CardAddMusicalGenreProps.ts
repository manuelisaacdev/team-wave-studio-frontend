import MusicalGenre from "@/interfaces/MusicalGenre";

export default interface CardAddMusicalGenreProps {
    added?: boolean,
    musicalGenres: MusicalGenre,
    handleAddMusicalGenre?: (musicalGenre:MusicalGenre, stopLoading: () => void) => void,
    handleRemoveMusicalGenre?: (musicalGenre:MusicalGenre, stopLoading: () => void) => void,
}