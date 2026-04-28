"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common-ui/form/FormInput";
import { registrationSchema } from "../schema/auth.schema";
import { REGISTRATION } from "../types/auth.types";
import authLogo from "@/assets/image/desert1.jpg";
import Image from "next/image";
import { BarChart3, TrendingUp, Upload, Wallet } from "lucide-react";
import Link from "next/link";
import { socialLinks } from "./SocialLinks";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/handyFunction";
import { useMutation } from "@tanstack/react-query";
import { userRegistration } from "../api/auth.api";
import { useAuth } from "@/store/auth.store";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const RegistrationForm = () => {
  const setToken = useAuth((state) => state.setToken);
  const [preview, setPreview] = useState<string>("");
  const router = useRouter();

  const form = useForm<REGISTRATION>({
    resolver: zodResolver(registrationSchema) as any,
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
      address: "",
      phone: "",
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const imageUrl = await uploadToCloudinary(file);

    form.setValue("image", imageUrl);
  };

  const mutation = useMutation({
    mutationFn: userRegistration,

    onSuccess: (response) => {
      const { message, data } = response?.data || {};
      const token = data?.jwt_token;

      if (token) {
        setToken(token);
        router.push("/");
      }

      toast.success(message || "Success");
    },

    onError: (error: AxiosError<any>) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(message);
    },
  });

  const onSubmit = (data: REGISTRATION) => {
    const { confirmPassword, ...payload } = data;
    mutation?.mutate(payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-3">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="relative w-full h-64 sm:h-72 lg:h-80">
          <Image
            src={authLogo}
            alt="authLogo"
            className="object-cover w-full h-full"
          />
          {/* image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-800/70 to-green-400/20 z-0" />

          <div className="absolute top-4 left-4 right-4 z-10 flex flex-col items-start gap-3 text-white">
            <div className="w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">
              B
            </div>
            <span className="text-sm sm:text-base font-semibold">
              Welcome to BudgetBloom
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10 px-6 text-center">
            <div className="bg-white/10 backdrop-blur-xl  rounded-3xl px-6 py-6 sm:px-8 sm:py-8 shadow-2xl max-w-sm sm:max-w-md">
              {/* mini highlight badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="text-[12px] sm:text-xs bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <BarChart3 size={20} color="yellow" />
                  Smart Tracking
                </span>

                <span className="text-[12px] sm:text-xs bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <Wallet size={20} color="yellow" />
                  Budget Control
                </span>

                <span className="text-[12px] sm:text-xs bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={20} color="yellow" />
                  Insights
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-row sm:justify-between items-start sm:items-center gap-4 text-white text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={16} className="hover:scale-110 transition" />
                  </Link>
                );
              })}
            </div>
            <Link href="/privacy-policy" className="hover:text-gray-200">
              Privacy Policy
            </Link>
            <Link href="/privacy-policy" className="hover:text-gray-200">
              Terms & Condition
            </Link>
          </div>
        </div>
        <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col items-start gap-2">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 border-1 shadow-sm sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}

                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  value={""}
                />

                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 cursor-pointer border px-3 py-1.5 rounded-md text-xs sm:text-sm text-gray-600 hover:bg-gray-100 transition"
                >
                  <Upload size={14} />
                  Upload Image
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  name="name"
                  form={form}
                  label="Full Name"
                  placeholder="Enter your name"
                  isRequired
                />

                <FormInput
                  name="email"
                  form={form}
                  label="Email"
                  placeholder="Enter your email"
                  isRequired
                />
              </div>

              <FormInput
                name="address"
                form={form}
                label="Address"
                placeholder="Enter your address"
                isRequired
              />

              <FormInput
                name="phone"
                form={form}
                label="Phone"
                placeholder="Enter your phone"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  name="password"
                  form={form}
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  isRequired
                />

                <FormInput
                  name="confirmPassword"
                  form={form}
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm password"
                  isRequired
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 cursor-pointer"
                  required
                />
                <label
                  htmlFor="terms"
                  className="text-xs sm:text-sm text-gray-600"
                >
                  I agree to the{" "}
                  <span className="text-green-600 cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                  and{" "}
                  <span className="text-green-600 cursor-pointer">
                    User Agreement
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-green-700 transition font-medium"
              >
                Sign Up
              </button>

              <p className="text-center text-xs sm:text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-green-600 hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
