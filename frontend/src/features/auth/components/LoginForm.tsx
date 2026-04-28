"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common-ui/form/FormInput";
import { loginSchema } from "../schema/auth.schema";
import { LOGIN } from "../types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../api/auth.api";
import { useAuth } from "@/features/auth/store/auth.store";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import authLogo from "@/assets/image/desert1.jpg";
import { BarChart3, Wallet, TrendingUp } from "lucide-react";
import { socialLinks } from "./SocialLinks";

const LoginForm = () => {
  const setToken = useAuth((state) => state.setToken);
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<LOGIN>({
    resolver: zodResolver(loginSchema) as any,
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: userLogin,

    onSuccess: (response) => {
      const { message, data } = response?.data || {};
      const token = data?.token;

      if (token) {
        setToken(token);

        if (rememberMe) {
          localStorage.setItem("token", token);
        }

        router.push("/");
      }

      toast.success(message || "Login successful");
    },

    onError: (error: AxiosError<any>) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(message);
    },
  });

  const onSubmit = (data: LOGIN) => {
    mutation?.mutate({ data });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 py-3">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="relative w-full h-64 sm:h-72 lg:h-auto">
          <Image
            src={authLogo}
            alt="authLogo"
            className="object-cover w-full h-full"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-green-800/70 to-green-400/20 z-0" />

          <div className="absolute top-4 left-4 z-10 text-white">
            <div className="w-8 h-8 bg-white text-green-600 rounded-full flex items-center justify-center font-bold">
              B
            </div>
            <p className="mt-2 text-sm font-semibold">
              Welcome Back to BudgetBloom
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10 px-6 text-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-6 py-6 shadow-2xl max-w-sm">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <BarChart3 size={16} />
                  Smart Tracking
                </span>
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <Wallet size={16} />
                  Budget Control
                </span>
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp size={16} />
                  Insights
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between text-white text-xs">
            <div className="flex gap-3">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link key={i} href={item.href} target="_blank">
                    <Icon size={16} />
                  </Link>
                );
              })}
            </div>

            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                name="email"
                form={form}
                label="Email"
                placeholder="Enter your email"
                isRequired
              />

              <FormInput
                name="password"
                form={form}
                label="Password"
                type="password"
                placeholder="Enter your password"
                isRequired
              />

              {/* Remember Me */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember Me
                </label>

                <Link href="/login" className="text-green-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-green-700 transition"
              >
                Sign In
              </button>

              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/registration"
                  className="text-green-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
