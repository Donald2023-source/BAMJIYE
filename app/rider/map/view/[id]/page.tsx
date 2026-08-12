"use client";
import NameNotch from "@/app/Components/nameNotch";
import RideMap from "@/app/Components/RideMap";
import RideDetails from "@/app/rider/components/RideDetails";
import { Ride } from "@/types";
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
  const [ride, setRide] = useState<Ride | null>(null);

  useEffect(() => {
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
  }, [rideId]);

  
  return (
    <div className="relative">
      <NameNotch name={ride?.currentDriver?.fullName.toUpperCase()?? ""} />
      <RideMap rideId={rideId?.toString() ?? ""} />
      <RideDetails rideId={rideId?.toString() ?? ""} />
    </div>
  );
}
