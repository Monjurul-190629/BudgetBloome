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
import { Upload } from "lucide-react";

const RegistrationForm = () => {
  const [preview, setPreview] = useState<string>("");

  const form = useForm<REGISTRATION>({
    resolver: zodResolver(registrationSchema) as any,
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
      address: "",
      phone: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      form.setValue("image", imageUrl);
    }
  };

  const onSubmit = (data: REGISTRATION) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-3">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Left Side - Image (visible on md+) */}
        <div className="relative w-full h-48 sm:h-64 lg:h-auto">
          <Image
            src={authLogo}
            alt="authLogo"
            className="object-cover w-full h-full"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-800/70 to-green-400/20" />

          {/* Optional text */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-semibold px-4 text-center">
            Join Us & Start Your Journey 🚀
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-5">
            Create Account
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Image Upload */}
              <div className="flex flex-col items-center gap-3">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}

                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-2 cursor-pointer border px-3 py-1.5 rounded-md text-xs sm:text-sm text-gray-600 hover:bg-gray-100 transition"
                >
                  <Upload size={14} />
                  Upload Image
                </label>
              </div>

              {/* Inputs (responsive grid) */}
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

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-green-700 transition font-medium"
              >
                Sign Up
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
