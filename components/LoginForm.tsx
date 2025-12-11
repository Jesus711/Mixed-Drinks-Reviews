'use client'

import { FormEvent, useState } from "react"
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOff } from "lucide-react";
import { toast } from "sonner";

const LoginForm = ({updateLoading} : {updateLoading: (value: number) => void}) => {

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);


  const handlePasswordRecovery = async () => {
    updateLoading(2)
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/recovery"
    })

    if (error) {
      toast.error("Recovery Error", {
        description: "Please enter your email and click Forgot Password? again."
      })
    }

    toast.success("Password Reset Link sent!", {
      description: "Please check your email"
    })

    updateLoading(0);
  }


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateLoading(1)

    if (isSignUp) {
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
        toast.error("Error Signing Up" , {
          description: "Invalid credentials. Try again"
        })
        updateLoading(0);
        return;
      }

      router.push("/home")

    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error("Error Logging In" , {
          description: "Invalid credentials. Try again"
        })
        updateLoading(0);
        return;
      }

      router.push("/home")

    }
    updateLoading(0);
  }

  return (
    <Card className="bg-gray-950 sm:px-8 sm:py-6 px-6 py-2 w-full max-w-md text-primary border-orange-400 border-2">
      <form className="w-full flex flex-col justify-center items-center gap-y-5"
        onSubmit={(e) => handleSubmit(e)}>
        <h2 className="sm:text-3xl text-2xl text-center font-bold">{isSignUp ? "Create Your Account" : "Welcome Back!"}</h2>

        {isSignUp && (
          <div className="w-full flex flex-col text-left gap-y-1">
            <Label htmlFor="username" className="sm:text-2xl text-xl">Username: </Label >
            <Input
              className="bg-gray-800 border-gray-700 text-secondary focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg"
              name="username" type="text" placeholder="Newuser!" required
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              minLength={5}
            />
          </div>
        )}
         
        <div className="w-full flex flex-col text-left gap-y-1">
          <Label htmlFor="email" className="sm:text-2xl text-xl">Email: </Label >
          <Input
            className="bg-gray-800 border-gray-700 text-secondary focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg"
            name="email" type='email' placeholder="example@gmail.com" required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            
          />
        </div>

        <div className="w-full flex flex-col text-left gap-y-1 pb-3 relative">
          <div className="flex justify-between">
            <Label htmlFor="password" className="sm:text-2xl text-xl">Password: </Label >
            {!isSignUp && <Button variant={"link"} type="button" onClick={handlePasswordRecovery} className="text-secondary xs:text-md text-sm hover:cursor-pointer">Forgot Password?</Button>}
          </div>
          <Input
            className="bg-gray-800 border-gray-700 text-secondary focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg pr-12"
            name="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            minLength={6}
          />

          {!showPassword ? <EyeIcon onClick={() => setShowPassword(prev => !prev)} className="hover:cursor-pointer absolute right-2 bottom-5 w-5 h-5" /> : <EyeOff onClick={() => setShowPassword(prev => !prev)} className="hover:cursor-pointer absolute right-2 bottom-5 w-5 h-5" />}
        </div>

        <Button size={"lg"} variant={"outline"} type="submit" className="bg-orange-400 w-full text-black sm:text-xl text-lg hover:cursor-pointer">{isSignUp ? "Create Account" : "Login"}</Button>

        <Button size={"sm"} variant={"link"} type="button" onClick={() => setIsSignUp(prev => !prev)} className="w-full text-secondary text-md hover:cursor-pointer">{isSignUp ? "Already have an account?" : "Need to Sign Up?"}</Button>
      </form>
    </Card>

  )
}

export default LoginForm