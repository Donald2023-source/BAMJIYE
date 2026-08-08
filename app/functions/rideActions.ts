import { socket } from "../socket";

export async function AcceptRide(rideId: string | null) {
  socket.emit("ride:accept", { rideId });
}

export async function RejectRide(rideId: string | null) {
  socket.emit("ride:reject", { rideId });
}
