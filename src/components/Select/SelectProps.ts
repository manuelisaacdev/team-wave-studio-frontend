import TextFieldProps from "../TextField/TextFieldProps";
import OptionProps from "./OptionProps";

export default interface SelectProps {
    inputProps?: TextFieldProps,
    children?: (handleClose:() => void) => React.ReactNode,
}