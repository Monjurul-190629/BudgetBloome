"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import FormInput from "@/components/common-ui/form/FormInput";
import { useAuth } from "@/features/auth/store/auth.store";
import { uploadToCloudinary } from "@/lib/utils/handyFunction";
import { API_ERROR } from "@/shared/common.types";
import { registrationSchema } from "../schema/auth.schema";
import { REGISTRATION, REGISTRATION_PAYLOAD } from "../types/auth.types";
import { userRegistration } from "../api/auth.api";
import AuthLayout from "./AuthLayout";
import PasswordStrength from "./PasswordStrength";

const inputStyles =
  "h-11 rounded-xl border-gray-300 bg-gray-50/60 px-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30";

const RegistrationForm = () => {
  const setToken = useAuth((state) => state.setToken);
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<REGISTRATION>({
    resolver: zodResolver(registrationSchema),
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
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      if (!imageUrl) throw new Error("Upload failed");

      form.setValue("image", imageUrl, { shouldValidate: true });
      toast.success("Profile photo uploaded");
    } catch {
      setPreview("");
      form.setValue("image", "");
      toast.error("Failed to upload image, please try again");
    } finally {
      setIsUploading(false);
      input.value = "";
    }
  };

  const mutation = useMutation({
    mutationFn: userRegistration,

    onSuccess: (response) => {
      const { message, data } = response?.data || {};
      const token = data?.token;

      if (token) {
        setToken(token);
        router.push("/");
      }

      toast.success(message || "User registered successfully");
    },

    onError: (error: AxiosError<API_ERROR>) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        "Something went wrong";

      toast.error(message);
    },
  });

  const onSubmit = (data: REGISTRATION) => {
    const payload: REGISTRATION_PAYLOAD = {
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      image: data.image,
      phone: data.phone,
    };

    mutation.mutate(payload);
  };

  return (
    <AuthLayout
      heading="Create your account"
      subheading="Start tracking your money in under a minute."
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="flex items-center gap-4">
            <label
              htmlFor="file-upload"
              className="group relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-emerald-500"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile preview"
                  width={96}
                  height={96}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera className="h-7 w-7 text-gray-400 transition group-hover:text-emerald-500" />
              )}

              {isUploading && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </span>
              )}
            </label>

            <div>
              <p className="text-sm font-medium text-gray-800">Profile photo</p>
              <p className="mt-0.5 text-xs text-gray-500">
                JPG or PNG. Optional.
              </p>
              <label
                htmlFor="file-upload"
                className="mt-2 inline-block cursor-pointer text-xs font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
              >
                Upload image
              </label>
            </div>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isUploading}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              name="name"
              form={form}
              label="Full name"
              placeholder="Enter your name"
              autoComplete="name"
              isRequired
              fieldClassName={inputStyles}
              labelIcon={<User className="h-4 w-4 text-emerald-600" />}
            />

            <FormInput
              name="email"
              form={form}
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              isRequired
              fieldClassName={inputStyles}
              labelIcon={<Mail className="h-4 w-4 text-emerald-600" />}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              name="address"
              form={form}
              label="Address"
              placeholder="Enter your address"
              autoComplete="street-address"
              isRequired
              fieldClassName={inputStyles}
              labelIcon={<MapPin className="h-4 w-4 text-emerald-600" />}
            />

            <FormInput
              name="phone"
              form={form}
              label="Phone"
              placeholder="Enter your phone"
              autoComplete="tel"
              fieldClassName={inputStyles}
              labelIcon={<Phone className="h-4 w-4 text-emerald-600" />}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              name="password"
              form={form}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              autoComplete="new-password"
              isRequired
              fieldClassName={inputStyles}
              labelIcon={<Lock className="h-4 w-4 text-emerald-600" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            <FormInput
              name="confirmPassword"
              form={form}
              label="Confirm password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat your password"
              autoComplete="new-password"
              isRequired
              fieldClassName={inputStyles}
              labelIcon={<Lock className="h-4 w-4 text-emerald-600" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />
          </div>

          <PasswordStrength control={form.control} />

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 accent-emerald-600"
              required
            />
            <label
              htmlFor="terms"
              className="text-xs leading-relaxed text-gray-600 sm:text-sm"
            >
              I agree to the{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-emerald-600 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="font-medium text-emerald-600 hover:underline"
              >
                User Agreement
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending || isUploading}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:from-emerald-400 hover:to-green-500 hover:shadow-emerald-600/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default RegistrationForm;
