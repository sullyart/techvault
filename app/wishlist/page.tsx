"use client";

import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag, Sparkles } from "lucide-react";

import { Header, ProductGrid, CartDrawer } from "@/components/marketplace";

import { products } from "@/lib/catalog";
import { useStorefront } from "@/components/storefront-provider";

export default function WishlistPage() {
  const { wishlist } = useStorefront();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-80px)] bg-slate-50">
        <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          {/* Breadcrumb */}
          <div className="mb-7 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-blue-700">
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-slate-600">Wishlist</span>
          </div>

          {/* ============================================================
              PAGE HEADER
          ============================================================ */}
          <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Decorative background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-cyan-100/40 blur-3xl"
            />

            <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between lg:p-10">
              <div className="max-w-2xl">
                {/* Eyebrow */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
                  <Heart size={13} />
                  Saved for later
                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  Your wishlist
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-[15px]">
                  Keep the products you love close. Save items now and come back
                  whenever you&apos;re ready for your next upgrade.
                </p>
              </div>

              {/* Wishlist count */}
              {wishlistProducts.length > 0 && (
                <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                    <Heart size={18} />
                  </div>

                  <div>
                    <strong className="block text-lg font-black leading-none text-slate-950">
                      {wishlistProducts.length}
                    </strong>

                    <span className="mt-1 block text-xs font-medium text-slate-400">
                      {wishlistProducts.length === 1
                        ? "saved product"
                        : "saved products"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ============================================================
              PRODUCTS
          ============================================================ */}
          {wishlistProducts.length > 0 ? (
            <>
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-slate-950">
                    Saved products
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Your selected TechVault favorites.
                  </p>
                </div>

                <div className="hidden items-center gap-2 text-xs font-semibold text-slate-400 sm:flex">
                  <Sparkles size={14} />
                  Ready when you are
                </div>
              </div>

              <ProductGrid items={wishlistProducts} />

              {/* Continue shopping */}
              <div className="mt-10 flex justify-center sm:mt-12">
                <Link
                  href="/"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                >
                  <ShoppingBag size={17} />
                  Continue shopping
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </>
          ) : (
            /* ============================================================
               EMPTY WISHLIST
            ============================================================ */
            <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:py-20 lg:py-24">
              {/* Decorative circles */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/60 blur-3xl"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/4 h-32 w-32 rounded-full bg-cyan-100/40 blur-3xl"
              />

              <div className="relative mx-auto flex max-w-lg flex-col items-center">
                {/* Icon */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-100 bg-blue-50 text-blue-700 shadow-sm">
                  <Heart size={34} strokeWidth={1.7} />
                </div>

                <span className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700">
                  Nothing saved yet
                </span>

                <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  Your wishlist is empty
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Browse the TechVault catalog and tap the heart on any product
                  you&apos;re interested in. Your favorites will appear here.
                </p>

                <Link
                  href="/"
                  className="group mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(29,78,216,0.18)] transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-[0_10px_25px_rgba(29,78,216,0.24)] focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  <ShoppingBag size={17} />
                  Explore products
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </section>
          )}

          {/* Bottom reassurance */}
          <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Heart size={13} />
            <span>Your saved products stay in your TechVault wishlist.</span>
          </div>
        </div>
      </main>

      <CartDrawer />
    </>
  );
}
