'use client'
import DrinkCard from "@/components/DrinkCard"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Drink } from "@/types"
import { supabase } from "@/lib/supabaseClient"
import Loading from "@/components/Loading"

const DrinkPage = () => {
    const { id } = useParams();
    

    const [drink, setDrink] = useState<Drink | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const getDrinkInfo = async () => {
            const { data, error }  = await supabase.from("Drinks").select("*, DrinkIngredients(*)").eq("idDrink", id).single();

            if (error){
                console.log(error)
            } else {
                setDrink(data)
            }

            setLoading(false);
        }

        getDrinkInfo()

    }, [id])

    if (loading) {
        return (
            <Loading />
        )
    }


  return (
    <div>

        {drink !== null ? <DrinkCard {...drink} /> : (
            <Loading message="ERRROR" />
        )}
    </div>
  )
}

export default DrinkPage