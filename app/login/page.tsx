"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import { Header } from "@/components/marketplace";
import { useStorefront } from "@/components/storefront-provider";

export default function LoginPage() {
  const { login } = useStorefront();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const success = login(email.trim(), password);

    if (success) {
      window.location.href = "/account";
      return;
    }

    setError(
      "Demo account not found. Register first or check your credentials.",
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left panel */}
          <section className="hidden bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <ShoppingBag size={22} />
              </div>

              <span className="mt-8 inline-block text-xs font-bold tracking-[0.18em] text-blue-100">
                TECHVAULT
              </span>

              <h2 className="mt-3 text-3xl font-bold leading-tight">
                Your tech setup starts here.
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100">
                Sign in to manage your orders, wishlist, demo wallet balance,
                and TechVault account.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck size={19} className="mt-0.5 shrink-0" />

                <div>
                  <p className="text-sm font-semibold">
                    Secure demo experience
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-100">
                    Your account experience is designed for this storefront
                    prototype.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <LockKeyhole size={19} className="mt-0.5 shrink-0" />

                <div>
                  <p className="text-sm font-semibold">
                    Easy account management
                  </p>

                  <p className="mt-1 text-xs leading-5 text-blue-100">
                    Access your orders and saved products from one place.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Login form */}
          <section className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <span className="text-xs font-bold tracking-[0.18em] text-blue-600">
                  WELCOME BACK
                </span>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  Sign in to TechVault
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter your account details to continue.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              <form onSubmit={submit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      required
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (error) setError("");
                      }}
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={17}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      required
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your password"
                      className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Sign in
                  <ArrowRight size={17} />
                </button>
              </form>

              {/* Register */}
              <div className="mt-7 border-t border-slate-200 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  New here?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Create a demo account
                  </Link>
                </p>
              </div>

              {/* Back to store */}
              <div className="mt-5 text-center">
                <Link
                  href="/"
                  className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                  ← Back to TechVault
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Demo notice */}
        <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-5 text-slate-400">
          Demo storefront account — authentication is currently handled locally
          for this prototype.
        </p>
      </main>
    </>
  );
}
