"use client";

import { useEffect } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { MdOutlineFirstPage, MdOutlineLastPage } from 'react-icons/md';

import { cn } from '@/lib/utils';
import PaginationProps from './PaginationProps';
import { IconButton, Stack } from '@/components';

export default function Pagination({totalPages=0, currentPage=1, showMax=8, onPageChange, className, ...rest}:PaginationProps) {
    function getPageNumbers() {
        const pages = [];
        const half = Math.floor(showMax / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(totalPages, currentPage + half);
    
        if (currentPage <= half) {
            end = Math.min(totalPages, showMax);
        } else if (currentPage + half > totalPages) {
            start = Math.max(1, totalPages - showMax + 1);
        }
    
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    function handlePageChange(page: number) {
        if (page > 0 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    }

    useEffect(() => {
        if (totalPages === 0) {
            onPageChange(1);
        }
    }, [totalPages]);

    return (
        <Stack {...rest} direction='row' className={cn('gap-5 justify-center items-center', className)}>
            
            <IconButton onClick={() => handlePageChange(1)} className='bg-blue-400/5 text-blue-400 hover:text-white hover:bg-blue-400' disabled={currentPage === 1 || totalPages == 0}>
                <MdOutlineFirstPage />
            </IconButton>

            <IconButton onClick={() => handlePageChange(currentPage - 1)} className='bg-blue-400/5 text-blue-400 hover:text-white hover:bg-blue-400' disabled={currentPage === 1 || totalPages == 0}>
                <IoChevronBack />
            </IconButton>

            {getPageNumbers().map(page => (
                <IconButton onClick={() => handlePageChange(page)} className={cn('text-sm bg-blue-400/5 text-blue-400 hover:text-white hover:bg-blue-400', currentPage === page && "text-white bg-blue-400")} key={page}>
                    <span>{page}</span>
                </IconButton>
            ))}

            <IconButton onClick={() => handlePageChange(currentPage + 1)} className='bg-blue-400/5 text-blue-400 hover:text-white hover:bg-blue-400' disabled={currentPage === totalPages || totalPages == 0}>
                <IoChevronForward />
            </IconButton>
            
            <IconButton onClick={() => handlePageChange(totalPages)} className='bg-blue-400/5 text-blue-400 hover:text-white hover:bg-blue-400' disabled={currentPage === totalPages || totalPages == 0}>
                <MdOutlineLastPage />
            </IconButton>
        </Stack>
    );
}