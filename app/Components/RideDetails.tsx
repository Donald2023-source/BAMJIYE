"use client";

import { Location, Ride } from "@/types";
import { motion, PanInfo } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PriceFormat from "./PriceFormatter";
import SwitchRideState from "./SwitchRideState";
import { Button } from "@heroui/react";

interface Props {
  handleStatusChange: (checked: boolean, id: string) => void;
  ride: Ride;
  rideStatus: string | null;
}

export default function RideDetails({
  handleStatusChange,
  ride,
  rideStatus,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const rideProgress = ride?.rideProgress;

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    // Drag UP → expand
    if (offset < -50 || velocity < -300) {
      setIsExpanded(false);
      return;
    }

    // Drag DOWN → collapse
    if (offset > 50 || velocity > 300) {
      setIsExpanded(true);
      return;
    }

    setIsExpanded((prev) => prev);
  };

  const pickup: Location | null = ride
    ? {
        lat: ride.pickup.location.coordinates[1],
        lng: ride.pickup.location.coordinates[0],
      }
    : null;

  const dropoff: Location | null = ride
    ? {
        lat: ride.dropoff.location.coordinates[1],
        lng: ride.dropoff.location.coordinates[0],
      }
    : null;

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 300 }}
      dragElastic={0.05}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      animate={{
        y: isExpanded ? 300 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
        mass: 0.8,
      }}
      className="absolute bottom-0 left-0 right-0 z-50 h-fit w-full rounded-t-2xl bg-primary px-4 py-3 shadow-lg"
    >
      <div className="mx-auto mb-4 h-2 w-13 cursor-grab rounded-full bg-white active:cursor-grabbing" />

      <div className="flex items-center gap-4">
        <span className="flex w-fit rounded-full bg-secondary/20 p-3">
          <MapPin size={23} color="#ffb700" />
        </span>

        <span>
          <p className="text-sm font-medium text-gray-400">Pickup At</p>

          <p className="py-1 font-semibold text-white">{ride?.pickup?.name}</p>
        </span>
      </div>

      <hr className="mx-2 my-5 border-gray-500" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex w-fit rounded-full bg-secondary p-2">
            <strong>
              {ride.initiatedBy?.firstName?.[0]?.toUpperCase()}
              {ride.initiatedBy?.lastName?.[0]?.toUpperCase()}
            </strong>
          </span>

          <span>
            <p className="py-1 font-semibold text-white">
              {ride.initiatedBy.firstName[0].toUpperCase() +
                ride.initiatedBy.firstName.slice(1, 6) +
                " " +
                ride.initiatedBy.lastName[0].toUpperCase() +
                ride.initiatedBy.lastName.slice(1, 6)}
            </p>

            <p className="text-sm font-medium text-gray-400">
              Passenger - {Number(ride.distance).toFixed(1)} km
            </p>
          </span>
        </div>

        <Link
          href={`tel:+${ride.initiatedBy.phone}`}
          className="flex w-fit rounded-full bg-secondary/20 p-3"
        >
          <Phone size={18} color="#ffb700" />
        </Link>
      </div>

      <hr className="mx-2 mt-3 border-gray-500" />

      <span className="flex items-center justify-between py-3">
        <p className="text-[#8B8B8B]">Your earning</p>

        <PriceFormat className="text-white" amount={Number(ride.price)} />
      </span>

      {/* Status */}
      <div className="flex flex-col gap-5">
        <SwitchRideState
          text="On my way"
          checked={rideStatus === "on_my_way"}
          handleStatusChange={handleStatusChange}
          id="on_my_way"
          rideProgress={rideProgress}
        />

        <SwitchRideState
          text="Arrived"
          checked={rideStatus === "at_pickup"}
          handleStatusChange={handleStatusChange}
          id="at_pickup"
          rideProgress={rideProgress}
        />

        <SwitchRideState
          text="Trip in progress"
          checked={rideStatus === "in_progress"}
          handleStatusChange={handleStatusChange}
          id="in_progress"
          rideProgress={rideProgress}
        />

        <SwitchRideState
          text="Ride Completed"
          checked={rideStatus === "ride_completed"}
          handleStatusChange={handleStatusChange}
          id="ride_completed"
          rideProgress={rideProgress}
        />
      </div>

      <Link
        href={`https://www.google.com/maps/dir/?api=1&origin=<${pickup?.lat},${pickup?.lng}&destination=${dropoff?.lat},${dropoff?.lng}
`}
      >
        <Button className="mt-6 h-10 w-full rounded-lg bg-secondary text-black">
          Open in Google maps
        </Button>
      </Link>
    </motion.div>
  );
}
