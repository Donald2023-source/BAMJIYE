"use client";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
interface Location {
  lat: number;
  lng: number;
}

interface Props {
  pickup: Location;
  dropoff: Location;
}

export default function RideMap({ pickup, dropoff }: Props) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        style={{
          width: "100%",
          height: "100%",
        }}
        defaultCenter={pickup}
        defaultZoom={14}
        gestureHandling="greedy"
        disableDefaultUI
      >
        <Marker position={pickup} />

        <Marker position={dropoff} />
      </Map>
    </APIProvider>
  );
}
