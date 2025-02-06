import Album from "@/interfaces/Album";
import Label from "@/interfaces/Label";

export default interface LabelDialogProps {
    open?: boolean,
    label?: Label,
    album: Album,
    handleClose?: () => void,
    onCreateLabel?: (label:Label) => void,
    onUpdateLabel?: (label:Label) => void,
}