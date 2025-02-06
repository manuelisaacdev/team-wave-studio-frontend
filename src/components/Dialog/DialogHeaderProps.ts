export default interface DialogHeaderProps extends React.HTMLProps<HTMLDivElement> {
    title?: string,
    loading?: boolean,
    handleClose?: () => void,
    children?: React.ReactNode,
    afterAction?: React.ReactElement,
}