import React from 'react'
import WeekProps from './WeekProps'

export default function Week({day}:WeekProps) {
    return (
        <div className='flex justify-center items-center w-8 h-8 text-sm text-gray-500 font-medium'>{day}</div>
    )
}
