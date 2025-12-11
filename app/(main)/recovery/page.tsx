'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"


const Recovery = () => {

    const [password, setPassword] = useState<string>("")
    const [confirm, setConfirm] = useState<string>("")

    const router = useRouter();

    const handleNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password !== confirm) {
            toast.error("Passwords do not match")
            return
        }

        const { data, error } = await supabase.auth.updateUser({
            password: password
        })

        if (error) {
            toast.error("Error")
            console.log(error)
            return;
        }

        toast.success("Password has been updated!", {
            action: {
                label: "Go to Login",
                onClick: () => { router.push("/") }
            },
        })

    }


    return (
        <form onSubmit={handleNewPassword} className="self-center justify-self-center flex flex-col justify-center text-blue-400 mt-20 lg:w-[800px] w-[80%] bg-slate-950 py-6 md:px-20 px-5 rounded-md border-blue-400 border-2 gap-10">
            <h2 className="text-center sm:text-3xl text-xl font-bold">Reset Password</h2>
            <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="sm:text-2xl text-xl">New Password: </Label>
                <Input
                    className="bg-gray-800 border-gray-700 text-secondary focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg pr-12"
                    name="password" type="password" required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    minLength={6}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="confirm" className="sm:text-2xl text-xl">Confirm New Password: </Label >
                <Input
                    className="bg-gray-800 border-gray-700 text-secondary focus:border-blue-400 focus:ring-blue-400 placeholder:text-gray-500 placeholder:text-lg md:text-lg pr-12"
                    name="confirm" type="password" required
                    onChange={(e) => setConfirm(e.target.value)}
                    value={confirm}
                    minLength={6}
                />
            </div>
            <Button type="submit" className="bg-blue-500 text-white sm:text-2xl text-lg">Set New Password</Button>
        </form>
    )

}

export default Recovery