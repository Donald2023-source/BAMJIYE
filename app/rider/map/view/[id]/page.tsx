"use client";
import NameNotch from "@/app/Components/nameNotch";
import RideMap from "@/app/Components/RideMap";
import RideDetails from "@/app/rider/components/RideDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewMap() {
  interface driverLocation {
    location: {
      lat: number;
      lng: number;
    };
  }
  const rideId = useParams()?.id;

  const [driverLocation, setDriverLocation] = useState<driverLocation | null>(
    null,
  );

  return (
    <div className="relative">
      <NameNotch />
      <RideMap rideId={rideId?.toString() ?? ""} />
      <RideDetails rideId={rideId?.toString() ?? ""} />
    </div>
  );
}
