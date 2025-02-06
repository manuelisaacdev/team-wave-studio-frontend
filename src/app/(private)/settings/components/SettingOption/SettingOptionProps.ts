import { IconType } from "react-icons";

export default interface SettingOptionProps {
    value: string,
    label: string,
    icon?: IconType,
    selected?: boolean,
    description: string,
    onSelect: (value: string) => void,
}