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