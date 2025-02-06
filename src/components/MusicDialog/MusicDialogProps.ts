import Music from "@/interfaces/Music";

export default interface MusicDialogProps {
    open?: boolean,
    music?: Music,
    handleClose?: () => void,
    onCreate?: (Music:Music) => void,
    onUpdate?: (Music:Music) => void,
}