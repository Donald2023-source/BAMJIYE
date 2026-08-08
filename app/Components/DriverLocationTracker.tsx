"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";

export default function DriverLocationTracker({
  driverId,
  rideId,
}: {
  driverId: string;
  rideId: string;
}) {
  useEffect(() => {
    if (!driverId) return;

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        console.log("Driver GPS:", {
          latitude,
          longitude,
          accuracy,
        });

        socket.emit("driver:location", {
          driverId,
          rideId,
          lat: latitude,
          lng: longitude,
          accuracy,
        });
      },
      (error) => {
        console.error("GPS error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 10000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [driverId, rideId]);

  return null;
}
