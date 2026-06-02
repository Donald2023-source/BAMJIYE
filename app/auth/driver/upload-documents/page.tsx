"use client";

import Image from "next/image";
import img from "@/public/driver auth-img.png";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Page() {
  const [loading, setLoading] = useState(false);
  const [driver, setDriver] = useState("");
  const [nin, setNin] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("driverId");
   if(userId) {
     setDriver(userId);
   } else {
    router.push("/auth/driver")
   }
  }, []);

  console.log(driver);
  console.log(nin);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);

      formData.append("driverId", driver);

      const ninPhoto = formData.get("nin_photo") as File;
      const profilePhoto = formData.get("profile_photo") as File;

      if (!ninPhoto || ninPhoto.size === 0) {
        alert("Please upload your NIN photo");
        return;
      }

      if (!profilePhoto || profilePhoto.size === 0) {
        alert("Please upload your profile photo");
        return;
      }

      console.log({
        driver,
        ninPhoto,
        profilePhoto,
      });

      const response = await fetch("/api/auth/upload-documents", {
        method: "PATCH",
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      if (data.success) {
        toast.success("Documents uploaded successfully");
        router.push("/auth/success");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-primary/5 flex items-center justify-center md:px-4 xl:p-3">
      <div className="w-full md:w-full xl:w-full max-w-6xl xl:p-2 xl:rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="flex flex-col-reverse justify-between lg:flex-row-reverse">
          <div className="w-full lg:w-1/2 p-6 sm:p-10">
            <div className="text-center mb-8">
              <h4 className="font-bold text-2xl sm:text-3xl text-primary">
                Account Setup
              </h4>

              <p className="text-sm text-black/60 mt-2">
                Complete your profile and verification.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <fieldset className="flex flex-col gap-2">
                <h2 className="text-sm text-black/60">NIN Upload</h2>

                <input
                  id="nin_photo"
                  type="file"
                  name="nin_photo"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setNin(e.target.files ? e.target.files[0] : null);
                  }}
                />

                <label
                  htmlFor="nin_photo"
                  className={`w-full cursor-pointer bg-[#F7F7F7] p-18 rounded-lg text-sm text-center border border-black/20 ${nin?.name && "border-green-500 border-2 bg-green-100"}`}
                >
                  {nin ? nin?.name : "Upload NIN Photo"}
                </label>
              </fieldset>

              <fieldset className="flex flex-col gap-2">
                <h2 className="text-sm text-black/60">
                  Upload a Profile Photo (Clear image of your face)
                </h2>

                <input
                  id="profile_photo"
                  type="file"
                  name="profile_photo"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setProfilePhoto(e.target.files ? e.target.files[0] : null);
                  }}
                />

                <label
                  htmlFor="profile_photo"
                  className={`w-full cursor-pointer bg-[#F7F7F7] p-18 rounded-lg text-sm text-center border border-black/20 ${profilePhoto && "border-green-500 border-2 bg-green-100"}`}
                >
                  {profilePhoto ? profilePhoto.name : "Upload Profile Photo"}
                </label>
              </fieldset>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-primary text-white py-3 rounded-full mt-4 disabled:opacity-50"
              >
                {loading ? "Signing up..." : "Sign up"}
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
