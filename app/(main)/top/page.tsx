'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import DrinkCard from '@/components/DrinkCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { DrinkSection } from '@/types'
import CardSkeleton from '@/components/CardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import Loading from '@/components/Loading'

const SKELETON_CARDS = 7;
const MAX_DRINKS = 10;
const NUMBER_OF_SECTIONS = 3;

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


const TopRatedDrinks = () => {

  const [loading, setLoading] = useState(true);
  const [drinkSections, setDrinkSections] = useState<DrinkSection[]>([]);

  const getTopRatedDrinks = async () => {
    const sections: DrinkSection[] = [];
    let section: DrinkSection;

    const { data: topRated, error: topRatedError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
    if (topRatedError) {
      console.log(topRatedError)
    }
    else {
      section = {
        title: "Highest Rated",
        data: topRated
      }
      sections.push(section)
    }

    const { data: tequilaIds, error: tequilaIdsError } = await supabase.from("DrinkIngredients").select("idDrink").ilike("ingredient", "Tequila")

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

        section = {
          title: "Tequila Drinks",
          data: tequilaDrinks
        }
        sections.push(section)
      }
    }

    const { data: vodkaIds, error: vodkaIdsError } = await supabase.from("DrinkIngredients").select("idDrink").ilike("ingredient", "Vodka")

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

        section = {
          title: "Vodka Drinks",
          data: vodkaDrinks
        }
        sections.push(section)
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

        section = {
          title: "Whiskey Drinks",
          data: whiskeyDrinks
        }
        sections.push(section)
      }
    }

    const { data: rumIds, error: rumIdsError } = await supabase.from("DrinkIngredients").select("idDrink").filter("ingredient", "in", `(${rumIngredients.join(",")})`)

    if (rumIdsError) {
      console.log(rumIdsError)
    }

    else {
      let ids = rumIds.map(drink => drink.idDrink)
      const { data: rumDrinks, error: rumDrinksError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").filter("idDrink", "in", `(${ids.join(",")})`).order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
      if (rumDrinksError) {
        console.log(rumDrinksError)
      }
      else {

        section = {
          title: "Rum Drinks",
          data: rumDrinks
        }
        sections.push(section)
      }
    }

    const { data: ginIds, error: ginIdsError } = await supabase.from("DrinkIngredients").select("idDrink").ilike("ingredient", "Gin")

    if (ginIdsError) {
      console.log(ginIdsError)
    }

    else {
      let ids = ginIds.map(drink => drink.idDrink)
      const { data: ginDrinks, error: ginDrinksError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").filter("idDrink", "in", `(${ids.join(",")})`).order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
      if (ginDrinksError) {
        console.log(ginDrinksError)
      }
      else {

        section = {
          title: "Gin Drinks",
          data: ginDrinks
        }
        sections.push(section)
      }
    }

    const { data: coffeeTeaDrinks, error: coffeeTeaError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").eq("category", "Coffee / Tea").order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
    if (coffeeTeaError) {
      console.log(coffeeTeaError)
    }
    else {
      section = {
        title: "Coffee & Tea Drinks",
        data: coffeeTeaDrinks
      }
      sections.push(section)
    }

    const { data: nonAlcoDrinks, error: nonAlcoError } = await supabase.from("drinks").select("*, DrinkIngredients(*)").ilike("alcoholic", "Non alcoholic").order("avg_rating", { ascending: false }).limit(MAX_DRINKS)
    if (nonAlcoError) {
      console.log(nonAlcoError)
    }
    else {
      section = {
        title: "Non Alcoholic Drinks",
        data: nonAlcoDrinks
      }
      sections.push(section)
    }

    setDrinkSections(sections);
    setTimeout(() => setLoading(false), 250);
  }


  useEffect(() => {
    getTopRatedDrinks()
  }, [])

  if (loading) {
    return (
      <div className='flex-1 flex flex-col gap-y-4'>
      <Loading message='Loading Top Rating Drinks!' />
      {Array(NUMBER_OF_SECTIONS).fill(0).map((_, index) => (
        <section key={index} className='flex-1 flex flex-col gap-y-2'>
          <div className='flex md:justify-start md:items-start justify-center items-center'>
            <Skeleton className='w-[200px] h-5 rounded-lg' />
          </div>
          <ScrollArea className=' rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
            <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
              {Array(SKELETON_CARDS).fill(0).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
            <ScrollBar orientation='horizontal' className='h-3' />
          </ScrollArea>
        </section>))}
      </div>
    )
  }

  return (

    <div className='flex-1 flex flex-col gap-y-9 px-4'>

      {!loading && drinkSections.length === 0 && (
        <h1>Error Occurred when trying to retrive drinks. Try Refreshing</h1>
      )}

      {drinkSections.map((section, index) => (
        <section key={section.title + index} className='flex-1 flex flex-col md:gap-y-2 gap-y-1.5'>
          <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>{section.title}</h2>
          <ScrollArea className='rounded-xl border-3 border-orange-400 whitespace-nowrap'>
            <div className='md:p-4 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
              {section.data.map((drink, index) => (
                <DrinkCard {...drink} key={index} />
              ))}
            </div>
            <ScrollBar orientation='horizontal' className='h-3' />
          </ScrollArea>
        </section>
      ))}
    </div>
  )
}

export default TopRatedDrinks