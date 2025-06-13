'use client'

import { FormEvent, useState } from "react"
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const LoginForm = () => {

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)

    if (isSignUp) {
      console.log("Creating Account")
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: userName
          }
        }
      })

      if (error) {
        console.error(error.message);
        return;
      }

      console.log("New Account Created!!!")
      console.log(data)
      router.push("/home")

    } else {
      console.log("Logging In")
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error(error.message);
        return;
      }

      console.log(`Logged In!! Welcome, ${data.user.id}`)
      console.log(data)
      router.push("/home")

    }


    setLoading(false);

  }

  return (
    <Card className="bg-gray-950 px-8 py-3 w-full max-w-sm text-white border-orange-400 border-2">
      <form className="w-full flex flex-col justify-center items-center gap-y-3"
        onSubmit={(e) => handleSubmit(e)}>
        <h2 className="text-2xl text-center font-bold">{isSignUp ? "Create Your Account" : "Welcome Back!"}</h2>

        {isSignUp && (
          <div className="w-full flex flex-col text-left">
            <Label htmlFor="username" className="text-xl">Username: </Label >
            <Input
              className="bg-gray-800 border-gray-700 focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg text-2xl"
              name="username" type="text" placeholder="Newuser!" required
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              minLength={5}
              
            />
          </div>
        )}
         
        <div className="w-full flex flex-col text-left">
          <Label htmlFor="email" className="text-xl">Email: </Label >
          <Input
            className="bg-gray-800 border-gray-700 focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg text-2xl"
            name="email" type='email' placeholder="example@gmail.com" required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            
          />
        </div>

        <div className="w-full flex flex-col text-left pb-3">
          <div className="flex justify-between">
            <Label htmlFor="password" className="text-xl">Password: </Label >
            <Button variant={"link"} type="button" className="text-secondary text-md">Forgot Password?</Button>
          </div>
          <Input
            className="bg-gray-800 border-gray-700 focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg text-2xl"
            name="password" type="password" placeholder="••••••••" required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            minLength={6}
            
          />
        </div>

        <Button size={"lg"} variant={"outline"} type="submit" className="bg-orange-400 w-full text-black">{isSignUp ? "Create Account" : "Login"}</Button>

        <Button size={"sm"} variant={"link"} type="button" onClick={() => setIsSignUp(prev => !prev)} className="w-full text-secondary text-md">{isSignUp ? "Already have an account?" : "Need to Sign Up?"}</Button>
      </form>
    </Card>

  )
}

export default LoginForm