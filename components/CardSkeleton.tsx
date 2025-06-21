import React from 'react'
import { Skeleton } from './ui/skeleton'

const CardSkeleton = () => {
  return (
    <div className="w-[350px] max-w-sm h-[350px] flex flex-col justify-center items-center space-y-4 border-gray-600 border-4 p-2 rounded-xl shadow-sm shadow-blue-300">
      <div className='flex justify-between items-center space-x-3'>
        <div className='space-y-2'>
          <Skeleton className="flex-1 h-5 w-[200px]" />
          <Skeleton className='h-5 w-40' />
        </div>
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>

      <Skeleton className="w-[90%] h-[90%] rounded-md" />
      <Skeleton className="h-5 w-[200px]" />
      <Skeleton className="h-5 w-[200px]" />
    </div>
  )
}

export default CardSkeleton