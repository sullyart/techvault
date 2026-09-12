"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  UserPlus,
  Zap,
} from "lucide-react";

import { Header } from "@/components/marketplace";
import { useStorefront } from "@/components/storefront-provider";

export default function RegisterPage() {
  const { register } = useStorefront();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    register({
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
    });

    location.href = "/account";
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-blue-700">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-600">Create account</span>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,35,80,0.08)] lg:grid lg:grid-cols-[0.88fr_1.12fr]">
            {/* ============================================================
                LEFT PANEL
            ============================================================ */}
            <section className="relative hidden overflow-hidden bg-[#071c4d] p-10 text-white lg:flex lg:min-h-[700px] lg:flex-col lg:justify-between xl:p-12">
              {/* Decorative shapes */}
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-cyan-300/10 bg-blue-500/10"
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/5 bg-cyan-400/5"
              />

              <div
                aria-hidden="true"
                className="absolute right-10 top-1/2 h-32 w-32 rounded-full bg-cyan-400/5 blur-2xl"
              />

              <div className="relative">
                {/* Icon */}
                <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-lg backdrop-blur-sm">
                  <UserPlus
                    size={25}
                    strokeWidth={1.8}
                    className="text-cyan-300"
                  />
                </div>

                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                  <Zap size={14} />
                  Join the Vault
                </div>

                <h1 className="max-w-md text-4xl font-black leading-[1.08] tracking-tight xl:text-5xl">
                  Your tech.
                  <br />
                  Your account.
                  <br />
                  <span className="text-cyan-300">Your vault.</span>
                </h1>

                <p className="mt-6 max-w-md text-[15px] leading-7 text-blue-100/80">
                  Create your TechVault account and keep everything you need for
                  your next upgrade in one place.
                </p>
              </div>

              {/* Benefits */}
              <div className="relative mt-12">
                <div className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-blue-200/60">
                  Your account includes
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/10">
                      <CheckCircle2 size={16} className="text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Track your orders
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-blue-100/60">
                        Keep an eye on every purchase.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/10">
                      <CheckCircle2 size={16} className="text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Save your favorites
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-blue-100/60">
                        Build a wishlist for future upgrades.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/10">
                      <CheckCircle2 size={16} className="text-cyan-300" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Manage your TechVault balance
                      </p>
                      <p className="mt-0.5 text-xs leading-5 text-blue-100/60">
                        Use your available balance at checkout.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom brand note */}
              <div className="relative mt-12 border-t border-white/10 pt-6">
                <p className="text-xs font-medium text-blue-100/50">
                  Better tech starts here.
                </p>
              </div>
            </section>

            {/* ============================================================
                FORM PANEL
            ============================================================ */}
            <section className="p-6 sm:p-10 lg:p-12 xl:p-14">
              <div className="mx-auto max-w-xl">
                {/* Mobile heading */}
                <div className="mb-8 lg:hidden">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-700">
                    <UserPlus size={23} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                    Join the Vault
                  </p>
                </div>

                {/* Heading */}
                <div className="mb-8">
                  <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                    Create your account
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                    Set up your TechVault account and start building your
                    personalized shopping experience.
                  </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                  {/* Name fields */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        First name
                      </label>

                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="John"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Last name
                      </label>

                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            lastName: e.target.value,
                          })
                        }
                        placeholder="Doe"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      placeholder="you@example.com"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-slate-700"
                      >
                        Password
                      </label>

                      <span className="shrink-0 text-xs font-medium text-slate-400">
                        6+ characters
                      </span>
                    </div>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                        })
                      }
                      placeholder="Create a password"
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  {/* Demo notice */}
                  <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
                      <ShieldCheck size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-blue-950">
                        Your secure storefront account
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-800/80">
                        Account data is stored locally for this frontend
                        prototype. No real payment or authentication service is
                        connected.
                      </p>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(29,78,216,0.18)] transition hover:bg-blue-800 hover:shadow-[0_10px_25px_rgba(29,78,216,0.24)] focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-[0.99]"
                  >
                    Create account
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </button>
                </form>

                {/* Login */}
                <p className="mt-7 text-center text-sm text-slate-500">
                  Already registered?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-blue-700 transition hover:text-blue-800 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>

                {/* Divider / home */}
                <div className="mt-8 border-t border-slate-100 pt-6 text-center">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-blue-700"
                  >
                    ← Back to TechVault
                  </Link>
                </div>
              </div>
            </section>
          </div>

          {/* Security reassurance */}
          <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
            <ShieldCheck size={14} />
            <span>Secure and protected checkout</span>
          </div>
        </div>
      </main>
    </div>
  );
}
