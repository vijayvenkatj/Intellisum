import About from "@/components/Hero/About/About";
import Navbar from "@/components/Navbar/Navbar";
import Dashboard from "@/components/Hero/Dashboard/Dashboard";
import Contact from "@/components/Hero/Contact/Contact";
import { SessionProvider } from "next-auth/react";


export default function Home() {
  return (
    <SessionProvider>
    <div className="min-h-screen">
        <Navbar />
        <About />
        <Dashboard />
        <Contact />
    </div>
    </SessionProvider>
  );
}
