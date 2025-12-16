import { IngredientGroup } from "./types";

const units = [
  // --- Core cocktail measures ---
  "oz",
  "ml",
  "shot",
  "jigger",
  "dash",
  "part",
  "tsp",
  "tbsp",
  "pinch",
  "splash",

  // --- Small / precision ---
  "drop",
  "rinse",

  // --- Containers / servings ---
  "glass",
  "cup",
  "bottle",
  "can",

  // --- Garnishes / solids ---
  "cube",
  "slice",
  "wedge",
  "piece",
  "sprig",
  "leaf",
  "scoop",

  // --- Metric & large volume ---
  "cl",
  "l",
  "qt",

  // --- Weight (least common in cocktails) ---
  "lb",
  "kg",
];


const glasses = ["Balloon Glass",
    "Beer Glass",
    "Beer mug",
    "Beer pilsner",
    "Brandy snifter",
    "Champagne flute",
    "Cocktail glass",
    "Coffee mug",
    "Collins glass",
    "Copper Mug",
    "Cordial glass",
    "Coupe Glass",
    "Highball glass",
    "Hurricane glass",
    "Irish coffee cup",
    "Jar",
    "Margarita glass",
    "Margarita/Coupette glass",
    "Martini Glass",
    "Mason jar",
    "Old-Fashioned glass",
    "Parfait glass",
    "Pint glass",
    "Pitcher",
    "Pousse cafe glass",
    "Punch bowl",
    "Shot glass",
    "Whiskey Glass",
    "Whiskey sour glass",
    "White wine glass",
    "Wine Glass",]

const ingreds = [

    // =========================
    // Spirits
    // =========================
    { label: "151 Proof Rum", value: "151 Proof Rum" },
    { label: "Absinthe", value: "Absinthe" },
    { label: "Aquavit", value: "Aquavit" },
    { label: "Baijiu", value: "Baijiu" },
    { label: "Blended Scotch", value: "Blended Scotch" },
    { label: "Blended Whiskey", value: "Blended Whiskey" },
    { label: "Bourbon", value: "Bourbon" },
    { label: "Brandy", value: "Brandy" },
    { label: "Cachaca", value: "Cachaca" },
    { label: "Cognac", value: "Cognac" },
    { label: "Everclear", value: "Everclear" },
    { label: "Firewater", value: "Firewater" },
    { label: "Gin", value: "Gin" },
    { label: "Grain Alcohol", value: "Grain Alcohol" },
    { label: "Irish Whiskey", value: "Irish Whiskey" },
    { label: "Islay Single Malt Scotch", value: "Islay Single Malt Scotch" },
    { label: "Mezcal", value: "Mezcal" },
    { label: "Ouzo", value: "Ouzo" },
    { label: "Pisco", value: "Pisco" },
    { label: "Rum", value: "Rum" },
    { label: "Rye Whiskey", value: "Rye Whiskey" },
    { label: "Scotch", value: "Scotch" },
    { label: "Soju", value: "Soju" },
    { label: "Tequila", value: "Tequila" },
    { label: "Tennessee Whiskey", value: "Tennessee Whiskey" },
    { label: "Vodka", value: "Vodka" },
    { label: "Whiskey", value: "Whiskey" },

    // =========================
    // Beers & Ciders
    // =========================
    { label: "Ale", value: "Ale" },
    { label: "Beer", value: "Beer" },
    { label: "Brown Ale", value: "Brown Ale" },
    { label: "Cider", value: "Cider" },
    { label: "Craft Beer", value: "Craft Beer" },
    { label: "Guinness Stout", value: "Guinness Stout" },
    { label: "India Pale Ale (IPA)", value: "India Pale Ale (IPA)" },
    { label: "Lager", value: "Lager" },
    { label: "Pale Ale", value: "Pale Ale" },
    { label: "Pilsner", value: "Pilsner" },
    { label: "Porter", value: "Porter" },
    { label: "Sour Beer", value: "Sour Beer" },
    { label: "Stout", value: "Stout" },
    { label: "Wheat Beer", value: "Wheat Beer" },

    // =========================
    // Liqueurs & Cordials
    // =========================
    { label: "Advocaat", value: "Advocaat" },
    { label: "Amaretto", value: "Amaretto" },
    { label: "Amaro Montenegro", value: "Amaro Montenegro" },
    { label: "Anisette", value: "Anisette" },
    { label: "Aperol", value: "Aperol" },
    { label: "Baileys Irish Cream", value: "Baileys Irish Cream" },
    { label: "Benedictine", value: "Benedictine" },
    { label: "Blue Curacao", value: "Blue Curacao" },
    { label: "Campari", value: "Campari" },
    { label: "Chambord Raspberry Liqueur", value: "Chambord Raspberry Liqueur" },
    { label: "Chartreuse", value: "Chartreuse" },
    { label: "Cointreau", value: "Cointreau" },
    { label: "Coffee Liqueur", value: "Coffee Liqueur" },
    { label: "Creme De Banane", value: "Creme De Banane" },
    { label: "Creme De Cacao", value: "Creme De Cacao" },
    { label: "Creme De Cassis", value: "Creme De Cassis" },
    { label: "Frangelico", value: "Frangelico" },
    { label: "Galliano", value: "Galliano" },
    { label: "Godiva Liqueur", value: "Godiva Liqueur" },
    { label: "Grand Marnier", value: "Grand Marnier" },
    { label: "Green Chartreuse", value: "Green Chartreuse" },
    { label: "Hpnotiq", value: "Hpnotiq" },
    { label: "Jägermeister", value: "Jägermeister" },
    { label: "Kahlúa", value: "Kahlúa" },
    { label: "Midori Melon Liqueur", value: "Midori Melon Liqueur" },
    { label: "Sambuca", value: "Sambuca" },
    { label: "St. Germain", value: "St. Germain" },
    { label: "Triple Sec", value: "Triple Sec" },
    { label: "Yellow Chartreuse", value: "Yellow Chartreuse" },

    // =========================
    // Wines
    // =========================
    { label: "Champagne", value: "Champagne" },
    { label: "Dessert Wine", value: "Dessert Wine" },
    { label: "Fortified Wine", value: "Fortified Wine" },
    { label: "Port", value: "Port" },
    { label: "Prosecco", value: "Prosecco" },
    { label: "Red Wine", value: "Red Wine" },
    { label: "Rosé Wine", value: "Rosé Wine" },
    { label: "Ruby Port", value: "Ruby Port" },
    { label: "Sherry", value: "Sherry" },
    { label: "Sparkling Wine", value: "Sparkling Wine" },
    { label: "White Wine", value: "White Wine" },
    { label: "Wine", value: "Wine" },

    // =========================
    // Mixers & Soft Drinks
    // =========================
    { label: "7-Up", value: "7-Up" },
    { label: "Bitter Lemon", value: "Bitter Lemon" },
    { label: "Club Soda", value: "Club Soda" },
    { label: "Coca-Cola", value: "Coca-Cola" },
    { label: "Dr. Pepper", value: "Dr. Pepper" },
    { label: "Ginger Ale", value: "Ginger Ale" },
    { label: "Ginger Beer", value: "Ginger Beer" },
    { label: "Lemon-Lime Soda", value: "Lemon-Lime Soda" },
    { label: "Root Beer", value: "Root Beer" },
    { label: "Sprite", value: "Sprite" },
    { label: "Tonic Water", value: "Tonic Water" },

    // =========================
    // Juices & Fruits
    // =========================
    { label: "Apple Juice", value: "Apple Juice" },
    { label: "Cranberry Juice", value: "Cranberry Juice" },
    { label: "Grapefruit Juice", value: "Grapefruit Juice" },
    { label: "Lemon Juice", value: "Lemon Juice" },
    { label: "Lime Juice", value: "Lime Juice" },
    { label: "Orange Juice", value: "Orange Juice" },
    { label: "Pineapple Juice", value: "Pineapple Juice" },
    { label: "Pomegranate Juice", value: "Pomegranate Juice" },

    // =========================
    // Sweeteners & Syrups
    // =========================
    { label: "Agave Syrup", value: "Agave Syrup" },
    { label: "Grenadine", value: "Grenadine" },
    { label: "Honey", value: "Honey" },
    { label: "Maple Syrup", value: "Maple Syrup" },
    { label: "Simple Syrup", value: "Simple Syrup" },
    { label: "Sugar", value: "Sugar" },

    // =========================
    // Herbs, Spices & Bitters
    // =========================
    { label: "Allspice", value: "Allspice" },
    { label: "Angostura Bitters", value: "Angostura Bitters" },
    { label: "Basil", value: "Basil" },
    { label: "Cardamom", value: "Cardamom" },
    { label: "Cinnamon", value: "Cinnamon" },
    { label: "Cloves", value: "Cloves" },
    { label: "Mint", value: "Mint" },
    { label: "Nutmeg", value: "Nutmeg" },
    { label: "Orange Bitters", value: "Orange Bitters" },

    // =========================
    // Dairy & Eggs
    // =========================
    { label: "Cream", value: "Cream" },
    { label: "Egg", value: "Egg" },
    { label: "Egg White", value: "Egg White" },
    { label: "Milk", value: "Milk" },
    { label: "Whipped Cream", value: "Whipped Cream" },

    // =========================
    // Other
    // =========================
    { label: "Ice", value: "Ice" },
    { label: "Water", value: "Water" }
];

const ingredientGroups: IngredientGroup[] = [
  {
    group: "Spirits",
    items: [
      { label: "151 Proof Rum", value: "151 Proof Rum" },
      { label: "Absinthe", value: "Absinthe" },
      { label: "Aquavit", value: "Aquavit" },
      { label: "Baijiu", value: "Baijiu" },
      { label: "Blended Scotch", value: "Blended Scotch" },
      { label: "Blended Whiskey", value: "Blended Whiskey" },
      { label: "Bourbon", value: "Bourbon" },
      { label: "Brandy", value: "Brandy" },
      { label: "Cachaca", value: "Cachaca" },
      { label: "Cognac", value: "Cognac" },
      { label: "Everclear", value: "Everclear" },
      { label: "Gin", value: "Gin" },
      { label: "Grain Alcohol", value: "Grain Alcohol" },
      { label: "Irish Whiskey", value: "Irish Whiskey" },
      { label: "Islay Single Malt Scotch", value: "Islay Single Malt Scotch" },
      { label: "Mezcal", value: "Mezcal" },
      { label: "Ouzo", value: "Ouzo" },
      { label: "Pisco", value: "Pisco" },
      { label: "Rum", value: "Rum" },
      { label: "Rye Whiskey", value: "Rye Whiskey" },
      { label: "Scotch", value: "Scotch" },
      { label: "Soju", value: "Soju" },
      { label: "Tequila", value: "Tequila" },
      { label: "Vodka", value: "Vodka" },
      { label: "Whiskey", value: "Whiskey" },
    ],
  },

  {
    group: "Beers & Cider",
    items: [
      { label: "Ale", value: "Ale" },
      { label: "Beer", value: "Beer" },
      { label: "Brown Ale", value: "Brown Ale" },
      { label: "Craft Beer", value: "Craft Beer" },
      { label: "Cider", value: "Cider" },
      { label: "Guinness Stout", value: "Guinness Stout" },
      { label: "India Pale Ale (IPA)", value: "India Pale Ale (IPA)" },
      { label: "Lager", value: "Lager" },
      { label: "Pale Ale", value: "Pale Ale" },
      { label: "Pilsner", value: "Pilsner" },
      { label: "Porter", value: "Porter" },
      { label: "Sour Beer", value: "Sour Beer" },
      { label: "Stout", value: "Stout" },
      { label: "Wheat Beer", value: "Wheat Beer" },
    ],
  },

  {
    group: "Liqueurs & Cordials",
    items: [
      { label: "Advocaat", value: "Advocaat" },
      { label: "Amaretto", value: "Amaretto" },
      { label: "Amaro Montenegro", value: "Amaro Montenegro" },
      { label: "Aperol", value: "Aperol" },
      { label: "Baileys Irish Cream", value: "Baileys Irish Cream" },
      { label: "Benedictine", value: "Benedictine" },
      { label: "Blue Curacao", value: "Blue Curacao" },
      { label: "Campari", value: "Campari" },
      { label: "Chartreuse", value: "Chartreuse" },
      { label: "Cointreau", value: "Cointreau" },
      { label: "Coffee Liqueur", value: "Coffee Liqueur" },
      { label: "Frangelico", value: "Frangelico" },
      { label: "Galliano", value: "Galliano" },
      { label: "Godiva Liqueur", value: "Godiva Liqueur" },
      { label: "Grand Marnier", value: "Grand Marnier" },
      { label: "Green Chartreuse", value: "Green Chartreuse" },
      { label: "Jägermeister", value: "Jägermeister" },
      { label: "Kahlúa", value: "Kahlúa" },
      { label: "Midori Melon Liqueur", value: "Midori Melon Liqueur" },
      { label: "Sambuca", value: "Sambuca" },
      { label: "St. Germain", value: "St. Germain" },
      { label: "Triple Sec", value: "Triple Sec" },
      { label: "Yellow Chartreuse", value: "Yellow Chartreuse" },
    ],
  },

  {
    group: "Wines",
    items: [
      { label: "Champagne", value: "Champagne" },
      { label: "Dessert Wine", value: "Dessert Wine" },
      { label: "Fortified Wine", value: "Fortified Wine" },
      { label: "Port", value: "Port" },
      { label: "Prosecco", value: "Prosecco" },
      { label: "Red Wine", value: "Red Wine" },
      { label: "Rosé Wine", value: "Rosé Wine" },
      { label: "Sherry", value: "Sherry" },
      { label: "Sparkling Wine", value: "Sparkling Wine" },
      { label: "White Wine", value: "White Wine" },
      { label: "Wine", value: "Wine" },
    ],
  },

  {
    group: "Mixers & Soft Drinks",
    items: [
      { label: "7-Up", value: "7-Up" },
      { label: "Club Soda", value: "Club Soda" },
      { label: "Coca-Cola", value: "Coca-Cola" },
      { label: "Dr. Pepper", value: "Dr. Pepper" },
      { label: "Ginger Ale", value: "Ginger Ale" },
      { label: "Ginger Beer", value: "Ginger Beer" },
      { label: "Root Beer", value: "Root Beer" },
      { label: "Sprite", value: "Sprite" },
      { label: "Tonic Water", value: "Tonic Water" },
    ],
  },

  {
    group: "Juices & Fruits",
    items: [
      { label: "Apple Juice", value: "Apple Juice" },
      { label: "Cranberry Juice", value: "Cranberry Juice" },
      { label: "Grapefruit Juice", value: "Grapefruit Juice" },
      { label: "Lemon Juice", value: "Lemon Juice" },
      { label: "Lime Juice", value: "Lime Juice" },
      { label: "Orange Juice", value: "Orange Juice" },
      { label: "Pineapple Juice", value: "Pineapple Juice" },
      { label: "Pomegranate Juice", value: "Pomegranate Juice" },
    ],
  },

  {
    group: "Sweeteners & Syrups",
    items: [
      { label: "Agave Syrup", value: "Agave Syrup" },
      { label: "Grenadine", value: "Grenadine" },
      { label: "Honey", value: "Honey" },
      { label: "Maple Syrup", value: "Maple Syrup" },
      { label: "Simple Syrup", value: "Simple Syrup" },
      { label: "Sugar", value: "Sugar" },
    ],
  },

  {
    group: "Other",
    items: [
      { label: "Ice", value: "Ice" },
      { label: "Water", value: "Water" },
    ],
  },
]



const categories = [
    'Beer',
    'Cocktail',
    'Cocoa',
    'Coffee / Tea',
    'Homemade Liqueur',
    'Ordinary Drink',
    'Party Drink',
    'Shake',
    'Shot',
    'Soft Drink',
    'Other',
]


export {
    ingreds,
    ingredientGroups,
    units,
    glasses,
    categories
}