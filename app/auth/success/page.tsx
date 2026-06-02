"use client";

import img from "@/public/success-icon.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const [isDriver, setIsDriver] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const driver = localStorage.getItem("isDriver");
    setIsDriver(driver);
  }, []);

  setTimeout(() => {
    router.push("/");
    localStorage.removeItem("isDriver");
    localStorage.removeItem("driverId");
  }, 2000);

  return (
    <div className="md:p-16 px-10 md:w-[40%] m-auto h-[90vh] md:h-screen flex flex-col items-center justify-center gap-7">
      <div className="p-5 bg-primary rounded-full">
        <Image className="md:h-14 md:w-14" src={img} alt="success" />
      </div>

      <div className="flex flex-col items-center gap-4 justify-center">
        <h2 className="font-semibold text-2xl md:text-3xl ">
          You're All <i className="text-secondary">Set!</i>
        </h2>

        <p className="text-center md:text-base text-sm leading-6 text-black/60">
          {isDriver === "true"
            ? "Your documents have been submitted. Click below to start receiving ride requests. We’ll cross-check each document and reach out via our bot."
            : "Your account has been created successfully. You can now start booking rides easily and safely."}
        </p>

        <button className="p-4 cursor-pointer text-sm md:text-base w-full rounded-full bg-primary text-white">
          {isDriver === "true" ? "Start Driving" : "Book a Ride"}
        </button>
      </div>
    </div>
  );
}
