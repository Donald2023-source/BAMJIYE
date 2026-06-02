"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import img from "@/public/driver auth-img.png";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

import { Button, toast } from "@heroui/react";
import { PersonStanding } from "lucide-react";
import axiosInstance from "@/config/axiosInstance";

const formSchema = z.object({
  fullName: z.string().min(2),
  drivers_license_number: z.string().min(10).max(20),
  plate_number: z.string().min(5).max(20),
  phone: z
    .string()
    .regex(
      /^[1-9][0-9]{9,10}$/,
      "Phone number must be 10 or 11 digits and cannot start with 0",
    ),
  email: z.string().email(),
  city_of_operation: z.string().min(2),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/auth/driver", data);

      const driver = await res.data;
      console.log(driver);
      if (res?.status === 200) {
        toast.success("Registeration Successful!", {
          description: "Welcome to  Bamjiye! 🎉",
        });

        localStorage.setItem("driverId", driver?.user?.id);
        router.push("/auth/driver/upload-documents");
        console.log(driver);
        return setLoading(true);
      }
      console.log(driver?.message);
    } catch (error: any | unknown) {
      console.log(
        "Error creating driver account:",
        error?.response?.data?.message,
      );

      toast.danger("Registration Failed!", {
        description: "Please try again.",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const noop = () => {};

  return (
    <div className="min-h-screen w-full bg-primary/5 flex items-center justify-center md:px-4 xl:p-3">
      <div className="w-full md:w-full  xl:w-full max-w-6xl xl:p-2 xl:rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="flex flex-col-reverse justify-between lg:flex-row-reverse">
          <div className="w-full lg:w-1/2 p-6  sm:p-10">
            <div className="text-center mb-8">
              <h4 className="font-bold text-2xl sm:text-3xl text-primary">
                Create Your <br />
                <i className="text-secondary">BAMJIYE</i> Account
              </h4>

              <p className="text-sm text-black/60 mt-2">
                Start earning with Bamjiye. Sign up in minutes and get ride
                requests straight on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <fieldset className="flex flex-col w-full gap-2">
                  <label className="text-sm text-black/60">Full Name</label>
                  <input
                    {...register("fullName")}
                    className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
                    placeholder="Jude Noah"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs">
                      {errors.fullName.message}
                    </p>
                  )}
                </fieldset>
              </div>

              <fieldset className="flex flex-col w-full gap-2">
                <label className="text-sm text-black/60">Email</label>
                <input
                  {...register("email")}
                  className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
                  placeholder="Jude@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label className="text-sm text-black/60">WhatsApp Number</label>

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
                <label className="text-sm text-black/60">
                  City Of Operation
                </label>
                <input
                  {...register("city_of_operation")}
                  className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
                  placeholder="Abuja | Jos"
                />
                {errors.city_of_operation && (
                  <p className="text-red-500 text-xs">
                    {errors.city_of_operation.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label className="text-sm text-black/60">
                  Drivers License Number
                </label>
                <input
                  {...register("drivers_license_number")}
                  className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
                  placeholder="09456789098768"
                />
                {errors.drivers_license_number && (
                  <p className="text-red-500 text-xs">
                    {errors.drivers_license_number.message}
                  </p>
                )}
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <label className="text-sm text-black/60">
                  Keke Plate Number
                </label>
                <input
                  {...register("plate_number")}
                  className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
                  placeholder="09456789098768"
                />
                {errors.plate_number && (
                  <p className="text-red-500 text-xs">
                    {errors.plate_number.message}
                  </p>
                )}
              </fieldset>

              <button
                type="submit"
                className="w-full cursor-pointer   bg-primary text-white py-3 rounded-full mt-4"
              >
                {loading ? "Creating Account..." : "Next"}
              </button>
            </form>
          </div>

          <div className="w-full rounded-b-4xl md:rounded-4xl lg:w-[45%] h-64 sm:h-92 lg:h-auto">
            <Image
              src={img}
              priority
              alt="auth image"
              className="w-full rounded-b-4xl md:rounded-4xl h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
