"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  LogOut,
  Package,
  Plus,
  ShoppingBag,
  Wallet,
} from "lucide-react";

import { Header, CartDrawer } from "@/components/marketplace";
import { useStorefront } from "@/components/storefront-provider";

export default function AccountPage() {
  const { user, logout, addFunds } = useStorefront();

  // Not signed in
  if (!user) {
    return (
      <>
        <Header />

        <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <ShoppingBag size={30} className="text-blue-600" />
            </div>

            <span className="text-xs font-bold tracking-[0.18em] text-blue-600">
              MY TECHVAULT
            </span>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Your account
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Sign in to manage your profile, view orders, check your balance,
              and access your wishlist.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Sign in
              <ArrowRight size={17} />
            </Link>

            <p className="mt-5 text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create one
              </Link>
            </p>
          </div>
        </main>

        <CartDrawer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Page heading */}
          <div className="mb-8">
            <span className="text-xs font-bold tracking-[0.18em] text-blue-600">
              MY TECHVAULT
            </span>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Welcome back, {user.firstName}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  Manage your TechVault account and orders.
                </p>
              </div>

              <button
                type="button"
                onClick={logout}
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:self-auto"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>

          {/* Account stats */}
          <div className="grid gap-4 md:grid-cols-3">
            {/* Total Spent */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider text-slate-500">
                    TOTAL SPENT
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                    $
                    {user.orders
                      .filter((order) => order.status !== "cancelled")
                      .reduce((total, order) => total + order.total, 0)
                      .toFixed(2)}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Wallet size={21} className="text-blue-600" />
                </div>
              </div>

              <Link
                href="/account/orders"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View spending history
                <ArrowRight size={16} />
              </Link>

              <p className="mt-3 text-xs leading-5 text-slate-400">
                Based on your completed purchases.
              </p>
            </section>

            {/* Orders */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider text-slate-500">
                    ORDERS
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                    {user.orders.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Package size={21} className="text-blue-600" />
                </div>
              </div>

              <Link
                href="/account/orders"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View order history
                <ArrowRight size={16} />
              </Link>
            </section>

            {/* Wishlist */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold tracking-wider text-slate-500">
                    WISHLIST
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                    {user.wishlist.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Heart size={21} className="text-blue-600" />
                </div>
              </div>

              <Link
                href="/wishlist"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View wishlist
                <ArrowRight size={16} />
              </Link>
            </section>
          </div>

          {/* Account information */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="font-semibold text-slate-950">
                Account information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your TechVault profile details.
              </p>
            </div>

            <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Name
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Email
                </p>

                <p className="mt-1 font-medium text-slate-900">{user.email}</p>
              </div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-slate-950">Quick actions</h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <ShoppingBag size={17} />
                Shop now
              </Link>

              <Link
                href="/account/orders"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Package size={17} />
                My orders
              </Link>

              <Link
                href="/wishlist"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Heart size={17} />
                My wishlist
              </Link>
            </div>
          </section>
        </div>
      </main>

      <CartDrawer />
    </>
  );
}
