import { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drink } from '@/types'
import Image from 'next/image'
import StarRating from './StarRating'
import { supabase } from '@/lib/supabaseClient'



const DrinkFullView = ({ idDrink, name, category, alcoholic, glass, instructions, image, tags, dateModified, DrinkIngredients, avg_rating, rating_count }: Drink) => {
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

    console.log(user.id, idDrink);

    const { data, error } = await supabase.from("drink_ratings").select("rating").eq("user_id", user.id).eq('idDrink', idDrink).maybeSingle();

    if (data === null) {
      console.log("User has not rated this drink!")
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

      console.log(user?.id, selectedRating, "Rated!", idDrink)

      console.log({
        user_id: user?.id,
        idDrink,
        rating: selectedRating
      })

      let rating = {
        user_id: user?.id,
        idDrink: idDrink,
        rating: selectedRating
      }

      const { data, error } = await supabase.from("drink_ratings").upsert(rating, { onConflict: 'user_id, idDrink' });

      console.log(data, error)
      setUserRating(selectedRating)
      await updateRatingAvgCount()
    } else {
      setSelectedRating(-1)
    }
    
    setOpenDialog(false)
  }

  const updateRatingAvgCount = async () => {
    const { data: rating, error} = await supabase.from("drinks").select("avg_rating, rating_count").eq("idDrink", idDrink).single();

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
    <Card className="animate-fade-in min-w-[300px] max-w-4xl w-full border-orange-400 border-4 text-white h-full flex flex-col justify-between whitespace-wrap text-wrap">
      <CardHeader className='w-full flex-1 flex justify-between items-center'>
        <div className=''>
          <CardTitle className='text-3xl'>{name}</CardTitle>
          <CardDescription className='text-2xl'>{alcoholic}</CardDescription>
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

      <CardContent className='flex'>
        <div className='flex flex-col gap-y-5'>
          <Image priority className='rounded-md' src={`/cocktail_images/${idDrink}.jpg`} alt={name} width={360} height={360} />
          {userRated != -1 ? (
            <div className='flex flex-col justify-center items-center gap-y-1'>
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
        <div className={`flex-1 flex flex-col items-center justify-start gap-y-3 ${DrinkIngredients.length <= 5 && 'py-10'}`}>
          <h2 className='text-4xl font-semibold text-center'>Ingredients:</h2>
          <ul className={`flex flex-col gap-y-2 text-left `}>
            {DrinkIngredients.map((ingred, index) => (
              <li className='text-3xl' key={index}>{ingred.ingredient} - {ingred.measurement}</li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className='flex flex-col gap-y-2'>
        <div className='flex flex-wrap justify-center items-center text-black gap-x-3'>
          <span className="bg-white p-2 text-lg rounded-md">{category}</span>
          <span className="bg-white p-2 text-lg rounded-md">{glass}</span>
          {tags.split(",").map((tag, index) => {

            if (tag == "") {
              return;
            }

            return (
              <span className="bg-white p-2 text-lg rounded-md" key={index}>{tag}</span>
            )
          })}
        </div>

        <CardDescription className='text-2xl text-left'>
          <h2 className='text-3xl font-semibold text-left'>Instructions:</h2>
          {instructions.split(".").map((sentence, index) => {

            if (sentence === "") {
              return;
            }

            return (
              <li key={index}>{sentence}</li>
            )
          })}
        </CardDescription>
      </CardFooter>
      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[360px] bg-orange-100" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className='text-center text-xl'>Submit Your Rating: {selectedRating}/5 Stars!</DialogTitle>
          </DialogHeader>
          <DialogFooter className='sm:flex sm:justify-center sm:items-center'>
            <Button type='button' onClick={() => handleDrinkRating(false)} className='bg-red-400 text-lg'>Cancel</Button>
            <Button type='button' onClick={() => handleDrinkRating(true)} className='bg-orange-400 text-lg'>Rate!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DrinkFullView