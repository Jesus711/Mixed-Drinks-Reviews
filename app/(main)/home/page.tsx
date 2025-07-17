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


const HomePage = () => {

  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [prevViewedDrinks, setPrevViewedDrinks] = useState<Drink[]>([]);
  const [ratedDrinks, setRatedDrinks] = useState<Drink[]>([]);


  const router = useRouter();

  const ratingSort = (a: Drink, b: Drink) => {
    if (a.avg_rating > b.avg_rating){
      return -1
    }

    return 1
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/")
        return
      }


      let prevDrinks = getLastViewed()

      let userRatedDrinks = await getUserRatedDrinks(user)

      getDrinkRecommendations(prevDrinks, userRatedDrinks)

      setUserName(user?.user_metadata.display_name);
      setLoading(false)
    }

    const getDrinkRecommendations = async (prevDrinks: Drink[], userRatedDrinks: Drink[]) => {

      // If user has no previous viewed drinks or has not rated any drinks, recommend the top rated
      // else, using the most recently viewed drink and one of the rated drinks, retrieve 10 drinks with similar ingredients
      // if the number of recommended drinks is less than 7, append the 5 top rated drinks
      if (!prevDrinks && !userRatedDrinks) {
        const { data, error } = await supabase.from("drinks").select("*, DrinkIngredients(*)").order("avg_rating", {ascending: false}).limit(10);
        if (error) {
          console.log("ERROR", error.message);
        }
        else {
          setDrinks(data);
        }
      } else {
          let ingredients: string[] = []
          let ids: number[] = []

          if (prevDrinks.length > 0) {
            ingredients = [...prevDrinks[0].DrinkIngredients.map(ingred => ingred.ingredient)]
            ids = [...prevDrinks.map(drink => drink.idDrink)]
          }

          if (userRatedDrinks.length > 0) {
            ingredients = [...ingredients, ...userRatedDrinks[0].DrinkIngredients.map(ingred => ingred.ingredient)]
            ids = [...ids, ...userRatedDrinks.map(drink => drink.idDrink)]
          }

          console.log(ids)
          const { data, error } = await supabase.from("DrinkIngredients").select("id, drinks(*, DrinkIngredients(*))").in("ingredient", ingredients).not("idDrink", "in", `(${ids.join(",")})`).limit(10);
          if (error) {
            console.log("ERROR", error.message);
          }
          else {
            let drinks: Drink[] = []
            for(let i = 0; i < data.length; i++){
              let drink: Drink | Drink[] = data[i].drinks
              if(Array.isArray(drink)){
                drink = drink[0]
              }
              drinks.push(drink)
            }

            if(drinks.length < 7) {
              const { data: highRated, error } = await supabase.from("drinks").select("*, DrinkIngredients(*)").order("avg_rating", {ascending: false}).limit(5);
              if (error) {
                console.log("ERROR", error.message);
              }
              else {
                drinks = [...drinks, ...highRated]
              }
            }

            drinks.sort(ratingSort)
            setDrinks(drinks);
          }
      }


    }

    const getUserRatedDrinks = async (user: User) => {
   
      const { data: rated, error: ratedError } = await supabase
        .from('drink_ratings')
        .select('*, drinks(*, DrinkIngredients(*))')
        .eq('user_id', user.id);

      if (ratedError) {
        console.error('Error fetching rated drinks:', ratedError);
      } else {
        const drinks = rated.map(r => r.drinks);
        setRatedDrinks(drinks)
        return drinks
      }

      return []
    }

    const getLastViewed = () => {
      const stored = window.localStorage.getItem("lastViewed")
      if (stored !== null) {
        const prev = JSON.parse(stored)
        setPrevViewedDrinks(prev)
        return prev
      }

      return []
    }

    getUser();

  }, [])


  return (
    <div className='flex-1 flex flex-col gap-y-9 px-5'>

      <h1 className='text-primary md:text-4xl md:text-left text-2xl text-center font-semibold'>Welcome <span className='text-blue-300'>{userName}</span></h1>

      <section className='flex-1 flex flex-col gap-y-1.5'>
        <h2 className='text-primary md:text-3xl text-xl font-semibold md:text-left text-center'>Drink Recommendations: </h2>
          <ScrollArea className=' rounded-2xl border-4 border-orange-400 whitespace-nowrap'>
            <div className='md:p-6 p-3 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
              {loading ? Array(SKELETON_CARDS).fill(0).map((_, index) => (
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
              {loading ? Array(SKELETON_CARDS).fill(0).map((_, index) => (
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
              {loading ? Array(SKELETON_CARDS).fill(0).map((_, index) => (
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