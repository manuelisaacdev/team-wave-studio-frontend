import { ElementType } from "react";

export default interface PaperProps extends React.HTMLProps<HTMLOrSVGElement> {
    component?: ElementType,
    children?: React.ReactNode,
}