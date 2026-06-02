"use client";
import { motion } from "framer-motion";
import { Bike, MapPin, MessageCircle, Wallet } from "lucide-react";

export default function HowItWorks() {
  const cardDetails = [
    {
      name: "Message Us",
      text: "Open WhatsApp and send a message to Bamjiye. No new apps. No registrations. Just a message.",
      numb: "01",
      icon: <MessageCircle stroke-width={2.5} size={15} />,
    },
    {
      name: "Share Your Location",
      text: "Tell us where you are and where you're going. Drop a pin or just type it like a friend.",
      numb: "02",
      icon: <MapPin stroke-width={2.5} size={15} />,
    },
    {
      name: "Your Keke arrives",
      text: "A verified driver near you gets matched, reaches out, and rolls up usually within minutes. ",
      numb: "03",
      icon: <Bike stroke-width={2.5} size={15} />,
    },
    {
      name: "Transfer Your Fare",
      text: "Confirm your ride. Pay on WhatsApp Pay, mobile money or cash. Zero hidden fees.",
      numb: "04",
      icon: <Wallet stroke-width={2.5} size={15} />,
    },
  ];
  return (
    <div className="bg-primary py-20">
      <div className="w-[85%] mx-auto text-white">
        <h2 className="text-center font-semibold text-2xl md:text-3xl tracking-wide">
          Riding With Bamjiye <br /> is{" "}
          <strong className="text-secondary italic">embrassingly </strong>
          simple
        </h2>
        <p className="lg:w-[30%] md:w-[70%] w-full mt-3 mx-auto text-center">
          Three moves. One WhatsApp message. Your Keke on its way. That's quite
          literally it.
        </p>

        <div className="grid gap-10 mt-8 md:grid-cols-2 grid-cols-1  xl:grid-cols-4">
          {cardDetails.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: -80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.5 }}
              className="shadow-lg rounded-xl flex flex-col gap-3 border border-white/10 bg-white/5 px-4 py-6 backdrop-blur-3xl"
              key={idx}
            >
              <div className="flex items-center justify-between">
                <p className="py-2 px-3 md:text-primary font-extrabold md:text-lg text-xl rounded-full text-secondary md:bg-secondary w-fit">
                  {item?.numb}
                </p>
                <span className="py-3 px-3 md:hidden text-primary font-bold rounded-full bg-secondary">
                  {item?.icon}
                </span>
              </div>
              <p className="text-secondary font-semibold md:text-lg">
                {item?.name}
              </p>
              <p className="text-sm leading-7 md:text-base">{item?.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
