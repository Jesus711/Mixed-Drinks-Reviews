import React from 'react'
import { Skeleton } from './ui/skeleton'

const Loading = ({ message = "Loading" }: { message?: string }) => {
    return (
        <div className="flex justify-center items-end gap-x-2">
            <h2 className="lg:text-3xl text-xl font-semibold italic text-blue-200 ">{message}</h2>
            <Skeleton className="md:w-3 w-2 md:h-3 h-2 rounded-full animate-dot-bounce bg-blue-200" style={{ animationDelay: '0s' }} />
            <Skeleton className="md:w-3 w-2 md:h-3 h-2 rounded-full animate-dot-bounce bg-blue-200" style={{ animationDelay: '0.2s' }} />
            <Skeleton className="md:w-3 w-2 md:h-3 h-2 rounded-full animate-dot-bounce bg-blue-200" style={{ animationDelay: '0.4s' }} />
        </div>
    )
}

export default Loading