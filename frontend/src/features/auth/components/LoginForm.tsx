"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import FormInput from "@/components/common-ui/form/FormInput";
import { useAuth } from "@/features/auth/store/auth.store";
import { API_ERROR } from "@/shared/common.types";
import { loginSchema } from "../schema/auth.schema";
import { LOGIN } from "../types/auth.types";
import { userLogin } from "../api/auth.api";
import AuthLayout from "./AuthLayout";

const inputStyles =
  "h-11 rounded-xl border-gray-300 bg-gray-50/60 px-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/30";

const LoginForm = () => {
  const setToken = useAuth((state) => state.setToken);
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LOGIN>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "monjurulalam4@gmail.com",
      password: "123456",
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

        router.push("/dashboard");
      }

      toast.success(message || "Login successful");
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

  const onSubmit = (data: LOGIN) => {
    mutation.mutate({ data });
  };

  return (
    <AuthLayout
      heading="Welcome back"
      subheading="Sign in to continue to your dashboard."
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/registration"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
          >
            Create one
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

          <FormInput
            name="password"
            form={form}
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
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

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex cursor-pointer select-none items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-emerald-600"
              />
              Remember me
            </label>

            <Link
              href="/login"
              className="font-medium text-emerald-600 transition hover:text-emerald-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:from-emerald-400 hover:to-green-500 hover:shadow-emerald-600/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default LoginForm;
