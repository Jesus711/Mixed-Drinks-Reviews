'use client'
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Drink } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/Loading";
import DrinkCard from "@/components/DrinkCard";
import CardSkeleton from "@/components/CardSkeleton";
import DrinkFullView from "@/components/DrinkFullView";
import FullViewCardSkeleton from "@/components/FullViewCardSkeleton";
import CountdownTimer from "@/components/CountdownTimer";


const RandomBev = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [drink, setDrink] = useState<Drink | null>(null);

    
    useEffect(() => {

        const getRandomDrink = async () => {

            try { 

                const lastDate = window.localStorage.getItem("lastVisitDate")
                let lastItemId = window.localStorage.getItem("lastItemId");
                const today = new Date();

                if (lastDate !== null && today.toLocaleDateString() === lastDate){
                    const { data: lastDrink, error} = await supabase.from("drinks").select("*, DrinkIngredients(*)").eq("idDrink", lastItemId).single();
                    setDrink(lastDrink)
                    return;
                }

                const { data: ids } = await supabase.from('drinks').select('idDrink');
                if (ids === null){
                    throw new Error("No Ids retrieved!")
                }
                let availableIds = [];
                if (lastItemId != null) {
                    availableIds = ids.filter(i => i.idDrink !== lastItemId);
                }
                else {
                    availableIds = [...ids]
                }
                
                const randomId = availableIds[Math.floor(Math.random() * availableIds.length)].idDrink;
                window.localStorage.setItem("lastItemId", randomId);
                window.localStorage.setItem("lastVisitDate", today.toLocaleDateString());

                const { data, error } = await supabase.from("drinks").select("*, DrinkIngredients(*)").eq("idDrink", randomId).single();

                if (error) {
                    console.log("Random: Error-", error.message);
                }
                else {
                    setDrink(data);
                }
            } 
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        }

        getRandomDrink();

    }, [])

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center gap-y-5">
                <Loading />
                <FullViewCardSkeleton />
            </div>
        )
    }



    return (
        <div className="flex flex-col justify-center items-center gap-y-5">
            <CountdownTimer />
            { drink !== null ? <DrinkFullView {...drink} /> : (
                <Loading message="Error" />
            )}
        </div>
    )
}

export default RandomBev