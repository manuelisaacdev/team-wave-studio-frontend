import { HTMLProps } from "react";
import { FormatStyleName } from "javascript-time-ago";

export default interface TimeAgoProps extends HTMLProps<HTMLSpanElement> {
    date?: string,
    locale?: string,
    formatStyleName?: FormatStyleName
}