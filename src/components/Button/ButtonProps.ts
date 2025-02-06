import { IconType } from "react-icons";

export default interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    primary?: boolean,
    endIcon?: IconType,
    fullWidth?: boolean,
    startIcon?: IconType,
    roundedLarger?: boolean,
    children?: React.ReactNode,
    component?: React.ElementType,
    size?: "small" | "medium" | "large",
}