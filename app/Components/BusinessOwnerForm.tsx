"use client";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast, Button, toast } from "@heroui/react";
import axiosInstance from "@/config/axiosInstance";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/Components/ui/select";

const items = [
  { label: "What best describes your business", value: null },
  { label: "Restaurant", value: "restaurant" },
  { label: "Supermarket", value: "supermarket" },
  { label: "Hospital / Healthcare", value: "healthcare" },
  { label: "Hotel / Hospitality", value: "hotel" },
  { label: "Other", value: "other" },
];

const formSchema = z.object({
  businessName: z.string().min(2),
  phone: z
    .string()
    .regex(
      /^[1-9][0-9]{9,10}$/,
      "Phone number must be 10 or 11 digits and cannot start with 0",
    ),
  email: z.string().email(),
  city: z.string().min(2),
  service: z.string().refine((value) => value !== "default", {
    message: "Please select your business type",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function BusinessOwnerForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    console.log("form");
    setLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/vendor", data);
      const newRes = await res?.data;
      if (res?.status === 200) {
        toast.success("Registeration Successful!", {
          description: "Welcome to  Bamjiye! 🎉",
        });

        setLoading(true);
        router.push("/auth/success");
      }
      if (res?.status !== 200) {
        toast.danger("Registration Failed!", {
          description: newRes?.message || "Please try again.",
        });

        console.log(newRes?.message);
        return setLoading(false);
      }
      console.log(newRes);
    } catch (err: any | unknown) {
      console.log(err);
      console.error(err?.response, "Something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-4">
        <fieldset className="flex flex-col w-full gap-2">
          <label className="text-sm text-black/60">Business Name</label>
          <input
            {...register("businessName")}
            className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
            placeholder="Shop City"
          />
          {errors.businessName && (
            <p className="text-red-500 text-xs">
              {errors.businessName.message}
            </p>
          )}
        </fieldset>
      </div>

      <fieldset className="flex flex-col gap-2">
        <label className="text-sm text-black/60">Phone Number</label>

        <div className="flex items-center bg-[#F7F7F7] border border-gray-200 rounded-xl p-3">
          <span className="text-gray-400 pr-3 border-r">+234</span>
          <input
            {...register("phone")}
            className="pl-3 w-full outline-none bg-transparent"
            placeholder="8120334225"
          />
        </div>

        {errors.phone && (
          <p className="text-red-500 text-xs">{errors.phone.message}</p>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <label className="text-sm text-black/60">Email</label>
        <input
          {...register("email")}
          className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
          placeholder="judenoah@gmail.com"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <label className="text-sm text-black/60">City</label>
        <input
          {...register("city")}
          className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
          placeholder="Abuja | Jos"
        />
        {errors.city && (
          <p className="text-red-500 text-xs">{errors.city.message}</p>
        )}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <label className="text-sm text-black/60">Business Type</label>

        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full rounded-xl py-5">
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Business Type</SelectLabel>

                  {items
                    .filter((item) => item.value !== "default")
                    .map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        {errors.service && (
          <p className="text-red-500 text-xs">{errors.service.message}</p>
        )}
      </fieldset>

      <button
        type="submit"
        className="w-full cursor-pointer   bg-primary text-white py-3 rounded-full mt-4"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
