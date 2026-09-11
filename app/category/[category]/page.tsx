"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpDown,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import { useParams } from "next/navigation";

import { Header, ProductGrid, CartDrawer } from "@/components/marketplace";

import { categoryProducts, categorySlugs } from "@/lib/catalog";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const title = categorySlugs[category] || category.replaceAll("-", " ");

  const items = categoryProducts(title);

  const [sort, setSort] = useState("featured");

  const sortedItems = useMemo(() => {
    const result = [...items];

    switch (sort) {
      case "price-low":
        return result.sort((a, b) => a.price - b.price);

      case "price-high":
        return result.sort((a, b) => b.price - a.price);

      case "rating":
        return result.sort((a, b) => b.rating - a.rating);

      default:
        return result;
    }
  }, [items, sort]);

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-80px)] bg-[#f6f8fc]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-7 flex flex-wrap items-center gap-2 text-sm">
            <Link
              href="/"
              className="font-medium text-slate-500 transition hover:text-blue-600"
            >
              Home
            </Link>

            <span className="text-slate-300">/</span>

            <span className="font-medium text-slate-500">Categories</span>

            <span className="text-slate-300">/</span>

            <span className="font-semibold capitalize text-slate-900">
              {title}
            </span>
          </div>

          {/* Category hero */}
          <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-7 shadow-sm sm:px-8 sm:py-9">
            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 right-24 h-56 w-56 rounded-full bg-cyan-50 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-blue-700">
                  TECHVAULT CATALOG
                </div>

                <h1 className="mt-4 text-3xl font-bold capitalize tracking-tight text-slate-950 sm:text-4xl lg:text-[42px]">
                  {title}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Explore our selection of{" "}
                  <span className="font-semibold text-slate-700">
                    {title.toLowerCase()}
                  </span>{" "}
                  with detailed specifications, realistic pricing, and products
                  ready for your next setup.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <ArrowLeft size={15} />
                All products
              </Link>
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
                  {sortedItems.length}{" "}
                  {sortedItems.length === 1 ? "product" : "products"}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Available in {title.toLowerCase()}
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                <ArrowUpDown size={15} />
                Sort by
              </span>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Sort products"
                className="h-10 min-w-[170px] rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price low to high</option>
                <option value="price-high">Price high to low</option>
                <option value="rating">Highest rated</option>
              </select>
            </label>
          </div>

          {/* Products */}
          {sortedItems.length > 0 ? (
            <section className="mt-7">
              <ProductGrid items={sortedItems} />
            </section>
          ) : (
            <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
                  <div className="absolute inset-0 rounded-2xl bg-blue-100/50 blur-xl" />

                  <ShoppingBag
                    size={32}
                    className="relative text-blue-600"
                    strokeWidth={1.8}
                  />
                </div>

                <h2 className="mt-6 text-2xl font-bold capitalize tracking-tight text-slate-950 sm:text-3xl">
                  No {title} products found
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                  There are currently no products available in this category.
                  Browse the full TechVault catalog to discover other products.
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
                    href="/search"
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Search catalog
                  </Link>
                </div>
              </div>

              {/* Category suggestions */}
              <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-5">
                <p className="text-center text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  Explore the catalog
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {Object.entries(categorySlugs)
                    .slice(0, 6)
                    .map(([slug, label]) => (
                      <Link
                        key={slug}
                        href={`/category/${slug}`}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold capitalize text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        {label}
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
