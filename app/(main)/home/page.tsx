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

      const { data, error } = await supabase.from("Drinks").select("*, DrinkIngredients(*)").limit(5);
      if (error) {
        console.log("ERROR", error.message);
      }
      else {
        console.log("Drinks", data);
        setDrinks(data);
      }

      getLastViewed()

      console.log("HELLO", user)
      setUserName(user?.user_metadata.display_name);
      setTimeout(() => setLoading(false), 500);
    }

    const getDrinkRecommendations = async () => {

      const { data, error } = await supabase.from("Drinks").select("*, DrinkIngredients(*)").limit(5);
      if (error) {
        console.log("ERROR", error.message);
      }
      else {
        console.log("Drinks", data);
        setDrinks(data);
      }
    }

    const getUserRatedDrinks = async () => {
      // 1. Get drink IDs the user rated
      const { data: rated, error: ratedError } = await supabase
        .from('RatedDrinks')
        .select('drink_id')
        .eq('userID', (await supabase.auth.getUser()).data.user?.id);

      if (ratedError) {
        console.error('Error fetching rated drinks:', ratedError);
      } else {
        const drinkIds = rated.map(r => r.drink_id);

        // 2. Get drinks where id is in rated drink IDs
        const { data: drinks, error: drinksError } = await supabase
          .from('drinks')
          .select('*')
          .in('id', drinkIds);

        if (drinksError) {
          console.error('Error fetching drinks:', drinksError);
        } else {
          console.log('Rated drinks:', drinks);
          setDrinks(drinks);
        }
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
    <div className='flex-1 flex flex-col gap-y-5'>

      <h1 className='text-primary text-4xl font-semibold'>Welcome {userName}</h1>

      <section className='flex-1 flex flex-col gap-y-1.5'>
        <h2 className='text-primary text-3xl font-semibold'>Drink Recommendations: </h2>
        {loading ? <div className='w-full rounded-2xl border-4 border-orange-400 p-6 flex justify-center items-center space-x-8'>
          {Array(5).fill(0).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div> : (
          <ScrollArea className='w-full rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
            <div className='p-6 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
              {drinks.map((drink, index) => (
                <DrinkCard {...drink} key={index} />
              ))}
            </div>
            <ScrollBar orientation='horizontal' className='h-3' />
          </ScrollArea>
        )}

      </section>

      {(loading || prevViewedDrinks.length != 0) &&
        <section className='flex-1 flex flex-col gap-y-1.5'>
          <h2 className='text-primary text-3xl font-semibold'>Previously Viewed:</h2>
          {loading ? <div className='w-full rounded-2xl border-4 border-orange-400 p-6 flex justify-center items-center space-x-8'>
            {Array(5).fill(0).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div> :
            (
              <ScrollArea className='w-full rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
                <div className='p-6 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
                  {prevViewedDrinks.map((drink, index) => (
                    <DrinkCard {...drink} key={index} />
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='h-3' />
              </ScrollArea>
            )}
        </section>
      }


      {(loading || ratedDrinks.length != 0) &&
        <section className='flex-1 flex flex-col gap-y-1.5'>
          <h2 className='text-primary text-3xl font-semibold'>Drinks rated by me:</h2>
          {loading ? <div className='w-full rounded-2xl border-4 border-orange-400 p-6 flex justify-center items-center space-x-8'>
            {Array(5).fill(0).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div> :
            (
              <ScrollArea className='w-full rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
                <div className='p-6 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
                  {ratedDrinks.map((drink, index) => (
                    <DrinkCard {...drink} key={index} />
                  ))}
                </div>
                <ScrollBar orientation='horizontal' className='h-3' />
              </ScrollArea>
            )}
        </section>
      }

    </div>
  )
}

export default HomePage