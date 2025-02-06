import { ElementType } from "react";

export default interface StackProps extends React.HTMLAttributes<HTMLOrSVGElement> {
    spacing?: number,
    fullWidth?: boolean,
    itemsCenter?: boolean,
    spaceBetween?: boolean,
    component?: ElementType,
    children?: React.ReactNode,
    direction?: "row" | "column",
}