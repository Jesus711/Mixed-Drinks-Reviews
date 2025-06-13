'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import DrinkCard from '@/components/DrinkCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
const HomePage = () => {

  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/")
      }

      console.log("HELLO", user)
      setUserName(user?.user_metadata.display_name);
      setTimeout(() => setLoading(false), 200);
    }

    getUser();

  }, [])


  if (loading) {
    return (
      <div className='w-full flex justify-center items-center'>
        <h1 className='text-primary font-bold text-5xl text-center'>LOADING...</h1>
      </div>
    )
  }


  return (
    <div className='flex-1 flex flex-col gap-y-5'>

      <h1 className='text-primary text-4xl font-semibold'>Welcome {userName}</h1>

      <section className='flex-1 flex flex-col'>
        <h2 className='text-primary text-3xl font-semibold'>Drink Recommendations: </h2>\
          <ScrollArea className='w-full rounded-2xl border-2 border-orange-400 whitespace-nowrap'>
          <div className='p-6 flex items-center space-x-6 overflow-x-auto scroll-smooth'>
            <DrinkCard />
            <DrinkCard />
            <DrinkCard />
            <DrinkCard />
            <DrinkCard />
            <DrinkCard />
            <DrinkCard />
          </div>
          <ScrollBar orientation='horizontal' className='h-3' />
        </ScrollArea>

      </section>

      <section className='flex-1'>
        <h2 className='text-primary text-3xl font-semibold'>Previously Viewed:</h2>
      </section>


      <section className='flex-1'>
        <h2 className='text-primary text-3xl font-semibold'>Drinks rated by me:</h2>
      </section>

    </div>
  )
}

export default HomePage