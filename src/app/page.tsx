import About from "@/components/Hero/About/About";
import Navbar from "@/components/Navbar/Navbar";
import Dashboard from "@/components/Hero/Dashboard/Dashboard";
import Contact from "@/components/Hero/Contact/Contact";


export default function Home() {
  return (
    <div className="min-h-screen">
        <Navbar />
        <About />
        <Dashboard />
        <Contact />
    </div>
  );
}
