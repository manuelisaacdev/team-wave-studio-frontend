import CheckboxProps from "../Checkbox/CheckboxProps";
import RadioProps from "../Radio/RadioProps";

export default interface FormControlLabelProps extends React.HTMLProps<HTMLLabelElement> {
    label?: string,
    labelPlacement?: 'start' | 'end',
    controlProps?: RadioProps | CheckboxProps,
    control: React.ReactElement,
}