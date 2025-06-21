'use client'
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Drink } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/Loading";
import DrinkCard from "@/components/DrinkCard";
import CardSkeleton from "@/components/CardSkeleton";

type TimeRemaining = {
    hours: number;
    minutes: number;
    seconds: number;
}

const RandomBev = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [drink, setDrink] = useState<Drink | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(getTimeUntilMidnight());


    function getTimeUntilMidnight() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // Set time to midnight

        const diffMs = midnight.getTime() - now.getTime();
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    }


    useEffect(() => {

        const getRandomDrink = async () => {

            try { 

                const lastDate = window.localStorage.getItem("lastVisitDate")
                let lastItemId = window.localStorage.getItem("lastItemId");
                const today = new Date();

                if (lastDate != null && today.toLocaleDateString() == lastDate){
                    const { data: lastDrink, error} = await supabase.from("Drinks").select("*, DrinkIngredients(*)").eq("idDrink", lastItemId).single();
                    setDrink(lastDrink)
                    return;
                }

                const { data: ids } = await supabase.from('Drinks').select('idDrink');
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

                const { data, error } = await supabase.from("Drinks").select("*, DrinkIngredients(*)").eq("idDrink", randomId).single();

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
                setTimeout(() => setLoading(false), 1000)
            }
        }

        const interval = setInterval(() => {
            setTimeRemaining(getTimeUntilMidnight());
        }, 1000); // Update every second

        getRandomDrink();

        return () => clearInterval(interval); // Cleanup on unmount

    }, [])

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center gap-y-5">
                <Loading />
                <CardSkeleton />
            </div>
        )
    }



    return (
        <div className="flex flex-col justify-center items-center gap-y-5">
            <h2 className="text-3xl text-blue-200 font-bold text-center">Next Random Bev in {timeRemaining.hours}hr {timeRemaining.minutes}m {timeRemaining.seconds}s</h2>

            { drink !== null ? <DrinkCard {...drink} /> : (
                <Loading message="Error" />
            )}
        </div>
    )
}

export default RandomBev