import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Ride {
  _id: string;
  initiatedBy: {
    firstName: string;
    lastName: string;
    phone: string;
  };

  currentDriver: {
    fullName: string;
    profile_photo: string;
    phone: string;
    plate_number: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  status: string;
  rideProgress: string[];
  price: string;
  pickup: {
    name: string;
    location: {
      coordinates: [number, number];
    };
  };

  distance: string;

  dropoff: {
    name: string;
    location: {
      coordinates: [number, number];
    };
  };
}

export interface Location {
  lat: number;
  lng: number;
  accuracy?: number;
}
