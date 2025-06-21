import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Drink } from '@/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const DrinkCard = ({ idDrink, name, category, alcoholic, glass, instructions, image, tags, dateModified, DrinkIngredients }: Drink) => {

  const router = useRouter();

  if (!idDrink) {
    return (
      <Card className="min-w-[300px] max-w-sm w-full border-white border-2 text-white hover:border-blue-400 h-full flex flex-col justify-between whitespace-wrap text-wrap">
      <CardHeader>
        <CardTitle>Drink Name</CardTitle>
        <CardDescription>This Drink....</CardDescription>
        <CardAction><Button>View More</Button></CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Rating: 0/5</p>
      </CardFooter>
    </Card>
    )
  }

  const handleNav = () => {
    router.push(`/drink/${idDrink}`)
  }


  return (
    <Card onClick={handleNav} className="animate-fade-in hover:cursor-pointer min-w-[300px] max-w-sm w-full border-white border-2 text-white hover:border-blue-400 h-full flex flex-col justify-between whitespace-wrap text-wrap">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{alcoholic}</CardDescription>
        <CardAction><Button>View More</Button></CardAction>
      </CardHeader>
      <CardContent className='flex justify-center items-center'>
        <Image priority src={`/cocktail_images/${idDrink}.jpg`} alt={name} width={300} height={300}/>
      </CardContent>
      <CardFooter className='flex flex-col'>
        <p>{category}</p>
        <p>Rating: 0/5</p>
      </CardFooter>
    </Card>
  )
}

export default DrinkCard