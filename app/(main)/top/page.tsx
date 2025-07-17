'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import DrinkCard from '@/components/DrinkCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Drink } from '@/types'
import CardSkeleton from '@/components/CardSkeleton'
import { User } from '@supabase/supabase-js'

const SKELETON_CARDS = 7;

const MAX_DRINKS = 10;

const whiskeyIngredients = [
  "Whisky",
  "Bourbon",
  "Jim Beam",
  "Johnnie Walker"
];

const rumIngredients = [
  "Rum",
  "Malibu Rum",
  "Malibu rum",
  "blackstrap rum"
];

const coffeeIngredients = [
  "Coffee liqueur"
];

const chocolateIngredients = [
  "Chocolate liqueur",
  "Chocolate ice-cream",
  "Hot chocolate",
  "Hot Chocolate"
];


const TopRatedDrinks = () => {

  const [loading, setLoading] = useState(true);
  const [topRatedDrinks, setTopRatedDrinks] = useState<Drink[]>([])
  const [nonAlcoholicDrinks, setNonAlcoholicDrinks] = useState<Drink[]>([])
  const [tequilaDrinks, setTequilaDrinks] = useState<Drink[]>([])
  const [vodkaDrinks, setVodkaDrinks] = useState<Drink[]>([])
  const [whiskeyDrinks, setWhiskeyDrinks] = useState<Drink[]>([])
  const [coffeeTeaDrinks, setCoffeeTeaDrinks] = useState<Drink[]>([])



  const getTopRatedDrinks = async () => {

    const { data: topRated, error: topRatedError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
    if (topRatedError) {
      console.log(topRatedError)
    }
    else {
      setTopRatedDrinks(topRated)
    }

    const { data: nonAlcoDrinks, error: nonAlcoError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").eq("alcoholic", "Non alcoholic").order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
    if (nonAlcoError) {
      console.log(nonAlcoError)
    }
    else {
      setNonAlcoholicDrinks(nonAlcoDrinks)
    }

    const { data: tequilaIds, error: tequilaIdsError } = await supabase.from("DrinkIngredients").select("idDrink").eq("ingredient", "Tequila")

    if (tequilaIdsError) {
      console.log(tequilaIdsError)
    }

    else {
      let ids = tequilaIds.map(drink => drink.idDrink)
      const { data: tequilaDrinks, error: tequilaDrinksError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").filter("idDrink", "in", `(${ids.join(",")})`).order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
      if (tequilaDrinksError) {
        console.log(tequilaDrinksError)
      }
      else {

        setTequilaDrinks(tequilaDrinks)
        console.log(tequilaDrinks)
      }
    }

    const { data: vodkaIds, error: vodkaIdsError } = await supabase.from("DrinkIngredients").select("idDrink").eq("ingredient", "Vodka")

    if (vodkaIdsError) {
      console.log(vodkaIdsError)
    }

    else {
      let ids = vodkaIds.map(drink => drink.idDrink)
      const { data: vodkaDrinks, error: vodkaDrinksError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").filter("idDrink", "in", `(${ids.join(",")})`).order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
      if (vodkaDrinksError) {
        console.log(vodkaDrinksError)
      }
      else {

        setVodkaDrinks(vodkaDrinks)
        console.log(vodkaDrinks)
      }
    }

    const { data: whiskeyIds, error: whiskeyIdsError } = await supabase.from("DrinkIngredients").select("idDrink").filter("ingredient", "in", `(${whiskeyIngredients.join(",")})`)

    if (whiskeyIdsError) {
      console.log(whiskeyIdsError)
    }

    else {
      let ids = whiskeyIds.map(drink => drink.idDrink)
      const { data: whiskeyDrinks, error: whiskeyDrinksError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").filter("idDrink", "in", `(${ids.join(",")})`).order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
      if (whiskeyDrinksError) {
        console.log(whiskeyDrinksError)
      }
      else {

        setWhiskeyDrinks(whiskeyDrinks)
        console.log(whiskeyDrinks)
      }
    }

    const { data: coffeeTeaDrinks, error: coffeeTeaError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").eq("category", "Coffee / Tea").order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
    if (coffeeTeaError) {
      console.log(coffeeTeaError)
    }
    else {
      setCoffeeTeaDrinks(coffeeTeaDrinks)
    }

    setLoading(false)
  }


  useEffect(() => {
    getTopRatedDrinks()
  }, [])

  return (

    <div className='flex-1 flex flex-col gap-y-9 px-4'>

      <section className='flex-1 flex flex-col gap-y-1.5'>
        <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Highest Rated:</h2>
        <ScrollArea className=' rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
          <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
            {loading ? Array(SKELETON_CARDS).fill(0).map((_, index) => (
              <CardSkeleton key={index} />
            ))
              :
              topRatedDrinks.map((drink, index) => (
                <DrinkCard {...drink} key={index} />
              ))}
          </div>
          <ScrollBar orientation='horizontal' className='h-3' />
        </ScrollArea>
      </section>

      <section className='flex-1 flex flex-col gap-y-1.5'>
        <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Tequila Drinks: </h2>
        <ScrollArea className=' rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
          <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
            {loading ? Array(SKELETON_CARDS).fill(0).map((_, index) => (
              <CardSkeleton key={index} />
            ))
              :
              tequilaDrinks.map((drink, index) => (
                <DrinkCard {...drink} key={index} />
              ))}
          </div>
          <ScrollBar orientation='horizontal' className='h-3' />
        </ScrollArea>
      </section>


      <section className='flex-1 flex flex-col gap-y-1.5'>
        <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Vodka Drinks: </h2>
        <ScrollArea className=' rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
          <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
            {loading ? Array(SKELETON_CARDS).fill(0).map((_, index) => (
              <CardSkeleton key={index} />
            ))
              :
              vodkaDrinks.map((drink, index) => (
                <DrinkCard {...drink} key={index} />
              ))}
          </div>
          <ScrollBar orientation='horizontal' className='h-3' />
        </ScrollArea>
      </section>

      <section className='flex-1 flex flex-col gap-y-1.5'>
        <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Whiskey Drinks: </h2>
        <ScrollArea className=' rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
          <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
            {loading ? Array(SKELETON_CARDS).fill(0).map((_, index) => (
              <CardSkeleton key={index} />
            ))
              :
              whiskeyDrinks.map((drink, index) => (
                <DrinkCard {...drink} key={index} />
              ))}
          </div>
          <ScrollBar orientation='horizontal' className='h-3' />
        </ScrollArea>
      </section>

      <section className='flex-1 flex flex-col gap-y-1.5'>
        <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Coffee & Tea Drinks: </h2>
        <ScrollArea className=' rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
          <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
            {loading ? Array(SKELETON_CARDS).fill(0).map((_, index) => (
              <CardSkeleton key={index} />
            ))
              :
              coffeeTeaDrinks.map((drink, index) => (
                <DrinkCard {...drink} key={index} />
              ))}
          </div>
          <ScrollBar orientation='horizontal' className='h-3' />
        </ScrollArea>
      </section>

      <section className='flex-1 flex flex-col gap-y-1.5'>
        <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Non Alcoholic Drinks: </h2>
        <ScrollArea className=' rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
          <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
            {loading ? Array(SKELETON_CARDS).fill(0).map((_, index) => (
              <CardSkeleton key={index} />
            ))
              :
              nonAlcoholicDrinks.map((drink, index) => (
                <DrinkCard {...drink} key={index} />
              ))}
          </div>
          <ScrollBar orientation='horizontal' className='h-3' />
        </ScrollArea>
      </section>

    </div>
  )
}

export default TopRatedDrinks