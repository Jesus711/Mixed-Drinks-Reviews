import React from 'react'
import { Skeleton } from './ui/skeleton'

const Loading = ({ message = "Loading" }: { message?: string }) => {
    return (
        <div className="flex justify-center items-end gap-x-2">
            <h2 className="text-5xl font-semibold italic text-blue-200 ">{message}</h2>
            <Skeleton className="w-3 h-3 rounded-full animate-dot-bounce bg-blue-200" style={{ animationDelay: '0s' }} />
            <Skeleton className="w-3 h-3 rounded-full animate-dot-bounce bg-blue-200" style={{ animationDelay: '0.2s' }} />
            <Skeleton className="w-3 h-3 rounded-full animate-dot-bounce bg-blue-200" style={{ animationDelay: '0.4s' }} />
        </div>
    )
}

export default Loading