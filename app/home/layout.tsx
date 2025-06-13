"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";




export default function HomeLayout({children,}: {children: React.ReactNode}) {


    const path = usePathname();
    const router = useRouter();

    const handleLogOut = async () => {
        const { error } = await supabase.auth.signOut();
        router.push("/")
    }

    
    return (
        <div className="min-h-screen flex flex-col">

            <header className="bg-gray-900 flex justify-between items-center bg-primary text-white p-4 shadow">
                <div className="flex flex-col w-full max-w-sm">
                    <h1 className="text-3xl text-primary font-bold">Mixed Bevs Reviews</h1>
                    <p className="text-xl text-white">Learn and Rate Mixed Beverages!</p>
                </div>

                <nav className="flex-1 flex justify-center items-center gap-x-14 text-2xl font-semibold">
                    <Link href={"/home"} className={`${path === "/home" ? "text-primary" : ""}`}>Home</Link>
                    <Link href={"/random"} className={`${path === "/random" ? "text-primary" : ""}`}>Random Bev</Link>
                    <Link href={"/browse"} className={`${path === "/browse" ? "text-primary" : ""}`}>Browse</Link>
                    <Link href={"/top"} className={`${path === "/top" ? "text-primary" : ""}`}>Top Rated</Link>
                </nav>

                <Button onClick={handleLogOut} className="bg-red-500 font-semibold text-lg" size={"lg"} variant={"destructive"} type="button">Logout</Button>
            </header>

            <main className="p-6">{children}</main>
        </div>
    )
}
