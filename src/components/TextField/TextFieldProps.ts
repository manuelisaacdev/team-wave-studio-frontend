import { IconType } from "react-icons";

export default interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
    label?: string,
    error?: boolean,
    focus?: boolean,
    message?: string,
    endIcon?: IconType,
    fullWidth?: boolean
    startIcon?: IconType,
    labelClassName?: string,
    messageClassName?: string,
    wapperInputClassName?: string,
    endAction?: React.ReactElement,
    endActionPlacement?: "inner" | "out" 
    type?: Extract<React.HTMLInputTypeAttribute, "text" | "email" | "password" | "search" | "number" | "date" | "file">,
}