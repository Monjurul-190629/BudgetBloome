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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="hidden md:flex items-center justify-center p-6">
          <div className="relative w-full h-full">
            <Image
              src={authLogo}
              alt="authLogo"
              className="rounded-xl object-cover w-full h-full"
            />

            {/* Green Overlay */}
            <div className="absolute inset-0 bg-green-600/40 rounded-xl" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
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
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
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
                  className="flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition"
                >
                  <Upload size={16} />
                  Upload Image
                </label>
              </div>

              {/* Inputs */}
              <FormInput
                name="name"
                form={form}
                label="Full Name"
                placeholder="Enter your full name"
                isRequired
              />

              <FormInput
                name="email"
                form={form}
                label="Email"
                placeholder="Enter your email"
                isRequired
              />

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
