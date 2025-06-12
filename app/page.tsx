import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Home() {

  return (
    <div className="">

      <main>
        <h1>Welcome to Mixed Bevs Reviews!</h1>
        <p>Learn new mixed bevs and Leave your rating!</p>

        <LoginForm />
      </main>

      <footer className="">
      </footer>
    </div>
  );
}
