'use client'
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Drink } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/components/Loading";

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
            setLoading(false)
        }

        const interval = setInterval(() => {
            setTimeRemaining(getTimeUntilMidnight());
        }, 1000); // Update every second

        getRandomDrink();

        return () => clearInterval(interval); // Cleanup on unmount

    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }



    return (
        <div className="">
            <h2 className="text-3xl text-blue-200 font-bold text-center">Next Random Bev in {timeRemaining.hours}hr {timeRemaining.minutes}m {timeRemaining.seconds}s</h2>
        
            <div>
                <h1>Drink name</h1>
            </div>
        </div>
    )
}

export default RandomBev