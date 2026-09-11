"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";

import { Header, ProductGrid, CartDrawer } from "@/components/marketplace";

import { searchProducts } from "@/lib/catalog";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const searchQuery =
      new URLSearchParams(window.location.search).get("q") || "";

    setQuery(searchQuery);
  }, []);

  const items = searchProducts(query);

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-80px)] bg-[#f6f8fc]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-7 flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="font-medium text-slate-500 transition hover:text-blue-600"
            >
              Home
            </Link>

            <span className="text-slate-300">/</span>

            <span className="font-medium text-slate-900">Search</span>
          </div>

          {/* Hero / Heading */}
          <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-9">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-50 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-blue-700">
                <Search size={14} />
                SEARCH RESULTS
              </div>

              <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-[42px]">
                {query ? (
                  <>
                    Results for{" "}
                    <span className="text-blue-600">&quot;{query}&quot;</span>
                  </>
                ) : (
                  "Search the TechVault catalog"
                )}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                {query
                  ? `${items.length} ${
                      items.length === 1 ? "product" : "products"
                    } match your search.`
                  : "Find laptops, components, gaming gear, accessories, networking equipment, and more."}
              </p>
            </div>
          </section>

          {/* Results toolbar */}
          <div className="mt-7 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <SlidersHorizontal size={17} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-950">
                  {items.length} {items.length === 1 ? "product" : "products"}
                </p>

                {query ? (
                  <p className="mt-0.5 text-xs text-slate-500">
                    Found for your search
                  </p>
                ) : (
                  <p className="mt-0.5 text-xs text-slate-500">
                    Showing available catalog products
                  </p>
                )}
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <ArrowLeft size={15} />
              Browse all products
            </Link>
          </div>

          {/* Results */}
          {items.length > 0 ? (
            <section className="mt-7">
              <ProductGrid items={items} />
            </section>
          ) : (
            /* Empty state */
            <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
                  <div className="absolute inset-0 rounded-2xl bg-blue-100/50 blur-xl" />

                  <Search
                    size={32}
                    className="relative text-blue-600"
                    strokeWidth={1.8}
                  />
                </div>

                <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  No products found
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                  {query
                    ? `We couldn't find any products matching "${query}". Try a different product name, brand, or category.`
                    : "Enter a product, brand, or category in the search bar above to explore the TechVault catalog."}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                  >
                    <ShoppingBag size={17} />
                    Explore products
                  </Link>

                  <Link
                    href="/category/laptops"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Browse categories
                  </Link>
                </div>
              </div>

              {/* Helpful suggestions */}
              <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-5">
                <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  Try searching for
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {[
                    "Gaming",
                    "Laptops",
                    "Graphics Cards",
                    "Monitors",
                    "Keyboards",
                    "Storage",
                  ].map((suggestion) => (
                    <Link
                      key={suggestion}
                      href={`/search?q=${encodeURIComponent(suggestion)}`}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      {suggestion}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <CartDrawer />
    </>
  );
}
