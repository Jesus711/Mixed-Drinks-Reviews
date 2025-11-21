import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
    Command,
    CommandInput,
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandGroup,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { ingreds, units } from "../constants";
import { Measurement } from '@/types';

type IngredientRow = {
    id: number
    data: Measurement,
    onChange: (id: number, col: string, value: string | number | null) => void
    handleDelete: (id: number) => void
}


const IngredientRow = ({ id, data, onChange, handleDelete }: IngredientRow) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <FieldGroup className='flex flex-row justify-between items-end'>
            <Field className='flex-1/2'>
                {id === 0 && <FieldLabel htmlFor='ingredient' className='sm:text-xl'>Name*</FieldLabel>}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className='bg-slate-900'>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="sm:text-lg justify-between"

                        >
                            {data.name
                                ? ingreds.find((ingredient) => ingredient.value === data.name)?.value
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
                                                onChange(id, "name", currentValue === data.name ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            {ingredient.label}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    data.name === ingredient.label ? "opacity-100" : "opacity-0"
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
                {id === 0 && <FieldLabel htmlFor='quantity' className='sm:text-xl'>Quantity</FieldLabel>}
                <Input name='quantity' value={data.quantity} type='number' onChange={(e) => onChange(id, "quantity", e.target.value)}
                    className="bg-slate-900 border-gray-700 text-orange-400 focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg" />
            </Field>

            <Field className='flex-1/6'>
                {id === 0 && <FieldLabel className='sm:text-xl'>Unit</FieldLabel>}
                <Select value={data.unit} onValueChange={(value) => onChange(id, "unit", value)}>
                    <SelectTrigger className='bg-slate-900 text-lg'>
                        <SelectValue placeholder="Enter Unit"></SelectValue>
                    </SelectTrigger>
                    <SelectContent className=' bg-slate-900 text-orange-400 max-h-[200px]'>
                        {units.map((unit, index) => (<SelectItem className="sm:text-xl text-lg hover:bg-slate-700" value={unit} key={index}>{unit}</SelectItem>))}
                    </SelectContent>
                </Select>
            </Field>

            <Field className='flex-1/3'>
                {id === 0 && <FieldLabel htmlFor='details' className='sm:text-xl'>Details</FieldLabel>}
                <Input name='details' type='text' value={data.details} onChange={(e) => onChange(id, "details", e.target.value)}
                    className="bg-slate-900 border-gray-700 text-orange-400 focus:border-orange-400 focus:ring-orange-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg" />
            </Field>

            <Button type='button' variant={"default"} onClick={() => handleDelete(id)} className='hover:cursor-pointer bg-blue-500 text-white'>Delete</Button>
        </FieldGroup>
    )
}

export default IngredientRow