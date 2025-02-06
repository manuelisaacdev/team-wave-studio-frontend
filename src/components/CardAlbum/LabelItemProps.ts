import Label from "@/interfaces/Label";

export default interface LabelItemProps {
    label: Label,
    handleClose: () => void,
    handleToUpdateLabel: (label:Label) => void,
    handleDeleteLabel: (label:Label, onFinish: () => void) => void,
}