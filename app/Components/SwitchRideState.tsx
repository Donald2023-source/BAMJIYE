"use client";
import React, { useState } from "react";
import { Switch } from "./ui/Switch";

interface Props {
  handleStatusChange: (checked: boolean, id: string) => void;
  text: string;
  checked: boolean;
  id: string;
  rideProgress: string[];
}

export default function SwitchRideState({
  handleStatusChange,
  text,
  id,
  checked,
  rideProgress,
}: Props) {
  const isStatusExisting = rideProgress?.includes(id) ?? false;


  return (
    <div className="flex items-center justify-between">
      <p
        className={`${isStatusExisting ? "text-gray-400 font-medium" : "text-white"}`}
      >
        {text}
      </p>

      <Switch
        checked={checked || isStatusExisting}
        disabled={isStatusExisting}
        onCheckedChange={(value) => handleStatusChange(value, id)}
      />
    </div>
  );
}
