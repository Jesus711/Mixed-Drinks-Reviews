type FormData = {
  email: string
  password: string
  name?: string
}

type Ingredient = {
  drink_id: number,
  ingredient: string,
  number: number,
  quantity: number,
  unit: string,
  details: string,
}

type IngredientItem = {
  label: string,
  value: string
}

type IngredientGroup = {
  group: string,
  items: IngredientItem[]
}

type Drink = {
  id: number,
  name: string,
  category: string,
  alcoholic: string,
  glass: string,
  instructions: string,
  image_url: string,
  last_modified: string,
  created_date: string,
  created_by: string,
  drink_ingredients: Ingredient[],
  avg_rating: number,
  rating_count: number
}

type DrinkSection = {
  title: string,
  data: Drink[]
}


type Measurement = {
    name: string,
    quantity: number,
    unit: string,
    details: string,
}

type IngredientRowProps = {
    id: number
    data: Measurement,
    onChange: (id: number, col: string, value: string | number | null) => void
    handleDelete: (id: number) => void
}




export type {
    FormData,
    Drink,
    Ingredient,
    IngredientGroup,
    IngredientItem,
    DrinkSection,
    Measurement,
    IngredientRowProps
}