import React from 'react'
import { Skeleton } from './ui/skeleton'

const CardSkeleton = () => {
  return (
    <div className="w-[350px] h-[350px] flex flex-col justify-center items-center space-y-4">
      <div className='flex justify-between items-center space-x-3'>
        <div className='space-y-2'>
          <Skeleton className="flex-1 h-5 w-[200px]" />
          <Skeleton className='h-5 w-40' />
        </div>
        <Skeleton className="h-12 w-25 rounded-md" />
      </div>

      <Skeleton className="w-[90%] h-[90%] rounded-md" />
      <Skeleton className="h-6 w-[200px]" />
    </div>
  )
}

export default CardSkeleton