import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardAction, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'


const DrinkCard = () => {
  return (
<Card className="min-w-[300px] max-w-sm w-full border-white border-2 text-white hover:border-blue-400 h-full flex flex-col justify-between whitespace-wrap text-wrap">
      <CardHeader>
        <CardTitle>Drink Name</CardTitle>
        <CardDescription>This Drink....</CardDescription>
        <CardAction><Button>View More</Button></CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Rating: 0/5</p>
      </CardFooter>
    </Card>
  )
}

export default DrinkCard