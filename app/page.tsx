import Link from "next/link";
import Hero from "./Components/Hero";
import HowItWorks from "./Components/HowItWorks";
import Navbar from "./Components/Navbar";
import Why from "./Components/Why";
import Footer from "./Components/Footer";
import { Bike, Check, MessageCircle } from "lucide-react";
import CheckIcon from "@/public/check Icon.png";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <section>
        {" "}
        <Hero />
      </section>
      <section id="how-it-works" className="">
        <HowItWorks />
      </section>
      <section id="why" className="my-4">
        <Why />
      </section>

      <section
        id="keke-drivers"
        className="my-4 relative md:w-[70%] w-[90%] mx-auto flex md:flex-col lg:flex-row flex-col items-center justify-center gap-10 lg:gap-4  px-12 py-20 bg-[#002044] rounded-4xl"
      >
        <div className="text-white   flex flex-col gap-4">
          <h2 className="text-4xl font-bold italic xl:w-[50%] lg:w-[80%]">
            Ready to drive with Bamjiye?
          </h2>
          <p className="text-[#ffffff] xl:w-[60%] leading-8 lg:w-[80%]">
            Join our fleet of drivers and start receiving rides before you can
            say "go". Early drivers get priority dispatch.
          </p>
          <div className="flex md:flex-row flex-col items-start md:items-center gap-7">
            <span className="flex items-center gap-3">
              <Image src={CheckIcon} alt="check icon" className="w-5" />
              <p>Free to Join</p>
            </span>
            <span className="flex items-center gap-3">
              <Image src={CheckIcon} alt="check icon" className="w-5" />
              <p>Daily payouts</p>
            </span>
            <span className="flex items-center gap-3">
              <Image src={CheckIcon} alt="check icon" className="w-5" />
              <p>Priority Dispatch</p>
            </span>
          </div>
        </div>
        <Link
          href={"/auth/driver"}
          className="border md:w-fit lg:w-64 w-full bg-secondary border-gray-500 py-4 flex items-center justify-center gap-3 shadow-lg text-xs cursor-pointer hover:scale-[0.99] transition px-4 xl:px-7 rounded-full "
        >
          {/* <Bike /> */}
          <p>Sign Up as Driver</p>
        </Link>
        <div className="absolute blur-3xl opacity-50 bg-secondary/80 md:block hidden p-20 top-1 rounded-full right-3" />
        <div className="absolute blur-3xl opacity-40 bg-secondary/80 p-20 top-[65%] md:top-[40%] left-3" />
      </section>

      <section className="mt-4">
        <Footer />
      </section>
    </div>
  );
}
