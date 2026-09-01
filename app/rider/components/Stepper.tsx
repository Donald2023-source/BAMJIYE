"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { StepIconProps } from "@mui/material/StepIcon";
import { Ride } from "@/types";
import axios from "axios";

const steps = [
  {
    name: "On my way",
    id: "on_my_way",
  },
  {
    name: "At Pickup",
    id: "at_pickup",
  },
  {
    name: "Trip in Progress",
    id: "in_progress",
  },
  {
    name: "Ride Completed",
    id: "ride_completed",
  },
];

function CustomStepIcon({ active, completed }: StepIconProps) {
  return (
    <Box
      sx={{
        width: 23,
        height: 23,
        margin: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 17,
          height: 17,
          marginRight: "4px",
          borderRadius: "50%",
          backgroundColor: active || completed ? "#ffb700" : undefined,
          border:
            active || completed ? "2px solid #ffb700" : "2px solid #8B8B8B",
          boxSizing: "border-box",
        }}
      />
    </Box>
  );
}

export default function VerticalLinearStepper({ ride }: { ride: Ride }) {
  const rideProgress = ride.rideProgress ?? [];

  const currentProgress = rideProgress.at(-1);

  const currentStep = steps.find((step) => step.id === currentProgress);

  const currentStepName = currentStep?.name ?? "Not started";

  const activeStep = steps.findIndex((step) => step.id === currentProgress);

  const completeRide = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ride/${ride._id}/status`,
        {
          status: "ride_completed",
        },
      );

      console.log("✅ Ride completed:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "❌ Failed to complete ride:",
          error.response?.data || error.message,
        );
      } else {
        console.error("❌ Failed to complete ride:", error);
      }
    }
  };
  React.useEffect(() => {
    if (currentStep?.id === "ride_completed") {
      completeRide();
    }
  }, [currentStep?.id]);

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper
        activeStep={activeStep === -1 ? 0 : activeStep}
        orientation="vertical"
        sx={{
          "& .MuiStep-root": {
            padding: 0,
            color: "white",
          },

          "& .MuiStepLabel-root": {
            padding: 0,
            minHeight: 0,
            color: "white",
          },

          "& .MuiStepLabel-iconContainer": {
            padding: 0,
            paddingRight: "10px",
          },

          "& .MuiStepLabel-label": {
            color: "#8B8B8B",
            fontSize: "14px",
            fontWeight: 500,
          },

          "& .MuiStepLabel-label.Mui-active": {
            color: "white",
          },

          "& .MuiStepLabel-label.Mui-completed": {
            color: "white",
          },

          "& .MuiStepConnector-root": {
            marginLeft: "10px",
            color: "white",
          },

          "& .MuiStepConnector-line": {
            minHeight: "20px",
          },
        }}
      >
        {steps.map((step) => (
          <Step key={step.id}>
            <StepLabel
              className="text-white"
              slots={{
                stepIcon: CustomStepIcon,
              }}
            >
              {step.name}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
