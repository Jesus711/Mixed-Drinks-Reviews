import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { supabase } from '@/lib/supabaseClient';

type Props = {
  max?: number;
  onRate?: (value: number) => void;
  defaultValue?: number,
  idDrink: number,
  rating_count: number,
  userRated: boolean
};

export default function StarRating({ max = 5, onRate, defaultValue, idDrink, rating_count, userRated }: Props) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDrinkRating = async () => {

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

    const { data, error } = await supabase.from("drink_ratings").upsert(rating, {onConflict: 'user_id, idDrink'});

    console.log(data, error)
    setOpenDialog(false)

  }

  const isReadOnly = typeof defaultValue === 'number';

  const handleCancelRating = () => {
    setHoverRating(0)
    setSelectedRating(0)
    setOpenDialog(false)
  }

  const handleMouseEnter = (value: number) => {
    if (!selectedRating) setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (!selectedRating) setHoverRating(0);
  };

  const handleClick = (value: number) => {

    setSelectedRating(value);
    setOpenDialog(true)
    if (onRate) onRate(value);
  };

  const getIcon = (index: number) => {
    let rating;
    if (defaultValue) {
      rating = defaultValue
    }
    else {
      rating = selectedRating || hoverRating;
    }

    if (rating >= index + 1) return <FaStar className="text-orange-400 w-10 h-10" />;
    if (rating >= index + 0.5) return <FaStarHalfAlt className="text-orange-400 w-10 h-10" />;
    return <FaRegStar className="text-gray-400 w-10 h-10" />;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-2">
      <div
        className={`flex space-x-1 ${!isReadOnly && 'cursor-pointer'}`}
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className="relative w-10 h-10"
            onMouseMove={
              isReadOnly
                ? undefined
                : (e) => {
                  const { left, width } = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - left;
                  const isHalf = x < width / 2;
                  handleMouseEnter(i + (isHalf ? 0.5 : 1))
                }
            }
            onClick={isReadOnly ? undefined : () => handleClick(hoverRating)}
          >
            {getIcon(i)}
          </div>
        ))}
      </div>
      {userRated &&
        <div className='flex justify-center items-center'>
          <Button type='button' onClick={() => console.log("HERE MOVE to DIALOG?")} variant={"default"} className='bg-blue-500 text-lg px-3 cursor-pointer'>Update Rating</Button>
        </div>
      }

      {defaultValue && !userRated && <div className='flex text-xl gap-x-1.5 justify-center items-center'>
        <h3 className='text-amber-400'>{defaultValue}/5</h3>
        <p>({rating_count})</p>
      </div>
      }

      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[360px] bg-orange-100" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className='text-center text-xl'>Submit Your Rating: {selectedRating}/5 Stars!</DialogTitle>
          </DialogHeader>
          <DialogFooter className='sm:flex sm:justify-center sm:items-center'>
            <Button type='button' onClick={handleCancelRating} className='bg-red-400 text-lg'>Cancel</Button>
            <Button type='button' onClick={handleDrinkRating} className='bg-orange-400 text-lg'>Rate!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
