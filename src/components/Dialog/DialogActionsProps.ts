export default interface DialogActionsProps extends React.HTMLProps<HTMLDivElement> {
    loading?: boolean,
    handleClose?: () => void,
    showButtonSubmit?: boolean,
}