'use client'

import LoginForm from "@/components/LoginForm";
import Link from "next/link";
export default function Home() {


  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <main className="flex-1 flex flex-col justify-center items-center lg:gap-y-10 gap-y-5">
        <div>
          <h1 className="lg:text-6xl sm:text-4xl xs:text-2xl text-lg text-orange-400 font-bold">Welcome to Mixed Bevs Reviews!</h1>
          <p className="lg:text-3xl sm:text-xl xs:text-lg text-sm text-secondary text-center font-semibold">Learn new mixed bevs and Leave your rating!</p>
        </div>
        <LoginForm />
        <Link className="sm:text-3xl text-2xl text-blue-200 font-semibold underline hover:text-orange-200" href={"/browse"}>Continue as Guest?</Link>
      </main>
    </div>
  );
}
