"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import img from "@/public/Auth-img.jpg";
import Image from "next/image";
import { useState } from "react";
// import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Toast, Button, toast } from "@heroui/react";
import axiosInstance from "@/config/axiosInstance";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/Components/ui/tabs";
import PersonalForm from "@/app/Components/PersonalForm";
import BusinessOwnerForm from "@/app/Components/BusinessOwnerForm";

export default function Page() {
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
            <Tabs defaultValue="account" className=" cw-[400px]">
              <div className="w-full">
                <TabsList>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <PersonalForm />
                </TabsContent>
                <TabsContent value="business">
                  <BusinessOwnerForm />
                </TabsContent>
              </div>
            </Tabs>
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
