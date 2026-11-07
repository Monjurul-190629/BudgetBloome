"use client";

import Image from "next/image";
import Link from "next/link";
import { BarChart3, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import authLogo from "@/assets/image/desert1.webp";
import { socialLinks } from "./SocialLinks";

const features = [
  { icon: BarChart3, label: "Smart Tracking" },
  { icon: Wallet, label: "Budget Control" },
  { icon: TrendingUp, label: "Insights" },
];

const miniBars = [38, 62, 48, 76, 56, 86, 70];

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
      <div className="auth-orb pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-500/30 blur-[100px]" />
      <div className="auth-orb-slow pointer-events-none absolute -bottom-48 -right-20 h-[30rem] w-[30rem] rounded-full bg-green-400/20 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-400/10 blur-[90px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_45%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-6 sm:px-6">
        <div className="auth-fade-up grid w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white shadow-[0_35px_120px_-35px_rgba(16,185,129,0.55)] lg:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[220px] overflow-hidden sm:min-h-[280px] lg:min-h-[640px]">
            <Image
              src={authLogo}
              alt="Desert landscape"
              fill
              priority
              unoptimized
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="scale-105 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/60 to-green-500/30" />

            <div className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-8 top-20 h-32 w-32 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute bottom-16 -left-24 h-56 w-56 rounded-full border border-white/5" />

            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-lg font-black text-emerald-600 shadow-lg shadow-black/20">
                  B
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  Budget<span className="text-emerald-300">Bloom</span>
                </span>
              </div>

              <div className="auth-pop [animation-delay:120ms]">
                <span className="mb-3 hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-100 ring-1 ring-inset ring-white/20 backdrop-blur sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Personal finance, simplified
                </span>
                <h2 className="max-w-sm text-xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                  Take control of every taka you spend.
                </h2>
                <p className="mt-2 hidden max-w-sm text-sm leading-relaxed text-emerald-50/80 sm:mt-3 sm:block">
                  Track income, plan budgets, and grow your savings — all in one
                  calm, beautiful place.
                </p>

                <div className="mt-6 hidden flex-wrap gap-2 sm:flex">
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

                <div className="mt-6 hidden max-w-sm rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md sm:block">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-100/80">
                      Monthly overview
                    </span>
                    <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                      +12.4%
                    </span>
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-2xl font-bold tracking-tight text-white">
                        ৳ 84,250
                      </p>
                      <p className="text-[11px] text-emerald-100/70">
                        Total balance
                      </p>
                    </div>
                    <div className="flex h-10 items-end gap-1">
                      {miniBars.map((height, i) => (
                        <span
                          key={i}
                          className="w-1.5 rounded-full bg-gradient-to-t from-emerald-400/40 to-emerald-300"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
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

          <div className="relative flex flex-col justify-center overflow-hidden bg-white px-6 py-8 text-gray-900 sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-green-50 blur-3xl" />

            <div className="relative mb-7">
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

            <div className="relative">{children}</div>

            <div className="relative mt-6 text-center text-sm text-gray-500">
              {footer}
            </div>

            <div className="relative mt-5 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              Your data is encrypted and never shared.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
