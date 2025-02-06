export default interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
    label?: string,
    error?: boolean,
    message?: string,
    fullWidth?: boolean
    labelProps?: React.HTMLProps<HTMLLabelElement>,
    messageProps?: React.HTMLProps<HTMLParagraphElement>,
}