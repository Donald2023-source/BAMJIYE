import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
interface Location {
  lat: number;
  lng: number;
}
function DriverMarker({ position }: { position: Location }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.panTo(position);
  }, [map, position]);

  return (
    <AdvancedMarker position={position}>
      <div
        style={{
          fontSize: "32px",
          transition: "transform 0.3s ease",
        }}
      >
        📌
      </div>
    </AdvancedMarker>
  );
}
export default DriverMarker;
