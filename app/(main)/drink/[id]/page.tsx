'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Drink } from "@/types"
import { supabase } from "@/lib/supabaseClient"
import Loading from "@/components/Loading"
import DrinkFullView from "@/components/DrinkFullView"
import FullViewCardSkeleton from "@/components/FullViewCardSkeleton"

const DrinkPage = () => {
    const { id } = useParams();
    

    const [drink, setDrink] = useState<Drink | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const getDrinkInfo = async () => {
            const { data, error }  = await supabase.from("drinks").select("*, DrinkIngredients(*)").eq("idDrink", id).single();

            if (error){
                console.log(error)
            } else {
                setDrink(data)
            }

            setLoading(false)
        }

        getDrinkInfo()

    }, [id])

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center gap-y-5">
                <Loading />
                <FullViewCardSkeleton />
            </div>
        )
    }


  return (
    <div className="flex-1 flex justify-center items-center">
        {drink !== null ? <DrinkFullView {...drink} /> : (
            <Loading message="ERRROR" />
        )}
    </div>
  )
}

export default DrinkPage