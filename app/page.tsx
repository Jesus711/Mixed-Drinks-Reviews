'use client'

import Loading from "@/components/Loading";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import { useState } from "react";
import { Toaster } from "sonner";
export default function Home() {
  const [loading, setLoading] = useState<number>(0);


  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <main className="flex-1 flex flex-col justify-center items-center lg:gap-y-10 gap-y-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="lg:text-6xl sm:text-4xl xs:text-2xl text-lg text-center text-orange-400 font-bold">Welcome to Mixed Bevs Reviews!</h1>
          <p className="lg:text-3xl sm:text-xl xs:text-lg text-sm sm:w-auto w-[70%] text-secondary text-center font-semibold">Learn or create new mixed bevs and leave your rating!</p>
        </div>
        {loading === 1 && <Loading message="Logging In" />}
        {loading === 2 && <Loading message="Recovery password link sent" />}
        <LoginForm updateLoading={setLoading} />
        <Link className="sm:text-3xl text-2xl text-blue-200 font-semibold underline hover:text-orange-200" href={"/browse"}>Continue as Guest?</Link>
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
