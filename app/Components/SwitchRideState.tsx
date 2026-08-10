import React from "react";
import { Switch } from "./ui/Switch";

interface Props {
  handleStatusChange: (checked: boolean, id: string) => void;
  text: string;
  checked: boolean;
  id: string;
}

export default function SwitchRideState({
  handleStatusChange,
  text,
  id,
  checked,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-white">{text}</p>

      <Switch
        checked={checked}
        onCheckedChange={(value) => handleStatusChange(value, id)}
      />
    </div>
  );
}