"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from "lucide-react";

import { Header } from "@/components/marketplace";

export default function ConfirmationPage() {
  const [order, setOrder] = useState("");

  useEffect(() => {
    const orderId =
      new URLSearchParams(window.location.search).get("order") ||
      `TV-${crypto.randomUUID().split("-")[0].toUpperCase()}`;

    setOrder(orderId);
  }, []);

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          {/* Success icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2
              size={44}
              className="text-emerald-600"
              strokeWidth={1.8}
            />
          </div>

          {/* Main confirmation card */}
          <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Top section */}
            <div className="px-6 py-10 text-center sm:px-10">
              <span className="mb-3 inline-block text-xs font-bold tracking-[0.18em] text-blue-600">
                ORDER RECEIVED
              </span>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Order confirmed
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Your TechVault order has been created successfully.
              </p>

              {/* Order number */}
              <div className="mx-auto mt-7 max-w-md rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Order number
                </p>

                <p className="mt-1 text-lg font-bold tracking-wide text-slate-950">
                  {order}
                </p>
              </div>
            </div>

            {/* Information */}
            <div className="border-t border-slate-200 px-6 py-7 sm:px-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <Package size={20} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Order processing
                    </h2>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      Your prototype order is now marked as processing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <ShoppingBag size={20} className="text-blue-600" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Checkout details
                    </h2>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      We&apos;ll use the information provided during checkout
                      for this prototype order.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-6 sm:px-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Continue shopping
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/account"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  View my account
                </Link>
              </div>
            </div>
          </section>

          <p className="mt-6 max-w-xl text-center text-xs leading-5 text-slate-500">
            Thank you for shopping with TechVault.
          </p>
        </div>
      </main>
    </>
  );
}
