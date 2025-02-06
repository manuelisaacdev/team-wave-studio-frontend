import React, { forwardRef } from 'react'
import WrapperProps from './WrapperProps'

const Wrapper = forwardRef<HTMLSpanElement, WrapperProps>(({children, ...props}, ref) => {
    return (
        <span {...props} ref={ref} aria-describedby='data-wrapper'>{children}</span>
    )
});

Wrapper.displayName = 'Wrapper';

export default Wrapper;
