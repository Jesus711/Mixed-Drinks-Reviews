'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Drink } from "@/types"
import { supabase } from "@/lib/supabaseClient"
import Loading from "@/components/Loading"
import DrinkFullView from "@/components/DrinkFullView"
import FullViewCardSkeleton from "@/components/FullViewCardSkeleton"
import { Button } from "@/components/ui/button"
import { PencilLine, TrashIcon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"


const DrinkPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [drink, setDrink] = useState<Drink | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [userID, setUserID] = useState<string>("");
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    useEffect(() => {

        const getUser = async () => {
            const { data: {user}, error } = await supabase.auth.getUser();
            if (error) {
                console.log(error);
            }

            if (user === null){
                return;
            }
            setUserID(user.id);
        }

        const getDrinkInfo = async () => {
            const { data, error }  = await supabase.from("drinks2").select("*, drink_ingredients(*)").eq("id", id).single();

            if (error){
                console.log(error)
            } else {
                setDrink(data)
            }

            setLoading(false)
        }

        getDrinkInfo()
        getUser()

    }, [id])


    const handleDrinkDelete = async (toDelete: boolean) => {

        if (!toDelete) {
            setOpenDialog(false)
            return;
        }

        const { data, error } = await supabase.from("drinks2").delete().eq("id", id);
        if (error) {
            console.log(error);
        }

        setOpenDialog(false)

        toast.success("Drink was deleted!")
        router.replace("/home")
    }
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center gap-y-5">
                <Loading />
                <FullViewCardSkeleton />
            </div>
        )
    }


  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-y-4">
        {userID !== "" && drink?.created_by === userID && 
            <div className="flex xs:flex-row flex-col xs:gap-x-3 gap-y-3 justify-center items-center">
                <Link href={`/drink/${drink.id}/edit`} className="flex p-2 gap-x-2 font-bold rounded-md text-white text-xl bg-blue-400 hover:cursor-pointer xs:w-auto w-[200px]"><PencilLine size={30} />Edit Drink</Link>
                <button onClick={() => setOpenDialog(true)} className="flex p-2 gap-x-2 font-bold rounded-md text-white text-xl bg-red-400 hover:cursor-pointer xs:w-auto w-[200px]"><TrashIcon size={30} />Delete Drink</button>
            </div>
            }
            
        {drink !== null ? <DrinkFullView {...drink} /> : (
            <Loading message="ERRROR. This Drink was deleted...." />
        )}

        <Dialog open={openDialog}>
        <DialogContent className="xs:max-w-[360px] w-[90%] bg-orange-100" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className='text-center text-xl'>Are you sure you want to delete this drink?</DialogTitle>
          </DialogHeader>
          <DialogFooter className='flex xs:flex-row xs:justify-center xs:items-center'>
            <Button type='button' onClick={() => handleDrinkDelete(true)} className='bg-red-400 text-lg hover:cursor-pointer'>Delete</Button>
            <Button type='button' onClick={() => handleDrinkDelete(false)} className='bg-orange-400 text-lg hover:cursor-pointer'>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DrinkPage