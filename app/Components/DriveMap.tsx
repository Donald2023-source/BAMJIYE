"use client";

import { useEffect, useState } from "react";

import RideMap from "@/app/Components/RideMap";
import DriverLocationTracker from "@/app/Components/DriverLocationTracker";

interface Props {
  driverId: string;
}

export default function DriverMap({
  driverId,
}: Props) {
  const [ride, setRide] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getActiveRide() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/drivers/${driverId}/active-ride`
        );

        const data = await response.json();

        setRide(data.ride);
      } catch (error) {
        console.error(
          "Failed to get active ride:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    getActiveRide();
  }, [driverId]);

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (!ride) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>No active ride</p>
      </div>
    );
  }

  const pickup = {
    lat: ride.pickup.location.coordinates[1],
    lng: ride.pickup.location.coordinates[0],
  };

  const dropoff = {
    lat: ride.dropoff.location.coordinates[1],
    lng: ride.dropoff.location.coordinates[0],
  };

  return (
    <div className="relative h-screen w-full">
      <RideMap
        pickup={pickup}
        dropoff={dropoff}
      />

      <DriverLocationTracker
        driverId={driverId}
        rideId={ride._id}
      />
    </div>
  );
}