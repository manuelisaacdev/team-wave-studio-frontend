import Playlist from "@/interfaces/Playlist";

export default interface PlaylistDialogProps {
    open?: boolean,
    playlist?: Playlist,
    handleClose?: () => void,
    onCreate?: (playlist:Playlist) => void,
    onUpdate?: (playlist:Playlist) => void,
}