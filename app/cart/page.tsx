"use client";

import Link from "next/link";

import { Header, CartDrawer } from "@/components/marketplace";
import { useStorefront } from "@/components/storefront-provider";

import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    subtotal,
    shipping,
    tax,
    total,
    updateQuantity,
    removeFromCart,
  } = useStorefront();

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#f5f8fd]">
        {/* Page container */}
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {/* Breadcrumbs */}
          <nav className="mb-7 flex items-center gap-2 text-sm text-[#657491]">
            <Link
              href="/"
              className="font-medium transition-colors hover:text-[#145fd1]"
            >
              Home
            </Link>

            <span className="text-[#a9b5c9]">/</span>

            <span className="font-medium text-[#10234d]">Cart</span>
          </nav>

          {/* Heading */}
          <div className="mb-8 flex flex-col gap-5 border-b border-[#d9e3f2] pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#145fd1]">
                Your order
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-[#071c4d] sm:text-4xl">
                Shopping cart
              </h1>

              {cart.length > 0 && (
                <p className="mt-2 text-sm text-[#657491]">
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your
                  cart
                </p>
              )}
            </div>

            {cart.length > 0 && (
              <Link
                href="/"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#d9e3f2] bg-white px-4 py-2.5 text-sm font-semibold text-[#10234d] shadow-sm transition-all hover:border-[#145fd1] hover:text-[#145fd1]"
              >
                <ArrowLeft size={16} />
                Continue shopping
              </Link>
            )}
          </div>

          {/* Empty cart */}
          {cart.length === 0 ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-2xl border border-[#d9e3f2] bg-white px-6 py-20 text-center shadow-sm">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#edf4ff]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-7 w-7 text-[#145fd1]"
                  aria-hidden="true"
                >
                  <path
                    d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="20" r="1" fill="currentColor" />
                  <circle cx="18" cy="20" r="1" fill="currentColor" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-[#071c4d]">
                Your cart is empty
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#657491]">
                Browse our catalog and find something great for your setup.
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex items-center justify-center rounded-lg bg-[#145fd1] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0f4eae] hover:shadow-md"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_380px]">
              {/* Cart items */}
              <section className="space-y-4">
                {cart.map((line) => (
                  <article
                    key={line.product.id}
                    className="group rounded-2xl border border-[#d9e3f2] bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                  >
                    <div className="flex gap-4 sm:gap-5">
                      {/* Product image */}
                      <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#e5ebf4] bg-[#f8faff] sm:h-36 sm:w-36">
                        <img
                          src={line.product.image}
                          alt={line.product.name}
                          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Product information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#145fd1]">
                              {line.product.brand}
                            </p>

                            <h3 className="line-clamp-2 text-base font-bold leading-6 text-[#10234d] sm:text-lg">
                              {line.product.name}
                            </h3>

                            <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-[#657491]">
                              {line.product.shortDescription}
                            </p>
                          </div>

                          {/* Desktop total */}
                          <div className="hidden shrink-0 text-right sm:block">
                            <strong className="text-lg font-bold text-[#071c4d]">
                              ${(line.product.price * line.quantity).toFixed(2)}
                            </strong>

                            {line.quantity > 1 && (
                              <p className="mt-1 text-xs text-[#657491]">
                                ${line.product.price.toFixed(2)} each
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Bottom controls */}
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                          {/* Quantity */}
                          <div className="flex h-10 items-center overflow-hidden rounded-lg border border-[#d9e3f2] bg-white">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  line.product.id,
                                  line.quantity - 1,
                                )
                              }
                              aria-label="Decrease quantity"
                              className="flex h-full w-10 items-center justify-center text-[#10234d] transition-colors hover:bg-[#f1f5fb] hover:text-[#145fd1]"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="flex h-full min-w-10 items-center justify-center border-x border-[#d9e3f2] px-2 text-sm font-bold text-[#10234d]">
                              {line.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  line.product.id,
                                  line.quantity + 1,
                                )
                              }
                              aria-label="Increase quantity"
                              className="flex h-full w-10 items-center justify-center text-[#10234d] transition-colors hover:bg-[#f1f5fb] hover:text-[#145fd1]"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(line.product.id)}
                            className="inline-flex items-center gap-1.5 rounded-md px-2 py-2 text-sm font-semibold text-[#657491] transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={15} />
                            Remove
                          </button>

                          {/* Mobile total */}
                          <div className="ml-auto text-right sm:hidden">
                            <strong className="text-base font-bold text-[#071c4d]">
                              ${(line.product.price * line.quantity).toFixed(2)}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}

                {/* Trust information */}
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-[#d9e3f2] bg-white px-4 py-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edf4ff] text-[#145fd1]">
                      <Truck size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#10234d]">
                        Fast shipping
                      </p>
                      <p className="text-xs text-[#657491]">
                        Free on orders over $49
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-[#d9e3f2] bg-white px-4 py-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edf4ff] text-[#145fd1]">
                      <ShieldCheck size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#10234d]">
                        Secure checkout
                      </p>
                      <p className="text-xs text-[#657491]">
                        Your demo order is protected
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Order summary */}
              <aside className="lg:sticky lg:top-6">
                <div className="overflow-hidden rounded-2xl border border-[#d9e3f2] bg-white shadow-sm">
                  {/* Summary heading */}
                  <div className="border-b border-[#e8edf5] px-5 py-5 sm:px-6">
                    <h2 className="text-lg font-bold text-[#071c4d]">
                      Order summary
                    </h2>
                  </div>

                  {/* Summary details */}
                  <div className="space-y-4 px-5 py-5 sm:px-6">
                    <div className="flex items-center justify-between gap-4 text-sm text-[#657491]">
                      <span>Subtotal</span>
                      <b className="font-semibold text-[#10234d]">
                        ${subtotal.toFixed(2)}
                      </b>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm text-[#657491]">
                      <span>Shipping</span>
                      <b className="font-semibold text-[#10234d]">
                        {shipping ? `$${shipping.toFixed(2)}` : "Free"}
                      </b>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm text-[#657491]">
                      <span>Tax</span>
                      <b className="font-semibold text-[#10234d]">
                        ${tax.toFixed(2)}
                      </b>
                    </div>

                    <div className="border-t border-[#e8edf5] pt-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-base font-bold text-[#10234d]">
                          Total
                        </span>

                        <b className="text-2xl font-bold tracking-tight text-[#071c4d]">
                          ${total.toFixed(2)}
                        </b>
                      </div>
                    </div>

                    <div className="rounded-lg bg-[#f5f8fd] px-3.5 py-3 text-xs leading-5 text-[#657491]">
                      Free shipping on orders of $49 or more.
                    </div>

                    <Link
                      href="/checkout"
                      className="flex w-full items-center justify-center rounded-lg bg-[#145fd1] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#0f4eae] hover:shadow-md"
                    >
                      Proceed to checkout
                    </Link>

                    <Link
                      href="/"
                      className="flex w-full items-center justify-center rounded-lg border border-[#d9e3f2] bg-white px-5 py-3 text-sm font-bold text-[#10234d] transition-colors hover:border-[#145fd1] hover:text-[#145fd1]"
                    >
                      Continue shopping
                    </Link>
                  </div>
                </div>

                {/* Demo checkout notice */}
                <div className="mt-4 rounded-xl border border-[#d9e3f2] bg-white p-4">
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={18}
                      className="mt-0.5 shrink-0 text-[#145fd1]"
                    />

                    <p className="text-xs leading-5 text-[#657491]">
                      Checkout is currently a demo experience. No real payment
                      will be processed.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <CartDrawer />
    </>
  );
}
