import { useState, useEffect } from "react";

type TimeRemaining = {
    hours: number;
    minutes: number;
    seconds: number;
}
const CountdownTimer = () => {
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

        const interval = setInterval(() => {
            setTimeRemaining(getTimeUntilMidnight());
        }, 1000); // Update every second


        return () => clearInterval(interval); // Cleanup on unmount

    }, [])

  return (
    <h2 className="md:text-3xl text-xl text-blue-200 font-bold text-center">Next Random Bev in {timeRemaining.hours}hr {timeRemaining.minutes}m {timeRemaining.seconds}s</h2>
  )
}

export default CountdownTimer