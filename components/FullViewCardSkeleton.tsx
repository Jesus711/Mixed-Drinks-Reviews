import { FaRegStar } from "react-icons/fa"
import { Skeleton } from "./ui/skeleton"

const FullViewCardSkeleton = () => {

    return (
        <div className="lg:min-w-3xl md:w-[600px] sm:w-[500px] xs:w-sm w-[360px] flex flex-col space-y-8 border-gray-600 border-4 p-2 rounded-xl shadow-sm shadow-blue-300">
            {/* Header */}
            <div className='flex sm:flex-row flex-col justify-center sm:justify-between items-center sm:space-x-3 md:px-3 gap-y-5'>
                <div className='space-y-2 pt-4 sm:block flex flex-col justify-center items-center'>
                    <Skeleton className="sm:flex-1 h-5 sm:w-[200px] w-[250px]" />
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
            <div className="w-full flex lg:flex-row flex-col px-4 justify-center items-center lg:gap-x-10 gap-y-5">
                {/* Image */}
                <Skeleton className="lg:w-[400px] lg:h-[400px] xs:w-[325px] w-[300px] xs:h-[325px] h-[300px] rounded-md" />
                <div className="flex flex-col items-center gap-y-6">
                    <Skeleton className="w-70 h-7 rounded-md" />
                    <ul className="flex-1 text-left flex flex-col items-center gap-y-8">
                        <li className="flex gap-x-2 items-center"><Skeleton className="lg:w-50 w-30 h-5" /><Skeleton className="w-2 h-1 rounded-none" /><Skeleton className="w-20 h-5" /></li>
                        <li className="flex gap-x-2 items-center"><Skeleton className="lg:w-50 w-30 h-5" /><Skeleton className="w-2 h-1 rounded-none" /><Skeleton className="w-20 h-5" /></li>
                        <li className="flex gap-x-2 items-center"><Skeleton className="lg:w-50 w-30 h-5" /><Skeleton className="w-2 h-1 rounded-none" /><Skeleton className="w-20 h-5" /></li>
                        <li className="lg:flex hidden gap-x-2 items-center"><Skeleton className="lg:w-50 w-30 h-5" /><Skeleton className="w-2 h-1 rounded-none" /><Skeleton className="w-20 h-5" /></li>
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 flex flex-col justify-center items-start gap-y-4">
                <Skeleton className="w-70 h-7 rounded-md" />
                <ul className="flex-1 text-left flex flex-col gap-y-6">
                    <li className="flex gap-x-4 items-center"><Skeleton className="w-4 h-4 rounded-full" /><Skeleton className="lg:w-130 md:w-100 sm:w-90 w-70 h-5" /></li>
                    <li className="flex gap-x-4 items-center"><Skeleton className="w-4 h-4 rounded-full" /><Skeleton className="lg:w-130 md:w-100 sm:w-90 w-70 h-5" /></li>
                    <li className="flex gap-x-4 items-center"><Skeleton className="w-4 h-4 rounded-full" /><Skeleton className="lg:w-130 md:w-100 sm:w-90 w-70 h-5" /></li>
                    <li className="flex gap-x-4 items-center"><Skeleton className="w-4 h-4 rounded-full" /><Skeleton className="lg:w-130 md:w-100 sm:w-90 w-70 h-5" /></li>
                </ul>
            </div>
        </div>
    )
}

export default FullViewCardSkeleton