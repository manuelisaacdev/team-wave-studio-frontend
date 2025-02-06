"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import NavLinkProps from "./NavLinkProps";
import { usePathname } from "next/navigation";

export default function NavLink({label, open, Icon, linkClassName, href, className, ...rest}:NavLinkProps) {
    const pathname = usePathname();
    const active = href === pathname;
    
    return (
        <li className={cn("flex gap-3 items-center h-10 [&>span]:opacity-0 [&:hover>span]:opacity-100 [&:hover>a]:bg-blue-400/5", className, open && "w-full", active && '[&>span]:opacity-100 [&:>a]:text-blue-400 [&:>a]:bg-blue-400/5')}>
            <span className={cn('inline-block w-1.5 h-full bg-primary rounded-r', !open && "hidden")}></span>
            <Link {...rest} href={href} className={cn('flex gap-3 items-center h-full flex-grow text-gray-500 font-light text-sm rounded-lg px-3', linkClassName, active && 'bg-blue-400/5')}>
                <Icon className='text-lg'/>
                {open && label}
            </Link>
        </li>
    );
}