import Album from "@/interfaces/Album";

export default interface AlbumDialogProps {
    open?: boolean,
    album?: Album,
    handleClose?: () => void,
    onCreate?: (Album:Album) => void,
    onUpdate?: (Album:Album) => void,
}