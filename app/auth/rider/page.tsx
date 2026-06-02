"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import img from "@/public/Auth-img.jpg";
import Image from "next/image";
import { useState } from "react";
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z
    .string()
    .regex(
      /^[1-9][0-9]{9,10}$/,
      "Phone number must be 10 or 11 digits and cannot start with 0",
    ),
  email: z.string().email(),
  city: z.string().min(2),
});

type FormData = z.infer<typeof formSchema>;


export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await fetch("https://bamjiye-agent-production.up.railway.app/api/auth/rider", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const newRes = await res.json();
      if (newRes?.status === 201) {
        // toast.success("Account created successfully!.", { autoClose: 3000 });
        router.push("/auth/success");
        return setLoading(false);
      }
      if (newRes?.success === false) {
        // toast.error(
        //   newRes?.message || "Something went wrong. Please try again.",
        //   { autoClose: 3000 },
        // );
        return setLoading(false);
      }
      console.log(newRes);
    } catch (err) {
      console.error(err, "Something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-primary/5 flex items-center justify-center md:px-4 xl:p-4">
      <div className="w-full md:w-full  xl:w-full max-w-6xl xl:p-3 xl:rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="flex flex-col-reverse justify-between lg:flex-row">
          <div className="w-full lg:w-1/2 p-6  sm:p-10">
            <div className="text-center mb-8">
              <h4 className="font-bold text-2xl sm:text-3xl text-primary">
                Create Your <br />
                <i className="text-secondary">BAMJIYE</i> Account
              </h4>

              <p className="text-sm text-black/60 mt-2">
                Pick how you want to move. You can switch any time.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <fieldset className="flex flex-col w-full gap-2">
                  <label className="text-sm text-black/60">First Name</label>
                  <input
                    {...register("firstName")}
                    className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
                    placeholder="Jude"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </p>
                  )}
                </fieldset>

                <fieldset className="flex flex-col w-full gap-2">
                  <label className="text-sm text-black/60">Last Name</label>
                  <input
                    {...register("lastName")}
                    className="bg-[#F7F7F7] p-3 rounded-xl outline-none border border-gray-200"
                    placeholder="Noah"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">
                      {errors.lastName.message}
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

              <button
                type="submit"
                className="w-full cursor-pointer   bg-primary text-white py-3 rounded-full mt-4"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          <div className="w-full rounded-4xl md:rounded-4xl lg:w-[40%] bg-primary h-64 sm:h-96 lg:h-auto">
            <Image
              src={img}
              priority
              alt="auth image"
              className="w-full rounded-4xl h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
