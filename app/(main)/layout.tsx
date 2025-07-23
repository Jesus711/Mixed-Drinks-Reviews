"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";




export default function HomeLayout({children,}: {children: React.ReactNode}) {
    const [displayMenu, setDisplayMenu] = useState<boolean>(false);

    const path = usePathname();
    const router = useRouter();

    const handleLogOut = async () => {
        const { error } = await supabase.auth.signOut();
        router.push("/")
    }

    
    return (
        <div className="min-h-screen flex flex-col">

            <header className="bg-gray-900 flex justify-between items-center bg-primary text-white p-4 shadow">
                <div className="flex flex-col">
                    <h1 className="xl:text-3xl lg:text-xl text-lg text-primary font-bold">Mixed Bevs Reviews</h1>
                    <p className="xl:text-xl lg:text-md text-xs text-white">Learn and Rate Mixed Beverages!</p>
                </div>

                <nav className="flex-1 md:flex hidden justify-center items-center gap-x-14 xl:text-2xl lg:text-lg text-md font-semibold">
                    <Link href={"/home"} className={`${path === "/home" ? "text-primary" : ""}`}>Home</Link>
                    <Link href={"/random"} className={`${path === "/random" ? "text-primary" : ""}`}>Random Bev</Link>
                    <Link href={"/browse"} className={`${path === "/browse" ? "text-primary" : ""}`}>Browse</Link>
                    <Link href={"/top"} className={`${path === "/top" ? "text-primary" : ""}`}>Top Rated</Link>
                </nav>

                <Button onClick={handleLogOut} className="md:flex hidden bg-red-500 font-semibold xl:text-lg lg:px-5 px-2 lg:py-3 py-2 text-md hover:cursor-pointer" variant={"destructive"} type="button">Logout</Button>
                <Button onClick={() => setDisplayMenu(prev => !prev)} variant={"default"} className="md:hidden flex flex-col py-0 px-0 justify-center items-center gap-y-1.5 cursor-pointer">
                    <div className="bg-white w-8 h-1 rounded-md" />
                    <div className="bg-white w-8 h-1 rounded-md" />
                    <div className="bg-white w-8 h-1 rounded-md" />
                </Button>
                
                <nav className={`md:hidden absolute right-3.5 top-15 rounded-lg z-10 p-4 bg-gray-900 border-2 border-blue-300 flex sm:w-[185px] flex-col gap-y-3 text-2xl font-semibold ${displayMenu ? "flex" : "hidden"}`}>
                    <Link onClick={() => setDisplayMenu(false)} href={"/home"} className={`${path === "/home" ? "text-primary" : ""}`}>Home</Link>
                    <Link onClick={() => setDisplayMenu(false)} href={"/random"} className={`${path === "/random" ? "text-primary" : ""}`}>Random Bev</Link>
                    <Link onClick={() => setDisplayMenu(false)} href={"/browse"} className={`${path === "/browse" ? "text-primary" : ""}`}>Browse</Link>
                    <Link onClick={() => setDisplayMenu(false)} href={"/top"} className={`${path === "/top" ? "text-primary" : ""}`}>Top Rated</Link>
                    <Button onClick={handleLogOut} className="flex bg-red-500 font-semibold px-2 py-2 text-lg hover:cursor-pointer" variant={"destructive"} type="button">Logout</Button>
                </nav>
            </header>

            <main className="p-6">{children}</main>
        </div>
    )
}
