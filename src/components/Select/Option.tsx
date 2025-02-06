import { cn } from '@/lib/utils';
import SelectOptionProps from './OptionProps';

export default function Option({selected, multiple, children, ...rest}:SelectOptionProps) {
    return (
        <li {...rest} className={cn('flex items-center min-h-10 relative text-gray-500 text-nowrap truncate px-3 hover:bg-white/5 cursor-pointer',
            selected && "bg-white/5"
        )}>
            {children}
        </li>
    )
}
