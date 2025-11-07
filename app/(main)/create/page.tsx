'use client';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectGroup, SelectValue } from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Plus, PlusIcon, TrashIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandGroup,
} from '@/components/ui/command';
import { toast } from "sonner";
import { cn } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { supabase } from '@/lib/supabaseClient';

interface Measurement {
    name: string,
    quantity: number,
    unit: string,
    details: string,
}

const Create = () => {
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [alcoholic, setAlcoholic] = useState<string>("Yes");
    const [glass, setGlass] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [ingredients, setIngredients] = useState<Measurement[]>([]);
    const [ingredientName, setIngredientName] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);
    const [unit, setUnit] = useState<string>("");
    const [details, setDetails] = useState<string>("");
    const [image, setImage] = useState<File | null | undefined>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [userID, setUserID] = useState<string>("");

    const units = ["bottle",
        "can",
        "cl",
        "cup",
        "dash",
        "jigger",
        "kg",
        "l",
        "lb",
        "ml",
        "oz",
        "part",
        "piece",
        "pinch",
        "qt",
        "scoop",
        "shot",
        "slice",
        "tbsp",
        "tsp",];
    const glasses = ["Balloon Glass",
        "Beer Glass",
        "Beer mug",
        "Beer pilsner",
        "Brandy snifter",
        "Champagne flute",
        "Champagne Flute",
        "Cocktail glass",
        "Cocktail Glass",
        "Coffee mug",
        "Coffee Mug",
        "Collins glass",
        "Collins Glass",
        "Copper Mug",
        "Cordial glass",
        "Coupe Glass",
        "Highball glass",
        "Highball Glass",
        "Hurricane glass",
        "Irish coffee cup",
        "Jar",
        "Margarita glass",
        "Margarita/Coupette glass",
        "Martini Glass",
        "Mason jar",
        "Old-fashioned glass",
        "Old-Fashioned glass",
        "Parfait glass",
        "Pint glass",
        "Pitcher",
        "Pousse cafe glass",
        "Punch bowl",
        "Punch Bowl",
        "Shot glass",
        "Shot Glass",
        "Whiskey Glass",
        "Whiskey sour glass",
        "White wine glass",
        "Wine Glass",]

    const ingreds = [
        // Wines
        { label: "Red Wine", value: "Red Wine" },
        { label: "White Wine", value: "White Wine" },
        { label: "Rosé Wine", value: "Rosé Wine" },
        { label: "Sparkling Wine", value: "Sparkling Wine" },
        { label: "Dessert Wine", value: "Dessert Wine" },
        { label: "Fortified Wine", value: "Fortified Wine" },

        // Beers
        { label: "Lager", value: "Lager" },
        { label: "Pilsner", value: "Pilsner" },
        { label: "Ale", value: "Ale" },
        { label: "Pale Ale", value: "Pale Ale" },
        { label: "India Pale Ale (IPA)", value: "India Pale Ale (IPA)" },
        { label: "Brown Ale", value: "Brown Ale" },
        { label: "Porter", value: "Porter" },
        { label: "Stout", value: "Stout" },
        { label: "Wheat Beer", value: "Wheat Beer" },
        { label: "Sour Beer", value: "Sour Beer" },
        { label: "Craft Beer", value: "Craft Beer" },

        // Spirits
        { label: "Vodka", value: "Vodka" },
        { label: "Gin", value: "Gin" },
        { label: "Whiskey", value: "Whiskey" },
        { label: "Bourbon", value: "Bourbon" },
        { label: "Scotch", value: "Scotch" },
        { label: "Rye Whiskey", value: "Rye Whiskey" },
        { label: "Irish Whiskey", value: "Irish Whiskey" },
        { label: "Rum", value: "Rum" },
        { label: "White Rum", value: "White Rum" },
        { label: "Dark Rum", value: "Dark Rum" },
        { label: "Spiced Rum", value: "Spiced Rum" },
        { label: "Tequila", value: "Tequila" },
        { label: "Blanco Tequila", value: "Blanco Tequila" },
        { label: "Reposado Tequila", value: "Reposado Tequila" },
        { label: "Añejo Tequila", value: "Añejo Tequila" },
        { label: "Brandy", value: "Brandy" },
        { label: "Cognac", value: "Cognac" },
        { label: "Armagnac", value: "Armagnac" },
        { label: "Mezcal", value: "Mezcal" },

        // Liqueurs
        { label: "Amaretto", value: "Amaretto" },
        { label: "Baileys Irish Cream", value: "Baileys Irish Cream" },
        { label: "Triple Sec", value: "Triple Sec" },
        { label: "Cointreau", value: "Cointreau" },
        { label: "Grand Marnier", value: "Grand Marnier" },
        { label: "Kahlúa", value: "Kahlúa" },
        { label: "Sambuca", value: "Sambuca" },
        { label: "Chartreuse", value: "Chartreuse" },
        { label: "Campari", value: "Campari" },
        { label: "Aperol", value: "Aperol" },
        { label: "Vermouth (Sweet)", value: "Vermouth (Sweet)" },
        { label: "Vermouth (Dry)", value: "Vermouth (Dry)" },

        // Other Fermented Drinks
        { label: "Cider", value: "Cider" },
        { label: "Perry", value: "Perry" },
        { label: "Saké", value: "Saké" },
        { label: "Mead", value: "Mead" },
        { label: "Soju", value: "Soju" },
        { label: "Baijiu", value: "Baijiu" },]


    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            toast.warning("Must create an account to create drinks!")
            return
        }

        setUserID(user.id);
    }

    const handleIngredientAdded = () => {
        const found = ingreds.find(item => item.value === ingredientName);

        if (found === undefined) {
            toast.error("Error", {
                description: "An ingredient must be selected!",
            })
            return;
        }


        let measurement: Measurement = {
            name: ingredientName,
            quantity: quantity,
            unit: unit,
            details: details
        }

        console.log(measurement);

        setIngredients(prev => [...prev, measurement])
        setIngredientName("")
        setQuantity(0)
        setUnit("")
        setDetails("")

        toast("Ingredient Added", {
            description: `You added ${measurement.name} to you drink!`,
        })
    }


    const handleRemoveIngredient = (index: number) => {

        setIngredients(prev => prev.filter((_, i) => i !== index))
    }

    const handleDrinkForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(image === null){
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

        const image_name = `${crypto.randomUUID()}-${image!.name}`
        const image_path = `drink_images/${image_name}`


        const { data: image_data, error: imageError } = await supabase.storage.from("drink_images").upload(image_name, image!, {
            cacheControl: '3600',
            upsert: false,
        });

        if (imageError){
            console.log(imageError);
            return;
        }

        console.log(image_data)

        const drink = {
            name,
            category,
            alcoholic,
            glass,
            image_url: image_path,
            instructions,
        }
        
        console.log("Inserting the infomation");
        console.log(drink)
        console.log(ingredients)

        const { data: drinkData, error: drinkError } = await supabase.rpc("insert_new_drink", {
            drink_data: drink,
            ingredients_data: ingredients,
        })

        if (drinkError) {
            console.log(drinkError);
            toast.error(drinkError.message)
            return;
        }

        console.log(drinkData);


        setName("")
        setAlcoholic("")
        setCategory("")
        setGlass("")
        setImage(null)
        setInstructions("")

        // Ingredients States
        setIngredients([])
        setIngredientName("")
        setQuantity(0)
        setUnit("")
        setDetails("")

        toast.success("Success!", {
            description: "Your drink was created!"
        })

    }


    useEffect(() => {
        checkUser()
    }, [])


    return (
        <div className='flex flex-col justify-center items-center gap-5 text-orange-400'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='md:text-3xl text-xl font-bold'>Creating a new Mixed Drink!</h1>
                <p className='md:text-xl text-lg text-blue-400'>Mixed drinks require at least 2 ingredients.</p>
            </div>

            <Card className='border-2 p-5 bg-slate-800'>
                <form className='xl:w-[1150px] md:w-[600px] w-full flex flex-col justify-center items-center gap-8' onSubmit={handleDrinkForm}>
                    <FieldGroup className='flex flex-row'>
                        <Field className='flex-2'>
                            <FieldLabel htmlFor='name' className='sm:text-xl'>Drink Name*</FieldLabel>
                            <Input name='name' className="bg-slate-900 border-gray-700 text-orange-400 focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg"
                                type="text" placeholder="Screwdriver..." required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                minLength={3}
                            />
                        </Field>

                        <Field className='flex-1'>
                            <FieldLabel htmlFor='image' className='sm:text-xl'>Image*</FieldLabel>
                            <Input name='image' className="bg-slate-900 border-gray-700 text-secondary focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg"
                                type="file" placeholder="Screwdriver..." required
                                onChange={(e) => setImage(e.target.files?.[0])}
                                accept='image/*'
                            />
                        </Field>
                    </FieldGroup>


                    <FieldGroup className='flex flex-row'>
                        <Field className='flex-1/2'>
                            <FieldLabel className='sm:text-xl'>Contains Alcohol?*</FieldLabel>
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

                        <Field>
                            <FieldLabel className='sm:text-xl'>Category*</FieldLabel>
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

                        <Field>
                            <FieldLabel className='sm:text-xl'>Glass*</FieldLabel>
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

                    {/* <h2 className='sm:text-3xl underline text-center'>Ingredients:</h2> */}
                    {/* <ol className='list-decimal list-inside'>
                        {ingredients.length != 0 && ingredients.map((ingred, index) => (
                            <li key={index} className='flex flex-row justify-center items-center gap-6'>
                                <div className=''>{index + 1}.</div>
                                <div className=''>{ingred.name}</div>
                                <div className=''>{ingred.quantity === 0 ? "No QTY Added" : ingred.quantity}</div>
                                <div className=''>{ingred.unit === "" ? "No Unit Added" : ingred.unit}</div>
                                <div className=''>{ingred.details === "" ? "No Details Added" : ingred.details}</div>
                            </li>
                        ))}
                    </ol> */}
                    <div className='w-full flex flex-col gap-5'>
                        <h2 className='sm:text-3xl text-center underline'>Ingredients</h2>
                        {ingredients.length != 0 && <Table className='w-[80%] m-auto text-2xl'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Delete?</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ingredients.length != 0 && ingredients.map((ingred, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='min-w-[40px]'>{index + 1}.</TableCell>
                                        <TableCell className=''>{ingred.name}</TableCell>
                                        <TableCell className=''>{ingred.quantity === 0 ? "Not Added" : ingred.quantity}</TableCell>
                                        <TableCell className=''>{ingred.unit === "" ? "Not Added" : ingred.unit}</TableCell>
                                        <TableCell className=''>{ingred.details === "" ? "Not Added" : ingred.details}</TableCell>
                                        <TableCell className=''><Button type='button' onClick={() => handleRemoveIngredient(index)}><TrashIcon /></Button></TableCell>                                 
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>}
                    </div>


                    <FieldGroup className='flex flex-row justify-between items-end'>
                        <Field className='flex-1/2'>
                            <FieldLabel htmlFor='ingredient' className='sm:text-xl'>Name*</FieldLabel>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild className='bg-slate-900'>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="sm:text-lg justify-between"

                                    >
                                        {ingredientName
                                            ? ingreds.find((ingredient) => ingredient.value === ingredientName)?.value
                                            : "Select Ingredient..."}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] min-w-[var(--radix-popover-trigger-width)] p-0 bg-slate-900 text-orange-400">
                                    <Command>
                                        <CommandInput name='ingredient' placeholder="Search Ingredient..." className="sm:text-lg h-9 text-orange-400" />
                                        <CommandList> 
                                            <CommandEmpty className='flex justify-start items-center sm:text-lg p-3'>No Ingredient Found</CommandEmpty>
                                            <CommandGroup>
                                                {ingreds.map((ingredient, index) => (
                                                    <CommandItem
                                                        key={index}
                                                        value={ingredient.value}
                                                        className='flex justify-center items-center sm:text-lg p-2 hover:bg-slate-800'
                                                        onSelect={(currentValue) => {
                                                            setIngredientName(currentValue === ingredientName ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        {ingredient.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                ingredientName === ingredient.label ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </Field>

                        <Field className='flex-1/6'>
                            <FieldLabel htmlFor='quantity' className='sm:text-xl'>Quantity</FieldLabel>
                            <Input name='quantity' value={quantity} type='number' onChange={(e) => setQuantity(Number(e.target.value))}
                                className="bg-slate-900 border-gray-700 text-orange-400 focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg" />
                        </Field>

                        <Field className='flex-1/6'>
                            <FieldLabel className='sm:text-xl'>Unit</FieldLabel>
                            <Select value={unit} onValueChange={setUnit}>
                                <SelectTrigger className='bg-slate-900 text-lg'>
                                    <SelectValue placeholder="Enter Unit"></SelectValue>
                                </SelectTrigger>
                                <SelectContent className=' bg-slate-900 text-orange-400 max-h-[200px]'>
                                    {units.map((unit, index) => (<SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value={unit} key={index}>{unit}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </Field>

                        <Field className='flex-1/3'>
                            <FieldLabel htmlFor='details' className='sm:text-xl'>Details</FieldLabel>
                            <Input name='details' type='text' onChange={(e) => setDetails(e.target.value)}
                                className="bg-slate-900 border-gray-700 text-orange-400 focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg" />
                        </Field>

                        <Button type='button' variant={"default"} className='hover:cursor-pointer bg-blue-400' onClick={handleIngredientAdded}><PlusIcon className='text-white' strokeWidth={4} size={40} /></Button>
                    </FieldGroup>


                    <Field>
                        <FieldLabel htmlFor='instructions' className='sm:text-xl'>Instructions*</FieldLabel>
                        <Textarea name='instructions' className='bg-slate-900 md:text-xl placeholder:text-lg min-h-[200px]'
                            value={instructions} onChange={(e) => setInstructions(e.target.value)}
                            placeholder='Type instructions in here...' minLength={5}
                        />
                    </Field>

                    <Button variant={'default'} className='bg-blue-500 sm:text-2xl text-white max-w-[200px] p-4'>Create Drink</Button>
                </form>
            </Card>
        </div>
    )
}

export default Create