'use client';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectGroup, SelectValue } from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from '@/lib/supabaseClient';
import { glasses } from "../../../constants";
import IngredientRow from '@/components/IngredientRow';
import { Measurement } from '@/types';
import { useRouter } from 'next/navigation';

const Create = () => {
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [alcoholic, setAlcoholic] = useState<string>("Yes");
    const [glass, setGlass] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [ingredients, setIngredients] = useState<Measurement[]>(Array(2).fill({ name: "", quantity: 0, unit: "", details: "" }));
    const [image, setImage] = useState<File | null | undefined>(null);
    const [userID, setUserID] = useState<string>("");

    const router = useRouter();

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            toast.warning("Must create an account to create drinks!", {
                duration: 2000
            })
            router.push("/browse")
            return
        }

        setUserID(user.id)
    }


    const handleIngredientRowChange = (id: number, column: string, value: string | number | null) => {
        const data = { [column]: value }
        setIngredients((prev) => prev.map((row, index) => index === id ? { ...row, [column]: value } : row))
    }

    const handleIngredientRowDelete = (id: number) => {
        setIngredients((prev) => prev.filter((row, index) => index !== id))
    }


    const addIngredientRow = () => {

        let newRow: Measurement = {
            name: "",
            quantity: 0,
            unit: "",
            details: ""
        }

        setIngredients((prev) =>
            [...prev, newRow])
    }

    const handleDrinkForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (image === null) {
            toast.error("Error", {
                description: "Make sure to fill out all required fields.",
            })
        }
        if (ingredients.length < 2) {
            toast.error("Error", {
                description: "You must add at least 2 ingredients!",
            })

            return;
        }
        
        for (let i = 0; i < ingredients.length; i++) {
            if (ingredients[i].name === ""){
                toast.error("Error", {
                    description: "Make sure to fill out the Name for each ingredient",
            })

            return; 
            }
        }

        const image_name = `${userID}/${crypto.randomUUID()}-${image!.name}`
        const image_path = `drink_images/${image_name}`

        const { data: image_data, error: imageError } = await supabase.storage.from("drink_images").upload(image_name, image!, {
            cacheControl: '3600',
            upsert: false,
        });

        if (imageError) {
            console.log(imageError);
            return;
        }

        const drink = {
            name,
            category,
            alcoholic,
            glass,
            image_url: image_path,
            instructions,
        }


        const { data: drinkData, error: drinkError } = await supabase.rpc("insert_new_drink", {
            drink_data: drink,
            ingredients_data: ingredients,
        })

        if (drinkError) {
            console.log(drinkError);
            toast.error(drinkError.message)
            return;
        }

        // Drink Info states
        setName("")
        setAlcoholic("Yes")
        setCategory("")
        setGlass("")
        setImage(null)
        setInstructions("")

        // Set back to 2 empty ingredients
        setIngredients(Array(2).fill({ name: "", quantity: 0, unit: "", details: "" }))


        toast.success("Success!", {
            description: "Your drink was created!",
            action: {
                label: "View Drink",
                onClick: () => {router.push(`/drink/${drinkData}`)}
            }
        })

    }


    useEffect(() => {
        checkUser()
    }, [])


    return (
        <div className='flex flex-col justify-center items-center gap-5 text-orange-400'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='md:text-3xl sm:text-xl font-bold'>Creating a new Mixed Drink!</h1>
                <p className='md:text-xl sm:text-lg text-blue-400'>Mixed drinks require at least <span className='font-bold'>2*</span> ingredients.</p>
            </div>

            <Card className='p-5 bg-linear-to-b from-slate-800 to-slate-900 md:w-[80%] w-[90%]'>
                <form className='flex flex-col justify-center items-center lg:gap-8 gap-4' onSubmit={handleDrinkForm}>
                    <FieldGroup className='flex md:flex-row flex-col gap-4'>
                        <Field className='lg:flex-2 flex-1/2'>
                            <FieldLabel htmlFor='name' className='lg:text-xl text-lg'>Drink Name*</FieldLabel>
                            <Input name='name' className="bg-slate-900 border-gray-700 text-orange-400 focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg"
                                type="text" placeholder="Screwdriver..." required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                minLength={3}
                            />
                        </Field>

                        <Field className='lg:flex-1 flex-1/3'>
                            <FieldLabel htmlFor='image' className='lg:text-xl text-lg'>Image*</FieldLabel>
                            <Input name='image' className="bg-slate-900 border-gray-700 text-secondary focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg"
                                type="file" placeholder="Screwdriver..." required
                                onChange={(e) => setImage(e.target.files?.[0])}
                                accept='image/*'
                            />
                        </Field>
                    </FieldGroup>


                    <FieldGroup className='flex md:flex-row gap-3'>
                        <Field className='xl:flex-1/2 lg:flex-1/5'>
                            <FieldLabel className='lg:text-xl text-lg xs:justify-start justify-center'>Contains Alcohol?*</FieldLabel>
                            <Select defaultValue='Yes' value={alcoholic} onValueChange={setAlcoholic} required>
                                <SelectTrigger className='bg-slate-900 text-lg'>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className=' bg-slate-900 text-orange-400'>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Yes'>Yes</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='No'>No</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Optional'>Optional</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field className='xl:flex-1/2 lg:flex-1/4'>
                            <FieldLabel className='lg:text-xl text-lg xs:justify-start justify-center'>Category*</FieldLabel>
                            <Select value={category} onValueChange={setCategory} required>
                                <SelectTrigger className='bg-slate-900 text-lg'>
                                    <SelectValue placeholder="Choose Category"></SelectValue>
                                </SelectTrigger>
                                <SelectContent className=' bg-slate-900 text-orange-400'>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Beer'>Beer</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Cocktail'>Cocktail</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Cocoa'>Cocoa</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Coffee / Tea'>Coffee / Tea</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Homemade Liqueur'>Homemade Liqueur</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Ordinary Drink'>Ordinary Drink</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Party Drink'>Punch / Party Drink</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Shake'>Shake</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Shot'>Shot</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Soft Drink'>Soft Drink</SelectItem>
                                    <SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value='Other'>Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field className='xl:flex-1/2 lg:flex-1/3'>
                            <FieldLabel className='lg:text-xl text-lg xs:justify-start justify-center'>Glass*</FieldLabel>
                            <Select value={glass} onValueChange={setGlass} required>
                                <SelectTrigger className='bg-slate-900 text-lg'>
                                    <SelectValue placeholder="Choose Glass"></SelectValue>
                                </SelectTrigger>
                                <SelectContent className=' bg-slate-900 text-orange-400'>
                                    {glasses.map((glass, index) => (<SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value={glass} key={index}>{glass}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>

                    <div className='w-full flex flex-col gap-5 justify-center items-center'>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <h2 className='lg:text-3xl sm:text-2xl text-xl text-center font-bold'>Ingredients*</h2>
                            <hr className='bg-orange-400 h-0.5 sm:w-[200px] w-[120px]'></hr>
                        </div>

                        {ingredients.map((_, index) => (
                            <IngredientRow key={index} id={index} data={ingredients[index]} onChange={handleIngredientRowChange} handleDelete={handleIngredientRowDelete} />
                        ))}
                        <Button type='button' variant={"default"} className='hover:cursor-pointer bg-blue-500 text-white lg:text-xl text-lg' onClick={addIngredientRow}><PlusIcon className='text-white lg:w-5 lg:h-5 w-4 h-4' strokeWidth={4} /> Add Ingredient Row</Button>
                    </div>

                    <Field>
                        <FieldLabel htmlFor='instructions' className='text-xl'>Instructions*</FieldLabel>
                        <Textarea name='instructions' className='bg-slate-900 md:text-xl placeholder:text-lg min-h-[200px]'
                            value={instructions} onChange={(e) => setInstructions(e.target.value)}
                            placeholder='Type instructions in here...' minLength={5}
                        />
                    </Field>

                    <Button variant={'default'} className='bg-blue-500 lg:text-2xl text-xl text-white max-w-[200px] p-4'>Create Drink</Button>
                </form>
            </Card>
        </div>
    )
}

export default Create