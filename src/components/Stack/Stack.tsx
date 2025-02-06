import { cn } from '@/lib/utils';
import StackProps from './StackProps';

export default function Stack({children, fullWidth, spacing, itemsCenter, spaceBetween, className, component:Component="div", direction="column", ...rest}: StackProps){
    return (
        <Component {...rest} className={cn("flex", 
            fullWidth && "w-full",
            spacing && `gap-${spacing}`,
            itemsCenter && "items-center",
            spaceBetween && "justify-between",
            direction === "row" && "flex-row",
            direction === "column" && "flex-col",
            className, 
        )}>{children}</Component>
    )
};