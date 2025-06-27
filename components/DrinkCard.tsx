import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Drink } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const DrinkCard = ({ idDrink, name, category, alcoholic, glass, instructions, image, tags, dateModified, DrinkIngredients, avg_rating, rating_count }: Drink) => {

  const router = useRouter();

  const handleNav = () => {
    const stored = window.localStorage.getItem("lastViewed")
    const drink = {idDrink, name, category, alcoholic, glass, instructions, image, tags, dateModified, DrinkIngredients, avg_rating, rating_count}

    let prevViewed: Drink[] = stored ? JSON.parse(stored) : []

    prevViewed = prevViewed.filter((value) => value.idDrink != drink.idDrink)

    prevViewed.unshift(drink)

    if (prevViewed.length > 5) {
      prevViewed.pop()
    }

    window.localStorage.setItem("lastViewed", JSON.stringify(prevViewed));

    router.push(`/drink/${idDrink}`)
  }


  return (
    <Card onClick={handleNav} className="animate-fade-in hover:cursor-pointer min-w-[300px] max-w-sm w-full border-gray-300 border-4 text-white hover:border-blue-400 h-full flex flex-col justify-between whitespace-wrap text-wrap">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{alcoholic}</CardDescription>
        <CardAction><Button className='hover:cursor-pointer'>View More</Button></CardAction>
      </CardHeader>
      <CardContent className='flex justify-center items-center'>
        <Image priority src={`/cocktail_images/${idDrink}.jpg`} alt={name} width={300} height={300} />
      </CardContent>
      <CardFooter className='flex flex-col gap-y-2'>
        <p>{category}</p>
        <p>{rating_count == 0 ? "Unrated" : `Rating: ${avg_rating} / 5(${rating_count})`}</p>
      </CardFooter>
    </Card>
  )
}

export default DrinkCard