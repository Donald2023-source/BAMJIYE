"use client";

import React, { useCallback, useEffect, useState } from "react";

import {
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useParams } from "next/navigation";

import { socket } from "@/lib/socket";
import { MapPin, Phone } from "lucide-react";
import PriceFormat from "@/app/Components/PriceFormatter";
import { Switch } from "@/app/Components/ui/Switch";
import SwitchRideState from "@/app/Components/SwitchRideState";
import { Button } from "@heroui/react";
import Link from "next/link";
import { Ride } from "@/types";
import RideDetails from "@/app/Components/RideDetails";

interface Location {
  lat: number;
  lng: number;
  accuracy?: number;
}



const containerStyle = {
  width: "100%",
  height: "100vh",
};

export default function DriverMapPage() {
  const params = useParams();

  const driverId = params.id as string;

  const [ride, setRide] = useState<Ride | null>(null);
  const [checked, setChecked] = useState(false);
  const [driverLocation, setDriverLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [rideStatus, setRideStatus] = useState<string | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  /*
   * Load Google Maps
   */
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  /*
   * Get active ride
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

        setRide(null);
      } finally {
        setLoading(false);
      }
    };

    getActiveRide();
  }, [driverId]);

  /*
   * Convert pickup/dropoff coordinates
   *
   * MongoDB GeoJSON:
   * [lng, lat]
   *
   * Google Maps:
   * { lat, lng }
   */
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

  /*
   * Get driving directions
   */
  useEffect(() => {
    if (!isLoaded || !pickup || !dropoff) {
      return;
    }

    console.log("🗺️ Getting directions...");

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

    console.log("🚗 Starting GPS tracking...");

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        console.log("🚗 DRIVER LOCATION:", {
          lat,
          lng,
          accuracy,
        });

        /*
         * Update driver marker
         */
        setDriverLocation({
          lat,
          lng,
          accuracy,
        });

        /*
         * Keep map centered on driver
         */
        if (map) {
          map.panTo({
            lat,
            lng,
          });
        }

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
        console.error("❌ GPS error:", error);
      },

      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 10000,
      },
    );

    return () => {
      console.log("🛑 Stopping GPS tracking");

      navigator.geolocation.clearWatch(watchId);
    };
  }, [ride?._id, driverId, map]);

  /*
   * Map loaded
   */
  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    console.log("🗺️ Google Map loaded");

    setMap(mapInstance);
  }, []);

  /*
   * Map unmounted
   */
  const onUnmount = useCallback(() => {
    console.log("🗺️ Google Map unmounted");

    setMap(null);
  }, []);

  /*
   * Loading ride
   */
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading active ride...</p>
      </div>
    );
  }

  /*
   * Google Maps loading error
   */
  if (loadError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Failed to load Google Maps.</p>
      </div>
    );
  }

  /*
   * Loading Google Maps
   */
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
        <p className="mt-2 text-gray-500">
          Accept a ride through WhatsApp to start tracking.
        </p>
      </div>
    );
  }

  const mapCenter = pickup;

  const handleStatusChange = (checked: boolean, id: string) => {
    if (checked) {
      setRideStatus(id);
      console.log("status changed", id);
    }
  };
  return (
    <div className="relative h-screen w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          clickableIcons: false,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
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
              suppressMarkers: true,
              polylineOptions: {
                strokeWeight: 5,
              },
            }}
          />
        )}

        {driverLocation && <MarkerF position={driverLocation} label="🚗" />}
      </GoogleMap>

      <RideDetails handleStatusChange={handleStatusChange} ride={ride} rideStatus={rideStatus} />
    </div>
  );
}
