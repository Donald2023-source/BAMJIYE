"use client";
import { motion } from "framer-motion";
import {
  Bike,
  Cable,
  MessageCircle,
  Shield,
  Smartphone,
  Tag,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import img3 from "../../public/img6.jpg";
export default function Why() {
  const cardDetails = [
    {
      name: "Tricycle-first",
      text: "Built specifically for Kekes the right vehicle for narrow streets and short hops.",
      icon: <Bike size={15} />,
    },
    {
      name: "WhatsApp booking",
      text: "No new app. Use the messenger you already have open every day. ",
      icon: <MessageCircle size={15} />,
    },
    {
      name: "Fixed Price",
      text: "Upfront fares agreed before you board. No surge. No surprises. ",
      icon: <Tag size={15} />,
    },
    {
      name: "Last-mile Focused",
      text: "Optimized for the trips between bus stops, markets and home. ",
      icon: <Cable size={15} />,
    },
    {
      name: "Mobile Money",
      text: "Pay on WhatsApp Pay, mobile money or cash whatever works for you.",
      icon: <Smartphone size={15} />,
    },
    {
      name: "Verified Drivers",
      text: "Every driver is vetted, ID-checked and rated by the community.",
      icon: <Shield size={15} />,
    },
  ];

  const descriptionDetails = [
    {
      name: "Works on WhatsApp",
      text: "No complicated app to learn. You get ride requests directly on the WhatsApp you already use.",
      icon: <MessageCircle size={20} />,
    },

    {
      name: "Steady, fair income",
      text: "No complicated app to learn. You get ride requests directly on the WhatsApp you already use.",
      icon: <Tag size={20} />,
    },
    {
      name: "Mobile Money Payments",
      text: "Payments clear fast. No cash handling. No chasing passengers. Money comes to you.",
      icon: <Wallet size={20} />,
    },
    {
      name: "You're in Control",
      text: "Accept rides on your terms. No penalties for declining. Drive when you want, how you want.",
      icon: <Smartphone size={20} />,
    },
  ];
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="lg:w-[85%] py-16 px-8 mx-auto"
      >
        <h2 className="text-center font-semibold text-2xl md:text-3xl tracking-wide">
          Built For How{" "}
          <strong className="text-secondary italic">We Actually Move </strong>
        </h2>
        <p className="lg:w-[30%] md:w-[70%] w-full mt-3 mx-auto text-center">
          We've stripped ride-hailing down to the bones and rebuilt it around
          the realities of African cities.
        </p>

        <div className="grid xl:gap-10 gap-5 place-content-center place-items-center mt-8 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
          {cardDetails.map((item, idx) => (
            <div
              className="shadow-lg md:w-[85%] lg:w-full bg-[#002044] lg:h-58 xl:h-fit md:h-48 w-full rounded-xl flex flex-col gap-3 text-white px-4 py-6 backdrop-blur-3xl"
              key={idx}
            >
              <p className="p-5 text-primary font-bold rounded-full bg-secondary w-fit">
                {item?.icon}
              </p>
              <p className="text-secondary font-semibold md:text-lg">
                {item?.name}
              </p>
              <p className="text-sm lg:text-sm xl:text-base leading-7 md:text-base">
                {item?.text}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="bg-[#C6DDFBA6] py-2 w-full ">
        <div className="md:w-[80%] px-10 flex lg:flex-row flex-col items-center mx-auto justify-center ">
          <div className="lg:w-[50%] flex flex-col gap-2  py-10 mx-auto">
            <h2 className="font-extrabold md:hidden text-2xl mt-3">Ride Come to you</h2>
            <p className="md:w-[70%] md:hidden">
              Stop waiting. Start earning. Bamjiye sends ride requests straight
              to your WhatsApp.
            </p>
            <Image
              className="md:h-[70%] rounded-xl md:w-[70%]"
              src={img3}
              alt="section image"
            />
            <h2 className="font-extrabold md:block hidden text-2xl mt-3">Ride Come to you</h2>
            <p className="md:w-[70%] md:block hidden">
              Stop waiting. Start earning. Bamjiye sends ride requests straight
              to your WhatsApp.
            </p>
          </div>
          <div className="lg:w-[50%] md:px-8  flex flex-col gap-8 md:py-20 mx-auto">
            {descriptionDetails?.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.5 }}
              >
                <div className="flex gap-4 md:gap-8">
                  <span className="bg-[#006EFF] h-fit text-white p-3 inline-flex rounded-xl">
                    {item.icon}
                  </span>
                  <span>
                    <p className="font-medium text-primary">{item?.name}</p>
                    <p className="text-sm text-black/60">{item?.text}</p>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
