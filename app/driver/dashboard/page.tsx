"use client";
import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { AcceptRide, RejectRide } from "@/app/functions/rideActions";

export default function DriverDashboard() {
  const [rideRequest, setRideRequest] = useState<{
    rideId: string | null;
  } | null>(null);
  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.log("Connect error:", err);
  });
  useEffect(() => {
    socket.on("ride:offer", (data) => {
      console.log("🚗 New ride:", data);
      setRideRequest(data);
    });

    socket.on("ride:cancel:others", () => {
      setRideRequest(null);
    });

    return () => {
      socket.off("ride:offer");
      socket.off("ride:cancel:others");
    };
  }, []);

  return (
    <div>
      <h1>Driver Dashboard</h1>

      {rideRequest && (
        <div>
          <p>New Ride Request</p>
          <button onClick={() => AcceptRide(rideRequest.rideId)}>Accept</button>
          <button onClick={() => RejectRide(rideRequest.rideId)}>Reject</button>
        </div>
      )}
    </div>
  );
}
