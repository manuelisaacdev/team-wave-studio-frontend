export default interface AlertProps extends React.HTMLProps<HTMLDivElement> {
    title?: string,
    solid?: boolean,
    message?: string,
    showIcon?: boolean,
    handleClose?: () => void,
    variant?: "info" | "success" | "warning" | "error",
}