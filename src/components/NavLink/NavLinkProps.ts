import { LinkProps, LinkRestProps } from "next/link";
import { IconType } from "react-icons";

export default interface NavLinkProps extends LinkProps<LinkRestProps> {
    Icon: IconType,
    label?: string,
    open?: boolean,
    className?: string,
    linkClassName?: string,
}