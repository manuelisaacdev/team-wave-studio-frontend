import React, { forwardRef } from 'react';

import { FiCheck } from 'react-icons/fi';

import styles from './Checkbox.module.css';

import { cn } from '@/lib/utils';
import CheckboxProps from './CheckboxProps';


const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({className, ...rest}, ref) => {
    return (
        <div className={cn('relative flex justify-center items-center text-white w-6 h-6 border border-primary rounded-md has-[input:checked]:bg-primary transition-all', className, styles.checkbox)}>
            <input type="checkbox" ref={ref} {...rest} style={{all: "unset", position: "absolute", inset: 0, zIndex: 10, borderRadius: "inherit", backgroundColor: "transparent", cursor: "pointer"}}/>
            <FiCheck className='text-xl transition-all' />
        </div>
    )
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;