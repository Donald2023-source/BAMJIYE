"use client";
import RideMap from "@/app/Components/RideMap";
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
  // console.log("Ride Id", rideId);
  const [driverLocation, setDriverLocation] = useState<driverLocation | null>(
    null,
  );

  return (
    <>
      <RideMap rideId={rideId?.toString() ?? ""} />
    </>
  );
}
