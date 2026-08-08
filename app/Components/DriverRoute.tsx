"use client";

import { useEffect, useState } from "react";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

interface Location {
  lat: number;
  lng: number;
}

interface Props {
  origin: Location;
  destination: Location;
}

export default function DriverRoute({ origin, destination }: Props) {
  const map = useMap();

  const routesLibrary = useMapsLibrary("routes");

  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>(null);

  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  /*
   * Create Google Directions objects
   */
  useEffect(() => {
    if (!routesLibrary) return;

    setDirectionsService(new google.maps.DirectionsService());

    setDirectionsRenderer(
      new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        preserveViewport: true,

        polylineOptions: {
          strokeWeight: 5,
        },
      }),
    );
  }, [routesLibrary]);

  /*
   * Attach renderer to map
   */
  useEffect(() => {
    if (!map || !directionsRenderer) return;

    directionsRenderer.setMap(map);

    return () => {
      directionsRenderer.setMap(null);
    };
  }, [map, directionsRenderer]);

  /*
   * Calculate route
   */
  useEffect(() => {
    if (!directionsService || !directionsRenderer) {
      return;
    }

    directionsService.route(
      {
        origin,
        destination,

        travelMode: google.maps.TravelMode.DRIVING,
      },

      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          directionsRenderer.setDirections(result);
        } else {
          console.error("Directions request failed:", status);
        }
      },
    );
  }, [
    directionsService,
    directionsRenderer,
    origin.lat,
    origin.lng,
    destination.lat,
    destination.lng,
  ]);

  return null;
}
