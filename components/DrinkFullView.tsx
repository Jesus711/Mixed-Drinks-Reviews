import { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drink } from '@/types'
import Image from 'next/image'
import StarRating from './StarRating'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'
import { DialogDescription } from '@radix-ui/react-dialog'


const bucket_url = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL

const DrinkFullView = ({ id, name, category, alcoholic, glass, instructions, image_url, last_modified, created_by, drink_ingredients, avg_rating, rating_count, created_date}: Drink) => {
  const [userRated, setUserRating] = useState<number>(-1);
  const [selectedRating, setSelectedRating] = useState<number>(-1);
  const [openDialog, setOpenDialog] = useState(false);
  const [avgRating, setAvgRating] = useState<number>(avg_rating);
  const [ratingCount, setRatingCount] = useState<number>(rating_count);


  const displayUserRating = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return
    }

    const { data, error } = await supabase.from("drink_ratings").select("rating").eq("user_id", user.id).eq('drink_id', id).maybeSingle();

    if (data === null) {
      return;
    }
    else {
      setUserRating(data.rating)
    }
  }

  const handleStarClicked = (ratingClicked: number) => {
    setSelectedRating(ratingClicked)
    setOpenDialog(true);
  }

  const handleDrinkRating = async (confirmRating: boolean) => {

    if (confirmRating){
      const { data: { user } } = await supabase.auth.getUser();

      if(user === undefined || user === null){
        toast.error("Drink was not rated.", {
          description: "Must be logged in to rate drinks!",
          duration: 2000,
          position: "bottom-center",
        })

        setOpenDialog(false)
        setSelectedRating(-1)
        return
      }

      let rating = {
        user_id: user?.id,
        drink_id: id,
        rating: selectedRating
      }

      const { data, error } = await supabase.from("drink_ratings").upsert(rating, { onConflict: 'user_id, drink_id' });

      if (error) {
        console.log(error);
      }

      setUserRating(selectedRating)
      await updateRatingAvgCount()
    } else {
      setSelectedRating(-1)
    }
    
    setOpenDialog(false)
  }

  const updateRatingAvgCount = async () => {
    const { data: rating, error} = await supabase.from("drinks").select("avg_rating, rating_count").eq("id", id).single();

    if (error) {
      console.log(error)
    }
    else {
      setAvgRating(rating.avg_rating);
      setRatingCount(rating.rating_count);
    }
  }


  const updateExistingRating = () => {
    setUserRating(-1)
    setSelectedRating(-1)
  }

  useEffect(() => {
    displayUserRating()
  }, [])


  return (
    <Card className="animate-fade-in md:min-w-[300px] md:max-w-4xl w-full border-orange-400 border-3 text-white h-full flex flex-col justify-between whitespace-wrap text-wrap bg-gradient-to-b from-slate-700 to-slate-900 ">
      <CardHeader className='w-full flex-1 flex sm:flex-row flex-col justify-between items-center'>
        <div>
          <CardTitle className='md:text-3xl text-xl'>{name}</CardTitle>
          <CardDescription className='md:text-2xl text-lg sm:text-left text-center'>{alcoholic === "Yes" ? "Alcoholic" : "Non-Alcoholic"}</CardDescription>
        </div>

        {ratingCount === 0 ? (
          <div className='flex flex-col justify-center items-center bg-gray-700 p-2 rounded-2xl'>
            <h3 className='text-2xl font-bold'>Unrated</h3>
            <p className='text-lg'>Be the First!</p>
          </div>
        ) : (
          <div className='flex flex-col'>
            <StarRating rating={avgRating} onRate={handleStarClicked} />
            <div className='flex text-xl gap-x-1.5 justify-center items-center'>
              <h3 className='text-amber-400'>{avgRating}/5</h3>
              <p>({ratingCount})</p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className='flex lg:flex-row flex-col justify-center items-center gap-y-5'>
        <div className='flex flex-col gap-y-5'>
          <Image priority className='rounded-md' src={`${bucket_url}${image_url}`} alt={name} width={360} height={360} />
          {userRated != -1 ? (
            <div className='flex flex-col justify-center items-center gap-y-2'>
              <h3 className='text-center text-2xl font-bold'>Your Rating: {userRated} Stars</h3>
              <StarRating rating={userRated} onRate={handleStarClicked} />
              <Button type='button' onClick={updateExistingRating} variant={"default"} className='bg-blue-500 text-lg px-3 cursor-pointer'>Update Rating</Button>
            </div>
          ) : (
            <div>
              <h3 className='text-center text-2xl font-bold'>Select Your Rating:</h3>
              <StarRating rating={selectedRating} onRate={handleStarClicked} />
            </div>)
          }
        </div>
        <div className={`flex-1 flex flex-col items-center justify-start gap-y-3 ${drink_ingredients.length <= 5 && 'md:py-10 md:pt-0 pt-8'}`}>
          <h2 className='md:text-4xl text-2xl font-semibold text-center'>Ingredients:</h2>
          <ul className={`flex flex-col gap-y-2 text-left `}>
            {drink_ingredients.map((ingred, index) => (
              <li className='md:text-3xl text-2xl' key={index}>{ingred.ingredient} {ingred.quantity === 0 ? "" : `- ${ingred.quantity}`} {ingred.unit === "" ? "" : ingred.unit} {ingred.details === "" || ingred.details === null ? "" : `- ${ingred.details}`}</li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className='flex flex-col gap-y-3'>
        <CardDescription className='self-start flex flex-col gap-3 px-2 text-2xl text-left'>
          <h2 className='text-3xl font-semibold text-left'>Instructions:</h2>
          {instructions.split(".").map((sentence, index) => {

            if (sentence === "") {
              return;
            }

            return (
              <li key={index} className=''>{sentence}</li>
            )
          })}
        </CardDescription>
      </CardFooter>
      <Dialog open={openDialog}>
        <DialogContent className="xs:max-w-[360px] w-[90%] bg-orange-100" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className='text-center text-2xl'>Submit Your Rating</DialogTitle>
            <DialogDescription className='text-center text-xl font-semibold'>You selected {selectedRating}/5 Stars!</DialogDescription>
          </DialogHeader>
          <DialogFooter className='flex xs:flex-row xs:justify-center xs:items-center'>
            <Button type='button' onClick={() => handleDrinkRating(true)} className='bg-orange-400 text-lg'>Rate!</Button>
            <Button type='button' onClick={() => handleDrinkRating(false)} className='bg-red-400 text-lg'>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DrinkFullView