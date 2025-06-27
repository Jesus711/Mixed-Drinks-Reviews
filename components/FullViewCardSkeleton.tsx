import { FaRegStar } from "react-icons/fa"
import { Skeleton } from "./ui/skeleton"

const FullViewCardSkeleton = () => {

    return (
        <div className="min-w-2xl flex flex-col space-y-8 border-gray-600 border-4 p-2 rounded-xl shadow-sm shadow-blue-300">
            {/* Header */}
            <div className='w-full flex justify-between items-center space-x-3 px-3'>
                <div className='space-y-2'>
                    <Skeleton className="flex-1 h-5 w-[200px]" />
                    <Skeleton className='h-5 w-40' />
                </div>
                <div className="flex">
                    <FaRegStar className="w-10 h-10 animate-pulse-fast text-blue-200" />
                    <FaRegStar className="w-10 h-10 animate-pulse-fast text-blue-200" />
                    <FaRegStar className="w-10 h-10 animate-pulse-fast text-blue-200" />
                    <FaRegStar className="w-10 h-10 animate-pulse-fast text-blue-200" />
                    <FaRegStar className="w-10 h-10 animate-pulse-fast text-blue-200" />
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-y-10">
                <div className="w-full flex px-4 justify-center gap-x-10">
                    {/* Image */}
                    <Skeleton className="w-[300px] h-[300px] rounded-md" />
                    <div className="flex flex-col items-center gap-y-6">
                        <Skeleton className="w-60 h-7 rounded-md" />
                        <ul className="flex-1 text-left flex flex-col items-center gap-y-8">
                            <li className="flex gap-x-2 items-center"><Skeleton className="w-50 h-5" /><Skeleton className="w-2 h-1 rounded-none" /><Skeleton className="w-20 h-5" /></li>
                            <li className="flex gap-x-2 items-center"><Skeleton className="w-50 h-5" /><Skeleton className="w-2 h-1 rounded-none" /><Skeleton className="w-20 h-5" /></li>
                            <li className="flex gap-x-2 items-center"><Skeleton className="w-50 h-5" /><Skeleton className="w-2 h-1 rounded-none" /><Skeleton className="w-20 h-5" /></li>
                            <li className="flex gap-x-2 items-center"><Skeleton className="w-50 h-5" /><Skeleton className="w-2 h-1 rounded-none" /><Skeleton className="w-20 h-5" /></li>
                        </ul>
                    </div>
                </div>

                {/* Tags, category, glass */}
                <div className="flex justify-center items-center gap-x-4">
                    <Skeleton className="w-32 h-8 rounded-md" />
                    <Skeleton className="w-32 h-8 rounded-md" />
                    <Skeleton className="w-32 h-8 rounded-md" />
                </div>
            </div>

            {/* Footer */}
            <div className="px-20 flex flex-col justify-center items-center gap-y-4">
                <Skeleton className="w-60 h-7 rounded-md" />
                <ul className="flex-1 text-left flex flex-col gap-y-6">
                    <li className="flex gap-x-4 items-center"><Skeleton className="w-4 h-4 rounded-full" /><Skeleton className="w-100 h-5" /></li>
                    <li className="flex gap-x-4 items-center"><Skeleton className="w-4 h-4 rounded-full" /><Skeleton className="w-100 h-5" /></li>
                    <li className="flex gap-x-4 items-center"><Skeleton className="w-4 h-4 rounded-full" /><Skeleton className="w-100 h-5" /></li>
                    <li className="flex gap-x-4 items-center"><Skeleton className="w-4 h-4 rounded-full" /><Skeleton className="w-100 h-5" /></li>
                </ul>
            </div>
        </div>
    )
}

export default FullViewCardSkeleton