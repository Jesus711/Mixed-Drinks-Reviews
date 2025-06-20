'use client'
import CardSkeleton from '@/components/CardSkeleton';
import DrinkCard from '@/components/DrinkCard';
import { supabase } from '@/lib/supabaseClient';
import { Drink } from '@/types'
import { useState, useEffect } from 'react'

const Browse = () => {
  const [drinkList, setDrinkList] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const getDrinks = async () => {
      const { data, error } = await supabase.from("Drinks").select("*, DrinkIngredients(*)").limit(20);

      if (error) {
        console.log("Error:", error.message);
      }
      else {
        setDrinkList(data);
      }

      setTimeout(() => setLoading(false), 500);
    }

    getDrinks();

  }, [])


  return (
    <div className='flex flex-col justify-center items-center'>


      <div className='flex-1 flex flex-wrap justify-between items-center gap-y-5'>

        {loading ? 
          Array(20).fill(0).map((_, index) => (
            <CardSkeleton key={index}/>
          ))
        : drinkList.map((drink, index) => (
          <DrinkCard {...drink} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Browse