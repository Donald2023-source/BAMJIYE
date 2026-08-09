"use client";
import { LoadScript } from "@react-google-maps/api";
import React from "react";
export default function MapLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        >
          {children}
        </LoadScript>
      </body>
    </html>
  );
}
