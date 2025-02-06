import MusicalGenre from "@/interfaces/MusicalGenre";

export default interface ToggleMusicalGenreDialogProps {
    open?: boolean,
    handleClose?: () => void,
    addedMusicalGenres?: MusicalGenre[],    
    handleAddMusicalGenre?: (musicalGenre:MusicalGenre, stopLoading: () => void) => void
    handleRemoveMusicalGenre?: (musicalGenre:MusicalGenre, stopLoading: () => void) => void
}