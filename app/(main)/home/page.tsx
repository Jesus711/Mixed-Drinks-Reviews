'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import DrinkCard from '@/components/DrinkCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Drink } from '@/types'
import CardSkeleton from '@/components/CardSkeleton'

const HomePage = () => {

  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [prevViewedDrinks, setPrevViewedDrinks] = useState<Drink[]>([]);
  const [ratedDrinks, setRatedDrinks] = useState<Drink[]>([]);


  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/")
      }

      const { data, error } = await supabase.from("drinks").select("*, DrinkIngredients(*)").limit(5);
      if (error) {
        console.log("ERROR", error.message);
      }
      else {
        console.log("Drinks", data);
        setDrinks(data);
      }

      getLastViewed()
      getUserRatedDrinks()

      console.log("HELLO", user)
      setUserName(user?.user_metadata.display_name);
      setTimeout(() => setLoading(false), 500);
    }

    const getDrinkRecommendations = async () => {

      const { data, error } = await supabase.from("drinks").select("*, DrinkIngredients(*)").limit(5);
      if (error) {
        console.log("ERROR", error.message);
      }
      else {
        console.log("Drinks", data);
        setDrinks(data);
      }
    }

    const getUserRatedDrinks = async () => {
   
      const { data: rated, error: ratedError } = await supabase
        .from('drink_ratings')
        .select('*, drinks(*)')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (ratedError) {
        console.error('Error fetching rated drinks:', ratedError);
      } else {
        const drinks = rated.map(r => r.drinks);
        console.log(drinks)
        setRatedDrinks(drinks)
      }

    }

    const getLastViewed = () => {
      const stored = window.localStorage.getItem("lastViewed")
      if (stored !== null) {
        const prev = JSON.parse(stored)
        setPrevViewedDrinks(prev)
      }
    }

    getUser();

  }, [])


  return (
    <div className='flex-1 flex flex-col gap-y-7'>

      <h1 className='text-primary md:text-4xl md:text-left text-2xl text-center font-semibold'>Welcome <span className='text-blue-300'>{userName}</span></h1>

      <section className='flex-1 flex flex-col gap-y-1.5'>
        <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Drink Recommendations: </h2>
          <ScrollArea className='w-full rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
            <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
              {loading ? Array(5).fill(0).map((_, index) => (
                <CardSkeleton key={index} />
              )) 
              : 
              drinks.map((drink, index) => (
                  <DrinkCard {...drink} key={index} />
                ))}
            </div>
            <ScrollBar orientation='horizontal' className='h-3' />
          </ScrollArea>

      </section>

      {(loading || prevViewedDrinks.length != 0) &&
        <section className='flex-1 flex flex-col gap-y-1.5'>
          <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Previously Viewed:</h2>
          <ScrollArea className='w-full rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
            <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
              {loading ? Array(5).fill(0).map((_, index) => (
                <CardSkeleton key={index} />
              )) 
              : 
              prevViewedDrinks.map((drink, index) => (
                  <DrinkCard {...drink} key={index} />
                ))}
            </div>
            <ScrollBar orientation='horizontal' className='h-3' />
          </ScrollArea>
        </section>
      }


      {(loading || ratedDrinks.length != 0) &&
        <section className='flex-1 flex flex-col gap-y-1.5'>
          <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Drinks rated by me:</h2>
          <ScrollArea className='w-full rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
            <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
              {loading ? Array(5).fill(0).map((_, index) => (
                <CardSkeleton key={index} />
              )) 
              : 
              ratedDrinks.map((drink, index) => (
                  <DrinkCard {...drink} key={index} />
                ))}
            </div>
            <ScrollBar orientation='horizontal' className='h-3' />
          </ScrollArea>
        </section>
      }

    </div>
  )
}

export default HomePage