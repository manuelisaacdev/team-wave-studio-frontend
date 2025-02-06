import React, { forwardRef, useId } from 'react';

import { cn } from '@/lib/utils';
import TextAreaProps from './TextAreaProps';

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({label, id, fullWidth, message, error, className, labelProps, messageProps, ...rest}, ref) => {
    const inputId = id || useId();

    return (
        <div className={cn("flex gap-1.5 flex-col items-start", fullWidth && "w-full")}>
            {label && <label {...labelProps} className={cn('text-sm text-gray-500 font-medium', labelProps?.className)} htmlFor={inputId}>{label}</label>}
            <div className="w-full p-4 outline outline-1 outline-transparent has-[textarea:focus]:outline-white/20 rounded-3xl bg-white/5">
                <textarea ref={ref} id={inputId} className={cn("w-full h-20 text-sm text-gray-500 bg-transparent outline-none resize-none placeholder:text-gray-600 overflow-auto scrollbar-thin scrollbar-thumb-white/5 scroll-smooth scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-track-rounded-full", className)} {...rest} aria-describedby="input-data-text-area"></textarea>
            </div>
            {message && <p className={cn("text-gray-600 text-xs font-light w-full", messageProps?.className, error && "text-red-400")} {...messageProps}>{message}</p>}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;
