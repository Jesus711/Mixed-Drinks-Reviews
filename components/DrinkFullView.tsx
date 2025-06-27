import { useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Drink } from '@/types'
import Image from 'next/image'
import StarRating from './StarRating'



const DrinkFullView = ({ idDrink, name, category, alcoholic, glass, instructions, image, tags, dateModified, DrinkIngredients, avg_rating, rating_count }: Drink) => {

  console.log(instructions)

  return (
    <Card className="animate-fade-in min-w-[300px] max-w-5xl w-full border-orange-400 border-4 text-white h-full flex flex-col justify-between whitespace-wrap text-wrap">
      <CardHeader className='w-full flex-1 flex justify-between items-center'>
        <div className=''>
          <CardTitle className='text-3xl'>{name}</CardTitle>
          <CardDescription className='text-2xl'>{alcoholic}</CardDescription>
        </div>

        {rating_count === 0 ? (
          <div className='flex flex-col justify-center items-center bg-gray-700 p-2 rounded-2xl'>
            <h3 className='text-2xl font-bold'>Unrated</h3>
            <p className='text-lg'>Be the First!</p>
          </div>
        ) : (
        <div>
          <StarRating />
        </div>
      )}
      </CardHeader>

      <CardContent className='flex'>
        <div className='flex flex-col gap-y-5'>
          <Image priority className='rounded-md' src={`/cocktail_images/${idDrink}.jpg`} alt={name} width={400} height={400} />
          <div>
            <h3 className='text-center text-2xl font-bold'>Select Your Rating:</h3>
            <StarRating />
          </div>
        </div>
        <div className='flex-1 flex flex-col justify-start items-center gap-y-3'>
          <h2 className='text-4xl font-semibold text-center'>Ingredients:</h2>
          <ul className='flex flex-col gap-y-2 text-left'>
            {DrinkIngredients.map((ingred, index) => (
              <li className='text-3xl' key={index}>{ingred.ingredient} - {ingred.measurement}</li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className='flex flex-col gap-y-2'>
        <div className='flex flex-wrap justify-center items-center text-black gap-x-3'>
          <span className="bg-white p-2 text-lg rounded-md">{category}</span>
          <span className="bg-white p-2 text-lg rounded-md">{glass}</span>
          {tags.split(",").map((tag, index) => {

            if (tag == "") {
              return;
            }

            return (
              <span className="bg-white p-2 text-lg rounded-md" key={index}>{tag}</span>
            )
          })}
        </div>

        <CardDescription className='text-2xl text-left'>
          <h2 className='text-3xl font-semibold text-left'>Instructions:</h2>
          {instructions.split(".").map((sentence, index) => {

            if (sentence === "") {
              return;
            }

            return (
              <li key={index}>{sentence}</li>
            )
          })}
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

export default DrinkFullView