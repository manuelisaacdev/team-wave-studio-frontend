import Album from "@/interfaces/Album";

export default interface CardAlbumProps {
    album: Album,
    placementTop?: boolean,
    onUpdate?: (album: Album) => void,
    handleToUpdateAlbum?: (album: Album) => void,
    handleRemoveAlbum?: (album: Album, onFinish: () => void) => void,
    handleUpdateCover?: (album: Album, file: File, onFinish: () => void) => void,
}