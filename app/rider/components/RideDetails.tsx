"use client";

import { Location, Ride } from "@/types";
import { motion, PanInfo } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PriceFormat from "@/app/Components/PriceFormatter";

import { Button } from "@heroui/react";
import Image from "next/image";
import VerticalLinearStepper from "./Stepper";
import { socket } from "@/lib/socket";

interface Props {
  rideId: string;
}

export default function RideDetails({ rideId }: Props) {
  const [ride, setRide] = useState<Ride | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const rideProgress = ride?.rideProgress;

  const capitalizeName = (name?: string) =>
    name
      ? name
          .split(" ")
          .filter(Boolean)
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ")
      : "";

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    if (offset < -80 || velocity < -500) {
      setIsExpanded(true);
      return;
    }

    if (offset > 80 || velocity > 500) {
      setIsExpanded(false);
      return;
    }
  };

  useEffect(() => {
    if (!rideId) return;

    const getRide = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/drivers/${rideId}/driver-location`,
          {
            cache: "no-store",
          },
        );

        const data = await response.json();

        if (data.ride) {
          setRide(data.ride);
        } else {
          setRide(null);
        }
      } catch (error) {
        console.error("Failed to fetch ride:", error);
      }
    };

    getRide();

    socket.emit("ride:join", rideId);
    console.log("This the rideid i am testing", rideId);

    const handleRideStatus = () => {
      console.log("Ride status changed — refreshing ride");

      getRide();
    };

    socket.on("ride:status", handleRideStatus);

    return () => {
      socket.emit("ride:leave", rideId);
      socket.off("ride:status", handleRideStatus);
    };
  }, [rideId]);
  return (
    <motion.div
      drag="y"
      dragConstraints={{
        top: 300,
        bottom: 0,
      }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      animate={{
        y: isExpanded ? 300 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
      }}
      className="absolute bottom-0 left-0 right-0 z-50 h-fit w-full rounded-t-2xl bg-primary px-4 py-3 shadow-lg"
    >
      <div className="mx-auto mb-4 h-2 w-13 cursor-grab rounded-full bg-white active:cursor-grabbing" />

      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex w-15 border h-15 rounded-full p-2">
              <Image
                width={500}
                height={500}
                src={ride?.currentDriver?.profile_photo ?? ""}
                alt="profile image"
                className="w-full h-full object-contain"
              />
            </span>
            <span>
              <p className="py-1 font-semibold text-white">
                {capitalizeName(ride?.currentDriver?.fullName)}
              </p>

              <p className="text-sm font-medium text-gray-400">
                KEKE - Plate {ride?.currentDriver.plate_number}
              </p>
            </span>
          </div>

          <Link
            href={`tel:+${ride?.initiatedBy?.phone}`}
            className="flex w-fit rounded-full bg-secondary/20 p-3"
          >
            <Phone size={18} color="#ffb700" />
          </Link>
        </div>
        <div className="flex items-center px-1 mt-3 justify-between text-sm text-white">
          <p className="text-[#8B8B8B] font-medium">Estimated arrival</p>
          <p>{"4"} min</p>
        </div>

        <hr className="mx-2 mt-3 border-gray-500" />
        <div className="py-2">
          {ride && <VerticalLinearStepper ride={ride} />}
        </div>
        <Link href={`https://wa.me/2347088392115`}>
          <Button className="mt-6 h-10 w-full rounded-lg bg-secondary text-black">
            Return to WhatsApp
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
