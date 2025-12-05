import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardContent, CardFooter } from './ui/card'
import { Drink } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const MAX_PREV_DRINKS_STORED = 7
const bucket_url = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL

const DrinkCard = ({ id, name, category, alcoholic, glass, instructions, image_url, last_modified, created_by, drink_ingredients, avg_rating, rating_count, created_date}: Drink) => {

  const router = useRouter();

  const handleNav = () => {
    const stored = window.localStorage.getItem("lastViewed")
    let prevViewed: number[] = stored ? JSON.parse(stored) : []

    prevViewed = prevViewed.filter((value) => value != id)

    prevViewed.unshift(id)

    if (prevViewed.length > MAX_PREV_DRINKS_STORED) {
      prevViewed.pop()
    }

    window.localStorage.setItem("lastViewed", JSON.stringify(prevViewed));

    router.push(`/drink/${id}`)
  }


  return (
    <Card onClick={handleNav} className="animate-fade-in hover:cursor-pointer xl:w-[325px] md:w-[300px] w-[275px] border-gray-300 border-2 text-white hover:border-blue-400 h-full flex flex-col justify-between whitespace-wrap text-wrap bg-gradient-to-b from-slate-700 to-slate-900">
      <CardHeader>
        <div className='w-[65%] flex flex-col justify-center '>
        <CardTitle className='text-lg whitespace-nowrap overflow-hidden overflow-ellipsis'>{name}</CardTitle>
        <CardDescription className='text-[16px]'>{alcoholic === "Yes" ? "Alcoholic" : "Non-Alcoholic"}</CardDescription>
        </div>
        <CardAction className='flex justify-center items-centerhover:cursor-pointer xl:text-[16px] text-sm'>View More</CardAction>
      </CardHeader>
      <CardContent className='flex justify-center items-center'>
        <Image className='rounded-sm' priority src={`${bucket_url}${image_url}`} alt={name} width={300} height={300} />
      </CardContent>
      <CardFooter className='flex flex-col md:gap-y-2 gay-y-1'>
        <p className='md:text-xl text-md font-semibold'>{category}</p>
        <p className='md:text-xl text-md text-amber-300 font-bold'>{rating_count == 0 ? "Unrated" : `Rating: ${avg_rating}/5 (${rating_count})`}</p>
      </CardFooter>
    </Card>
  )
}

export default DrinkCard