'use client'

import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Home() {


  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <main className="flex-1 flex flex-col justify-center items-center gap-y-10">
        <div>
          <h1 className="text-6xl text-primary font-bold">Welcome to Mixed Bevs Reviews!</h1>
          <p className="text-3xl text-secondary text-center font-semibold">Learn new mixed bevs and Leave your rating!</p>
        </div>
        <LoginForm />
      </main>

      <footer className="bg-slate-900 py-6 w-full flex flex-col justify-center items-center text-lg font-bold">
        <div className="flex gap-x-2">
          <Link className="text-secondary" href={"/"}>Link to Source Code </Link>
        </div>
      </footer>
    </div>
  );
}
