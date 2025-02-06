import Playlist from "@/interfaces/Playlist";

export default interface CardPlaylistProps {
    playlist: Playlist,
    placementTop?: boolean,
    handleToUpdatePlaylist?: (playlist: Playlist) => void,
    handleRemovePlaylist?: (playlist: Playlist, onFinish: () => void) => void,
    handleUpdateCover?: (playlist: Playlist, file: File, onFinish: () => void) => void,
}