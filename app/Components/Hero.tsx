"use client";
import { Bike, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import img from "../../public/Hero img2.png";
import { motion } from "framer-motion";
import img2 from "@/public/hero-mockup.png";
const MotionImage = motion.create(Image);
export default function Hero() {
  return (
    <div className="bg-[#FFB7001A] h-full">
      <div className="max-w-7xl md:px-6  lg:px-4 md:py-8 flex md:flex-row flex-col items-center justify-between m-auto">
        <motion.div
          initial={{ opacity: 0.5, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-[60%] xl:w-[60%] md:w-[90%] w-full flex  flex-col gap-8 py-8"
        >
          <h3 className="lg:text-6xl md:text-4xl text-4xl md:text-start text-center text-primary lg:leading-20 md:leading-11 sm:leading-20 font-extrabold">
            Your Short distance <br /> rides,{" "}
            <i className="text-secondary">Sorted</i>
          </h3>
          <p className="md:leading-10 md:text-sm lg:text-base md:w-[70%] leading-9 text-base text-black/50 md:text-xl md:px-0 px-2 md:text-start text-center">
            Affordable tricycle rides (keke) for{" "}
            <strong>short distances</strong>, booked on
            <strong> Whatsapp</strong> in seconds. No app download. No surge
            pricing. Just message, ride, and go.
          </p>
          <div className="flex md:flex-row flex-col justify-center md:justify-start items-center gap-4">
            <Link
              href={"/auth/rider"}
              className="bg-primary gap-3 md:w-fit w-[60%] flex items-center justify-center py-4 shadow-xl text-sm cursor-pointer hover:scale-[0.99] transition md:px-7 px-3 rounded-full text-white"
            >
              <MessageCircle className="size-4 md:size-6" />
              Sign Up as Rider
            </Link>
            <Link
              href={"/auth/driver"}
              className="border border-gray-500  md:w-fit w-[60%] py-4 flex items-center justify-center gap-3 shadow-lg text-sm cursor-pointer hover:scale-[0.99]  transition px-3 md:px-7 rounded-full "
            >
              <Bike className="size-4 md:size-6" />
              Sign Up as Driver
            </Link>
          </div>

          <div className="grid grid-cols-3 py-6 place-content-center md:place-items-start place-items-center">
            <span>
              <p className="font-bold text-sm md:text-lg">N0</p>
              <p className="text-black/50 md:text-md text-xs">SURGE FEE</p>
            </span>
            <span>
              <p className="font-bold text-sm md:text-lg">60s</p>
              <p className="text-black/50 md:text-md text-xs">AVG. RESPONSE</p>
            </span>
            <span>
              <p className="font-bold text-sm md:text-lg">WHATSAPP</p>
              <p className="text-black/50 md:text-md text-xs">NO APP NEEDED</p>
            </span>
          </div>
        </motion.div>

        <MotionImage
          initial={{ opacity: 0.5, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          priority
          className="flex md:block relative top-8 hidden items-right w-[30%] md:w-[25%] justify-end"
          src={img}
          alt="img"
        />
        <MotionImage
          initial={{ opacity: 0.5, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          priority
          className="flex md:hidden items-right justify-end"
          src={img2}
          alt="img"
        />
      </div>
    </div>
  );
}
