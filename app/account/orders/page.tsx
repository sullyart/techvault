"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CreditCard,
  Package,
  ShoppingBag,
} from "lucide-react";

import { Header, CartDrawer } from "@/components/marketplace";
import { useStorefront } from "@/components/storefront-provider";

export default function OrderHistoryPage() {
  const { user } = useStorefront();

  // User is not signed in
  if (!user) {
    return (
      <>
        <Header />

        <main className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <Package size={30} className="text-blue-600" />
            </div>

            <span className="text-xs font-bold tracking-[0.18em] text-blue-600">
              MY ORDERS
            </span>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Order history
            </h1>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Sign in to view your previous TechVault orders and order details.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Sign in
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/account"
              className="mt-4 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Back to account
            </Link>
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
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/account" className="transition hover:text-blue-600">
              Account
            </Link>

            <span>/</span>

            <span className="font-medium text-slate-900">Order history</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <span className="text-xs font-bold tracking-[0.18em] text-blue-600">
              MY TECHVAULT
            </span>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Order history
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  View your previous TechVault orders and purchase details.
                </p>
              </div>

              <Link
                href="/account"
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:self-auto"
              >
                <ArrowLeft size={16} />
                Back to account
              </Link>
            </div>
          </div>

          {/* Empty state */}
          {user.orders.length === 0 ? (
            <section className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                <ShoppingBag size={30} className="text-blue-600" />
              </div>

              <h2 className="text-2xl font-bold text-slate-950">
                No orders yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                You haven&apos;t placed any orders yet. Explore our catalog and
                find something for your setup.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <ShoppingBag size={17} />
                Start shopping
              </Link>
            </section>
          ) : (
            <div className="space-y-5">
              {user.orders.map((order) => (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {/* Order header */}
                  <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Order number
                          </p>

                          <p className="mt-1 font-bold tracking-wide text-slate-950">
                            {order.id}
                          </p>
                        </div>

                        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-slate-400" />

                          <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                              Date
                            </p>

                            <p className="mt-1 text-sm font-medium text-slate-700">
                              {new Date(order.date).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      <span className="inline-flex w-fit items-center rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold capitalize text-amber-700">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="divide-y divide-slate-100">
                    {order.lines.map((line) => (
                      <div
                        key={line.product.id}
                        className="flex gap-4 px-5 py-5 sm:px-6"
                      >
                        {/* Product image */}
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white sm:h-24 sm:w-24">
                          <img
                            src={line.product.image}
                            alt={line.product.name}
                            className="h-full w-full object-contain p-2"
                          />
                        </div>

                        {/* Product details */}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold leading-5 text-slate-900">
                            {line.product.name}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {line.product.brand}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                            <span>
                              Quantity:{" "}
                              <strong className="text-slate-700">
                                {line.quantity}
                              </strong>
                            </span>

                            <span>
                              Unit price:{" "}
                              <strong className="text-slate-700">
                                ${line.product.price.toFixed(2)}
                              </strong>
                            </span>
                          </div>
                        </div>

                        {/* Line total */}
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-slate-950">
                            ${(line.product.price * line.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order footer */}
                  <div className="border-t border-slate-200 px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                      <div className="flex flex-wrap gap-x-8 gap-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                            <CreditCard size={14} />
                            Payment
                          </div>

                          <p className="mt-1 text-sm font-medium text-slate-700">
                            {order.payment}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Items
                          </p>

                          <p className="mt-1 text-sm font-medium text-slate-700">
                            {order.lines.reduce(
                              (total, line) => total + line.quantity,
                              0,
                            )}{" "}
                            item
                            {order.lines.reduce(
                              (total, line) => total + line.quantity,
                              0,
                            ) !== 1
                              ? "s"
                              : ""}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-4 sm:border-0 sm:pt-0 sm:text-right">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                          Order total
                        </p>

                        <p className="mt-1 text-2xl font-bold text-slate-950">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Bottom shopping CTA */}
          {user.orders.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <ShoppingBag size={17} />
                Continue shopping
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </main>

      <CartDrawer />
    </>
  );
}
