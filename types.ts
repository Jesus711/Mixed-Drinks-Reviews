type FormData = {
  email: string
  password: string
  name?: string
}

type Ingredient = {
  idDrink: number,
  id: number,
  ingredient: string,
  IngredientNumber: number,
  measurement: string,
}

type Drink = {
  idDrink: number,
  name: string,
  category: string,
  alcoholic: string,
  glass: string,
  instructions: string,
  image: string,
  tags: string,
  dateModified: string,
  DrinkIngredients: Ingredient[]
}



export type {
    FormData,
    Drink,
    Ingredient
}