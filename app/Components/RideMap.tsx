"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

import { socket } from "@/lib/socket";
import { Location, Ride } from "@/types";
import RideDetails from "../rider/components/RideDetails";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

interface RiderMapProps {
  rideId: string;
}

export default function RiderMap({ rideId }: RiderMapProps) {
  const [ride, setRide] = useState<Ride | null>(null);
  const [driverLocation, setDriverLocation] = useState<Location | null>(null);

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [loading, setLoading] = useState(true);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    if (!rideId) {
      setLoading(false);
      return;
    }

    const getRide = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/drivers/${rideId}/driver-location`,
        );
        console.log(
          `${process.env.NEXT_PUBLIC_API_URL}/api/drivers/${rideId}/driver-location`,
        );

        const data = await response.json();

        console.log("Rider ride from Ride Map component:", data);

        if (data.ride) {
          setRide(data.ride);
        } else {
          setRide(null);
        }

        if (data?.location) {
          setDriverLocation({
            lat: data?.location?.lat,
            lng: data?.location?.lng,
          });
        }
      } catch (error) {
        console.error("Failed to fetch ride:", error);
        setRide(null);
      } finally {
        setLoading(false);
      }
    };

    getRide();
  }, [rideId]);

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

  useEffect(() => {
    if (!rideId) return;

    console.log("👤 Rider joining ride:", rideId);

    socket.emit("ride:join", {
      rideId,
    });

    const handleDriverLocation = (data: {
      lat: number;
      lng: number;
      accuracy?: number;
    }) => {
      console.log("🚗 Driver location received:", data);

      setDriverLocation({
        lat: data.lat,
        lng: data.lng,
        accuracy: data.accuracy,
      });
    };

    socket.on("driver:location", handleDriverLocation);

    return () => {
      console.log("Rider leaving ride:", rideId);

      socket.off("driver:location", handleDriverLocation);

      socket.emit("ride:leave", {
        rideId,
      });
    };
  }, [rideId]);

  useEffect(() => {
    if (!isLoaded || !pickup || !dropoff) {
      return;
    }

    console.log("🗺️ Getting ride directions...");

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: {
          lat: pickup.lat,
          lng: pickup.lng,
        },

        destination: {
          lat: dropoff.lat,
          lng: dropoff.lng,
        },

        travelMode: google.maps.TravelMode.DRIVING,
      },

      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          console.log("✅ Directions received");

          setDirections(result);
        } else {
          console.error("❌ Directions request failed:", status);

          setDirections(null);
        }
      },
    );
  }, [isLoaded, pickup?.lat, pickup?.lng, dropoff?.lat, dropoff?.lng]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading ride...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Failed to load Google Maps.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading Google Maps...</p>
      </div>
    );
  }

  if (!ride || !pickup || !dropoff) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">No active ride found.</p>
      </div>
    );
  }

  console.log("Driver Location", driverLocation);
  return (
    <div className="relative h-screen w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={driverLocation ?? pickup}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          clickableIcons: false,
        }}
      >
        {/* PICKUP */}
        <MarkerF position={pickup}>
          <OverlayViewF
            position={pickup}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="rounded-lg bg-white px-3 py-1 text-sm font-semibold shadow">
              Pickup
            </div>
          </OverlayViewF>
        </MarkerF>

        <MarkerF position={dropoff}>
          <OverlayViewF
            position={dropoff}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="rounded-lg bg-white px-3 py-1 text-sm font-semibold shadow">
              Drop off
            </div>
          </OverlayViewF>
        </MarkerF>

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: "#002b5c",
                strokeWeight: 5,
              },
              suppressMarkers: true,
            }}
          />
        )}

        {driverLocation && (
          <OverlayViewF
            position={driverLocation}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xl shadow-lg">
              🚗
            </div>
          </OverlayViewF>
        )}
      </GoogleMap>
      <RideDetails rideId={rideId?.toString() ?? ""} />
    </div>
  );
}
