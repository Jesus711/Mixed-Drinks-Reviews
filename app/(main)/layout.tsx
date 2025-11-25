"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Toaster } from "sonner";
import { X } from "lucide-react";




export default function HomeLayout({children,}: {children: React.ReactNode}) {
    const [displayMenu, setDisplayMenu] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const path = usePathname();
    const router = useRouter();

    const handleLogOut = async () => {
        const { error } = await supabase.auth.signOut();
        router.push("/")
    }

    const userLogged = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return
        }

        setLoggedIn(true)
    }

    useEffect(() => {
        userLogged()
    ,[]})

    
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-900 flex justify-between items-center bg-primary text-white p-4 shadow">
                <div className="flex flex-col">
                    <h1 className="xl:text-3xl lg:text-xl text-lg text-primary font-bold">Mixed Bevs Reviews</h1>
                    <p className="xl:text-xl lg:text-md text-xs text-white">Learn and Rate Mixed Beverages!</p>
                </div>

                <nav className="flex-1 lg:flex hidden justify-center items-center gap-x-14 xl:text-2xl lg:text-lg text-md font-semibold">
                    {loggedIn && <Link href={"/home"} className={`${path === "/home" ? "text-primary" : ""}`}>Home</Link>}
                    <Link href={"/random"} className={`${path === "/random" ? "text-primary" : ""}`}>Random Bev</Link>
                    <Link href={"/browse"} className={`${path === "/browse" ? "text-primary" : ""}`}>Browse</Link>
                    <Link href={"/top"} className={`${path === "/top" ? "text-primary" : ""}`}>Top Rated</Link>
                    {loggedIn &&<Link href={"/create"} className={`${path === "/create" ? "text-primary" : ""}`}>Create</Link>}
                </nav>

                {loggedIn ? <Button onClick={handleLogOut} className="lg:flex hidden bg-red-500 font-semibold xl:text-xl lg:px-5 px-2 lg:py-3 py-2 text-md hover:cursor-pointer" variant={"destructive"} type="button">Logout</Button> : 
                <Button onClick={() => router.push("/")} className="lg:flex hidden bg-green-700 font-semibold xl:text-xl lg:px-5 px-2 lg:py-3 py-2 text-md hover:cursor-pointer" variant={"destructive"} type="button">Log in</Button>}
                
                <Button onClick={() => setDisplayMenu(prev => !prev)} variant={"default"} className="lg:hidden flex flex-col py-0 px-0 justify-center items-center gap-y-1.5 cursor-pointer">
                    {displayMenu ? <X size={30} strokeWidth={3}/> : 
                    <>
                        <div className="bg-white w-8 h-1 rounded-md" />
                        <div className="bg-white w-8 h-1 rounded-md" />
                        <div className="bg-white w-8 h-1 rounded-md" />
                    </>
                    }

                </Button>
                
                <nav className={`lg:hidden absolute right-3.5 top-15 rounded-lg z-10 p-4 bg-gray-900 border-2 border-blue-300 flex sm:w-[225px] w-[200px] flex-col gap-y-3 md:text-2xl text-xl font-semibold ${displayMenu ? "flex" : "hidden"}`}>
                    {loggedIn && <Link onClick={() => setDisplayMenu(false)} href={"/home"} className={`${path === "/home" ? "text-primary" : ""}`}>Home</Link>}
                    <Link onClick={() => setDisplayMenu(false)} href={"/random"} className={`${path === "/random" ? "text-primary" : ""}`}>Random Bev</Link>
                    <Link onClick={() => setDisplayMenu(false)} href={"/browse"} className={`${path === "/browse" ? "text-primary" : ""}`}>Browse</Link>
                    <Link onClick={() => setDisplayMenu(false)} href={"/top"} className={`${path === "/top" ? "text-primary" : ""}`}>Top Rated</Link>
                    {loggedIn && <Link onClick={() => setDisplayMenu(false)} href={"/create"} className={`${path === "/create" ? "text-primary" : ""}`}>Create</Link>}
                    {loggedIn ? <Button onClick={handleLogOut} className="flex bg-red-500 font-semibold px-2 py-2 text-lg hover:cursor-pointer" variant={"destructive"} type="button">Logout</Button> : <Button onClick={() => router.push("/")} className="flex bg-green-700 font-semibold px-2 py-2 text-lg hover:cursor-pointer" variant={"destructive"} type="button">Log in</Button>}
                </nav>
            </header>

            <main className="p-6">{children}</main>
            <Toaster position="top-center"/>
        </div>
    )
}
