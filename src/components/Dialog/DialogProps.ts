import PaperProps from "../Paper/PaperProps";

export default interface DialogProps {
    open?: boolean,
    paperProps?: PaperProps,
    handleClose?: () => void,
    children?: React.ReactNode,
    closeOnBackdropClick?: boolean,
    size?: "xsmall" | "small" | "medium" | "large" | "xlarge" | "full",
}