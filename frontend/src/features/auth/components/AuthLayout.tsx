"use client";

import Image from "next/image";
import Link from "next/link";
import { BarChart3, TrendingUp, Wallet } from "lucide-react";
import authLogo from "@/assets/image/desert1.jpg";
import { socialLinks } from "./SocialLinks";

const features = [
  { icon: BarChart3, label: "Smart Tracking" },
  { icon: Wallet, label: "Budget Control" },
  { icon: TrendingUp, label: "Insights" },
];

interface AuthLayoutProps {
  heading: string;
  subheading: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const AuthLayout = ({
  heading,
  subheading,
  children,
  footer,
}: AuthLayoutProps) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#03140b] text-white">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-green-400/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_45%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-6 sm:px-6">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_25px_80px_-20px_rgba(0,0,0,0.65)] lg:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-[640px]">
            <Image
              src={authLogo}
              alt="Desert landscape"
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/60 to-green-500/30" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-lg font-black text-emerald-600 shadow-lg shadow-black/20">
                  B
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  Budget<span className="text-emerald-300">Bloom</span>
                </span>
              </div>

              <div className="hidden sm:block">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-100 ring-1 ring-inset ring-white/20 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Personal finance, simplified
                </span>
                <h2 className="max-w-sm text-3xl font-bold leading-tight text-white lg:text-4xl">
                  Take control of every taka you spend.
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-emerald-50/80">
                  Track income, plan budgets, and grow your savings — all in one
                  calm, beautiful place.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {features.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-inset ring-white/15 backdrop-blur"
                    >
                      <Icon className="h-4 w-4 text-emerald-300" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-emerald-50/80">
                <div className="flex items-center gap-3">
                  {socialLinks.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:scale-110 hover:text-white"
                      >
                        <Icon size={16} />
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/privacy-policy"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-white px-6 py-8 text-gray-900 sm:px-10 sm:py-12">
            <div className="mb-7">
              <div className="mb-5 flex items-center gap-2 lg:hidden">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-sm font-black text-white">
                  B
                </div>
                <span className="text-base font-bold text-gray-900">
                  BudgetBloom
                </span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {heading}
              </h1>
              <p className="mt-2 text-sm text-gray-500">{subheading}</p>
            </div>

            {children}

            <div className="mt-6 text-center text-sm text-gray-500">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
