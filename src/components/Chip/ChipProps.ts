import { IconType } from "react-icons";

export type ChipVariant = "info" | "success" | "warning" | "error";

export default interface ChipProps {
    label?: string,
    startIcon?: IconType,
    onClose?: () => void,
    variant?: ChipVariant,
}