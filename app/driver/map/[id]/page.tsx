"use client";

import { useEffect, useState } from "react";

import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";

import { useParams } from "next/navigation";

import { socket } from "@/lib/socket";

import DriverRoute from "@/app/Components/DriverRoute";

interface Location {
  lat: number;
  lng: number;
}

interface Ride {
  _id: string;

  pickup: {
    location: {
      coordinates: [number, number];
    };
  };

  dropoff: {
    location: {
      coordinates: [number, number];
    };
  };
}

export default function DriverMapPage() {
  const params = useParams();

  const driverId = params.id as string;

  const [ride, setRide] = useState<Ride | null>(null);

  const [driverLocation, setDriverLocation] = useState<Location | null>(null);

  const [loading, setLoading] = useState(true);

  /*
   * Get driver's active ride
   */
  useEffect(() => {
    if (!driverId) return;

    const getActiveRide = async () => {
      try {
        setLoading(true);

        const url =
          `${process.env.NEXT_PUBLIC_API_URL}` +
          `/api/drivers/${driverId}/active-ride`;

        console.log("Getting active ride:", url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch active ride");
        }

        const data = await response.json();

        console.log("Active ride:", data);

        if (data.ride) {
          setRide(data.ride);
        } else {
          setRide(null);
        }
      } catch (error) {
        console.error("Failed to get active ride:", error);
      } finally {
        setLoading(false);
      }
    };

    getActiveRide();
  }, [driverId]);

  /*
   * Track driver's GPS
   */
  useEffect(() => {
    if (!ride?._id || !driverId) {
      return;
    }

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported");

      return;
    }

    console.log("Starting driver GPS tracking...");

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;

        const lng = position.coords.longitude;

        const accuracy = position.coords.accuracy;

        console.log("Driver location:", lat, lng);

        /*
         * Update local map
         */
        setDriverLocation({
          lat,
          lng,
        });

        /*
         * Send location to backend
         */
        socket.emit("driver:location", {
          driverId,
          rideId: ride._id,

          lat,
          lng,

          accuracy,
        });
      },

      (error) => {
        console.error("Location error:", error);
      },

      {
        enableHighAccuracy: true,

        maximumAge: 3000,

        timeout: 10000,
      },
    );

    return () => {
      console.log("Stopping GPS tracking...");

      navigator.geolocation.clearWatch(watchId);
    };
  }, [ride?._id, driverId]);

  /*
   * Loading
   */
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  /*
   * No active ride
   */
  if (!ride) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No active ride</h2>

          <p className="mt-2 text-gray-500">
            Accept a ride through WhatsApp to start tracking.
          </p>
        </div>
      </div>
    );
  }

  /*
   * GeoJSON coordinates are:
   *
   * [lng, lat]
   *
   * Google Maps expects:
   *
   * { lat, lng }
   */

  const pickup: Location = {
    lat: ride.pickup.location.coordinates[1],

    lng: ride.pickup.location.coordinates[0],
  };

  const dropoff: Location = {
    lat: ride.dropoff.location.coordinates[1],

    lng: ride.dropoff.location.coordinates[0],
  };

  const mapCenter = driverLocation ?? pickup;

  return (
    <div className="relative h-screen w-full">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          style={{
            width: "100%",
            height: "100%",
          }}
          defaultCenter={mapCenter}
          defaultZoom={15}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {/* PICKUP */}

          <AdvancedMarker position={pickup}>
            <div className="text-3xl">📍</div>
          </AdvancedMarker>

          {/* DROPOFF */}

          <AdvancedMarker position={dropoff}>
            <div className="text-3xl">🏁</div>
          </AdvancedMarker>

          {/* DRIVER */}

          {driverLocation && (
            <AdvancedMarker position={driverLocation}>
              <div className="text-3xl">🚗</div>
            </AdvancedMarker>
          )}

          {/* ROUTE */}

          {driverLocation && (
            <DriverRoute origin={driverLocation} destination={pickup} />
          )}
        </Map>
      </APIProvider>

      {/* Ride information */}

      <div className="absolute left-4 right-4 top-4 rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current ride</p>

            <p className="font-semibold">Ride #{ride._id.slice(-6)}</p>
          </div>

          <div className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            Active
          </div>
        </div>
      </div>
    </div>
  );
}
