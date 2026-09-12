"use client";

import Link from "next/link";

import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Truck,
  Headphones,
  Cpu,
} from "lucide-react";

import { products } from "@/lib/catalog";

import { CartDrawer, Header, ProductGrid } from "@/components/marketplace";

const categories = [
  [
    "Graphics Cards",
    "/category/graphics-cards",
    "/Products/graphics-cards/5090.png",
  ],
  ["CPUs", "/category/cpus", "/Products/cpus/amd-ryzen-7-9800x3d.png"],
  ["Laptops", "/category/laptops", "/Products/laptops/mac.jpg"],
  ["Monitors", "/category/monitors", "/Products/monitors/asusmonitor.png"],
  ["Storage", "/category/storage", "/Products/storage/crucial.png"],
  ["Keyboards", "/category/keyboards", "/Products/keyboards/keychron.webp"],
  ["Networking", "/category/networking", "/Products/networking/eero.png"],
  ["Smart Home", "/category/smart-home", "/Products/smart-home/nesthub.png"],
] as const;

const shoppingTools = [
  {
    title: "PC Builder",
    description: "Design your dream rig from the ground up.",
    href: "/",
    icon: Cpu,
    className: "from-blue-700 to-blue-600",
  },
  {
    title: "Laptop Finder",
    description: "Find the right laptop for work, school or play.",
    href: "/category/laptops",
    icon: Sparkles,
    className: "from-cyan-700 to-cyan-600",
  },
  {
    title: "Memory Finder",
    description: "Match the right memory upgrade to your setup.",
    href: "/category/memory",
    icon: Zap,
    className: "from-indigo-700 to-indigo-600",
  },
  {
    title: "Network Builder",
    description: "Build a faster, smarter connected setup.",
    href: "/category/networking",
    icon: ShieldCheck,
    className: "from-teal-700 to-teal-600",
  },
];

const brands = [
  {
    name: "AMD",
    image: "/Assets/images/amd.jpeg",
    href: "/search?brand=AMD",
  },
  {
    name: "ASUS",
    image: "/Assets/images/asus2.png",
    href: "/search?brand=ASUS",
  },
  {
    name: "CORSAIR",
    image: "/Assets/images/corsair3.png",
    href: "/search?brand=CORSAIR",
  },
  {
    name: "GIGABYTE",
    image: "/Assets/images/gigabyte2.png",
    href: "/search?brand=GIGABYTE",
  },
  {
    name: "intel",
    image: "/Assets/images/intel2.png",
    href: "/search?brand=intel",
  },
  {
    name: "MSI",
    image: "/Assets/images/msi2.png",
    href: "/search?brand=MSI",
  },
  {
    name: "NVIDIA",
    image: "/Assets/images/nvidia2.png",
    href: "/search?brand=NVIDIA",
  },
];
export default function Page() {
  const dealProducts = products.filter((product) => product.deal).slice(0, 5);

  const trendingProducts = products
    .filter((product) => product.bestSeller)
    .slice(0, 8);

  return (
    <div className="min-h-screen bg-[#f5f8fd] text-slate-900">
      <Header />

      {/* =========================================================
          PROMO STRIP
      ========================================================= */}
      <div className="border-b border-blue-100 bg-blue-50">
        <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-2 px-4 py-2.5 text-center text-xs font-medium text-slate-700 sm:text-sm">
          <Zap size={14} className="shrink-0 text-blue-700" />

          <span>
            <strong className="font-bold text-slate-950">
              Tech Week is here.
            </strong>{" "}
            Save big on PC parts, laptops and gaming gear.
          </span>

          <Link
            href="/deals"
            className="ml-1 inline-flex shrink-0 items-center gap-1 font-bold text-blue-700 transition hover:text-blue-900"
          >
            Explore deals
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <main>
        {/* =========================================================
            HERO
        ========================================================= */}
        {/* =========================================================
    HERO — CRO REFINED
========================================================= */}
        <section className="mx-auto max-w-[1500px] px-4 pt-5 sm:px-6 lg:px-8 lg:pt-7">
          <div className="grid gap-4 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[245px_minmax(0,1fr)]">
            {/* =======================================================
        CATEGORY NAV
    ======================================================= */}
            <aside className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
              <div className="flex items-center gap-2 bg-[#071c4d] px-5 py-4 text-sm font-bold text-white">
                <Sparkles size={16} className="text-cyan-300" />
                Shop by category
              </div>

              <div className="p-2">
                {categories.map(([label, href]) => (
                  <Link
                    href={href}
                    key={label}
                    className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                  >
                    <span>{label}</span>

                    <ChevronRight
                      size={15}
                      className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500"
                    />
                  </Link>
                ))}

                <Link
                  href="/search"
                  className="mt-1 flex items-center justify-between rounded-xl border-t border-slate-100 px-3 py-4 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
                >
                  <span>Browse all products</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </aside>

            {/* =======================================================
        HERO CONTENT
    ======================================================= */}
            <div className="min-w-0">
              {/* =====================================================
          MAIN HERO
      ===================================================== */}
              <div className="group relative min-h-[570px] overflow-hidden rounded-[28px] bg-[#f5f7fa] shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:min-h-[600px] lg:min-h-[620px]">
                {/* Background atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(59,130,246,0.16),transparent_28%),radial-gradient(circle_at_92%_90%,rgba(14,165,233,0.10),transparent_28%)]" />

                {/* Decorative rings */}
                <div className="absolute right-[-12%] top-[-25%] h-[560px] w-[560px] rounded-full border border-blue-200/50" />

                <div className="absolute right-[4%] top-[-8%] h-[390px] w-[390px] rounded-full border border-blue-100/70" />

                <div className="absolute bottom-[-30%] left-[42%] h-[420px] w-[420px] rounded-full bg-blue-100/40 blur-3xl" />

                {/* Fine grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                  }}
                />

                {/* ===================================================
            HERO COPY
        =================================================== */}
                <div className="relative z-20 flex min-h-[570px] flex-col justify-center px-6 py-12 sm:min-h-[600px] sm:px-10 sm:py-14 lg:min-h-[620px] lg:w-[57%] lg:px-14 xl:px-16">
                  {/* Eyebrow */}
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-white/85 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur">
                    <Sparkles size={12} />
                    Tech Week · Limited-time savings
                  </div>

                  {/* Headline */}
                  <h1 className="mt-5 max-w-[610px] text-[42px] font-semibold leading-[0.97] tracking-[-0.055em] text-slate-950 sm:mt-6 sm:text-6xl lg:text-[68px] xl:text-[76px]">
                    Your next upgrade
                    <span className="block text-blue-600">starts here.</span>
                  </h1>

                  {/* Supporting copy */}
                  <p className="mt-5 max-w-[475px] text-[15px] leading-7 text-slate-500 sm:mt-6 sm:text-base">
                    Shop carefully selected laptops, PC components, gaming gear
                    and accessories built for work, play and everything in
                    between.
                  </p>

                  {/* =================================================
              PRIMARY / SECONDARY CTA
          ================================================= */}
                  <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                    {/* Primary CTA */}
                    <Link
                      href="/deals"
                      className="group/cta inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_14px_30px_rgba(37,99,235,0.25)]"
                    >
                      Shop Tech Week deals
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover/cta:translate-x-1"
                      />
                    </Link>

                    {/* Discovery CTA */}
                    <Link
                      href="/search"
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-6 text-sm font-semibold text-slate-800 backdrop-blur transition duration-300 hover:border-blue-200 hover:bg-white hover:text-blue-700"
                    >
                      Help me choose
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  {/* =================================================
              MICRO-CONVERSION
          ================================================= */}
                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                      <Sparkles size={11} />
                    </span>

                    <span>New here? Start with our curated deals.</span>
                  </div>

                  {/* =================================================
              TRUST POINTS
          ================================================= */}
                  <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-200/80 pt-5 sm:mt-10 sm:gap-x-6 sm:pt-6">
                    <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
                        <Truck size={13} className="text-blue-600" />
                      </span>
                      Fast shipping
                    </span>

                    <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
                        <ShieldCheck size={13} className="text-blue-600" />
                      </span>
                      Secure checkout
                    </span>

                    <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
                        <Headphones size={13} className="text-blue-600" />
                      </span>
                      Expert support
                    </span>
                  </div>
                </div>

                {/* ===================================================
            DESKTOP PRODUCT STAGE
        =================================================== */}
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[53%] lg:block">
                  {/* Product-stage glow */}
                  <div className="absolute right-[10%] top-[17%] h-[390px] w-[390px] rounded-full bg-blue-500/10 blur-3xl" />

                  {/* Laptop shadow */}
                  <div className="absolute bottom-[11%] right-[2%] h-10 w-[500px] rounded-[50%] bg-slate-900/15 blur-2xl" />

                  {/* =================================================
              LAPTOP
          ================================================= */}
                  <div className="absolute bottom-[13%] right-[-2%] w-[560px] rotate-[-4deg] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
                    <div className="relative">
                      <img
                        src="/Assets/images/macbook2.png"
                        alt="Premium MacBook Pro laptop"
                        className="relative z-10 w-full object-contain drop-shadow-[0_35px_35px_rgba(15,23,42,0.25)]"
                      />

                      <div className="absolute bottom-[8%] left-[15%] right-[10%] h-12 rounded-full bg-blue-500/20 blur-2xl" />
                    </div>
                  </div>

                  {/* =================================================
              IPHONE
          ================================================= */}
                  <div className="absolute bottom-[8%] right-[7%] z-20 w-[145px] rotate-[10deg] transition-transform duration-700 group-hover:-translate-y-3 group-hover:rotate-[7deg] xl:w-[165px]">
                    <div className="relative">
                      <div className="absolute inset-3 rounded-[32px] bg-blue-500/20 blur-2xl" />

                      <img
                        src="/Assets/images/iphone17.png"
                        alt="iPhone 17 Pro"
                        className="relative z-10 w-full object-contain drop-shadow-[0_30px_30px_rgba(15,23,42,0.30)]"
                      />
                    </div>
                  </div>

                  {/* =================================================
              FEATURED PRODUCT LABEL
          ================================================= */}
                  <div className="absolute right-[12%] top-[13%] z-30 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-[0_15px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Featured
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-950">
                      MacBook Pro
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Pro performance.
                    </p>
                  </div>

                  {/* Accent */}
                  <div className="absolute right-[31%] top-[25%] h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_22px_rgba(59,130,246,0.8)]" />
                </div>

                {/* ===================================================
            MOBILE PRODUCT STAGE
        =================================================== */}
                <div className="relative z-10 -mt-5 flex h-[220px] items-end justify-center px-5 lg:hidden sm:h-[235px]">
                  <div className="absolute bottom-5 h-7 w-[75%] rounded-full bg-slate-900/10 blur-xl" />

                  <img
                    src="/Assets/images/macbook2.png"
                    alt="Premium MacBook Pro laptop"
                    className="relative z-10 w-[88%] max-w-[470px] -rotate-3 object-contain drop-shadow-[0_25px_25px_rgba(15,23,42,0.22)]"
                  />

                  <img
                    src="/Assets/images/iphone17.png"
                    alt="iPhone 17 Pro"
                    className="absolute bottom-0 right-[8%] z-20 w-[82px] rotate-[9deg] object-contain drop-shadow-[0_20px_20px_rgba(15,23,42,0.28)]"
                  />
                </div>
              </div>

              {/* =====================================================
          PROMO / DISCOVERY CARDS
      ===================================================== */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* PC BUILDER */}
                <Link
                  href="/pc-builder"
                  className="group relative min-h-[140px] overflow-hidden rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] sm:p-6"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50 transition duration-500 group-hover:scale-125" />

                  <div className="relative z-10 flex h-full items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-600">
                        Build smarter
                      </span>

                      <strong className="mt-2 block text-lg font-semibold tracking-tight text-slate-950">
                        Build your PC
                      </strong>

                      <span className="mt-1 block max-w-[190px] text-xs leading-5 text-slate-500">
                        Choose compatible parts for your ideal setup.
                      </span>

                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-700">
                        Start building
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-300 group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                </Link>

                {/* GAMING */}
                <Link
                  href="/category/laptops"
                  className="group relative min-h-[140px] overflow-hidden rounded-[22px] bg-slate-950 p-5 text-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.18)] sm:p-6"
                >
                  <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-600/20 blur-2xl transition duration-500 group-hover:scale-125" />

                  <div className="absolute bottom-0 right-0 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />

                  <div className="relative z-10 flex h-full items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-300">
                        Performance picks
                      </span>

                      <strong className="mt-2 block text-lg font-semibold tracking-tight text-white">
                        Upgrade your gaming setup
                      </strong>

                      <span className="mt-1 block max-w-[190px] text-xs leading-5 text-slate-400">
                        High-performance gear for your next session.
                      </span>

                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-300">
                        Shop gaming gear
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur transition duration-300 group-hover:bg-white group-hover:text-slate-950">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
      {/* =========================================================
   {/* =========================================================
   MOBILE CATEGORY STRIP
========================================================= */}
        <section className="mx-auto w-full max-w-[1500px] px-4 pt-4 lg:hidden sm:px-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
              Shop by category
            </p>

            <Link
              href="/search"
              className="text-[11px] font-bold text-blue-600 transition-colors hover:text-blue-800"
            >
              View all
            </Link>
          </div>

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6">
            {categories.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className="flex h-10 shrink-0 items-center rounded-full border border-slate-200 bg-white px-4 text-xs font-bold whitespace-nowrap text-slate-600 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.97]"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        {/* =========================================================
    {/* =========================================================
   TECH WEEK DEALS
========================================================= */}
        <section className="mx-auto w-full max-w-[1500px] px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-600">
                TECH WEEK · LIMITED TIME
              </p>

              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Deals worth grabbing
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Save on carefully selected laptops, PC components, gaming gear
                and accessories while these prices last.
              </p>
            </div>

            <Link
              href="/deals"
              className="hidden shrink-0 items-center gap-1 text-sm font-bold text-blue-600 transition-colors hover:text-blue-800 sm:flex"
            >
              See all deals
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 sm:mt-7">
            <ProductGrid items={dealProducts} />
          </div>

          <Link
            href="/deals"
            className="mt-5 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] sm:hidden"
          >
            See all Tech Week deals
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </section>

        {/* =========================================================
    {/* =========================================================
   CATEGORY EXPLORER
========================================================= */}
        <section className="mx-auto w-full max-w-[1500px] px-4 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-600">
                EXPLORE THE VAULT
              </p>

              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Find what fits your setup
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Explore components, laptops, displays and accessories by what
                you need to build or upgrade.
              </p>
            </div>

            <Link
              href="/search"
              className="hidden shrink-0 items-center gap-1 text-sm font-bold text-blue-600 transition-colors hover:text-blue-800 sm:flex"
            >
              Browse all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(([label, href, image]) => (
              <Link
                key={label}
                href={href}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl active:scale-[0.99]"
              >
                {/* Category image */}
                <div className="relative aspect-[1.6] overflow-hidden bg-slate-100 sm:aspect-[1.35]">
                  <img
                    src={image}
                    alt={label}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Category content */}
                <div className="p-3.5 sm:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <strong className="min-w-0 truncate text-sm font-black text-slate-900">
                      {label}
                    </strong>

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-blue-50 group-hover:text-blue-600">
                      <ChevronRight
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <span className="mt-1.5 block text-xs font-semibold text-blue-700">
                    Explore {label.toLowerCase()}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/search"
            className="mt-5 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] sm:hidden"
          >
            Browse all categories
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </section>

        {/* =========================================================
 {/* =========================================================
   BEST SELLERS
========================================================= */}
        <section className="mx-auto w-full max-w-[1500px] px-4 pt-12 sm:px-6 sm:pt-14 lg:px-8 lg:pt-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-600">
                CUSTOMER FAVORITES
              </p>

              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Best sellers
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                The tech shoppers are choosing most. Start with proven favorites
                for gaming, work and your next setup upgrade.
              </p>
            </div>

            <Link
              href="/search"
              className="hidden shrink-0 items-center gap-1 text-sm font-bold text-blue-600 transition-colors hover:text-blue-800 sm:flex"
            >
              Shop best sellers
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 sm:mt-6">
            <ProductGrid items={trendingProducts} />
          </div>

          <Link
            href="/search"
            className="mt-5 flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99] sm:hidden"
          >
            Shop best sellers
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </section>

        {/* =========================================================
   SHOPPING TOOLS
========================================================= */}
        <section className="mt-16 border-y border-blue-100 bg-[#eaf2fc] py-14 lg:mt-20 lg:py-16">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-600">
                BUILT FOR BUILDERS
              </p>

              <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Not sure what to buy?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                Use our shopping tools to find compatible parts, build your
                ideal PC, or get help choosing the right tech for your setup.
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {shoppingTools.map((tool) => {
                const Icon = tool.icon;

                return (
                  <Link
                    href={tool.href}
                    key={tool.title}
                    className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${tool.className} p-6 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.99]`}
                  >
                    {/* Decorative shape */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125" />

                    <div className="relative">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/10">
                        <Icon size={19} />
                      </div>

                      <h3 className="mt-5 text-lg font-black tracking-tight">
                        {tool.title}
                      </h3>

                      <p className="mt-2 min-h-[48px] text-xs leading-5 text-white/75">
                        {tool.description}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold">
                        {tool.title.toLowerCase().includes("build")
                          ? "Start building"
                          : tool.title.toLowerCase().includes("compat")
                            ? "Check compatibility"
                            : tool.title.toLowerCase().includes("choose")
                              ? "Find your match"
                              : "Get started"}

                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY TECHVAULT */}
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            <div className="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <TrustItem
                icon={Truck}
                title="Clear delivery expectations"
                text="See delivery information before you place your order."
              />

              <TrustItem
                icon={ShieldCheck}
                title="Protected checkout"
                text="Choose your preferred payment method through a secure checkout experience."
              />

              <TrustItem
                icon={Headphones}
                title="Help when you need it"
                text="Get guidance when choosing components, gaming gear or your next upgrade."
              />
            </div>
          </div>
        </section>

        {/* =========================================================
   BRANDS
========================================================= */}
        <section className="border-t border-slate-100 bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
            {/* HEADER */}
            <div className="text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-blue-600">
                SHOP THE BRANDS YOU KNOW
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Leading brands. Better choices.
              </h2>

              <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Shop trusted technology brands across PC components, gaming,
                laptops and accessories.
              </p>
            </div>

            {/* BRAND CAROUSEL */}
            <div className="relative mt-10 overflow-hidden sm:mt-12">
              {/* LEFT FADE */}
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />

              {/* RIGHT FADE */}
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />

              {/* SLIDING TRACK */}
              <div className="flex w-max animate-[brand-scroll_28s_linear_infinite] items-center gap-5 sm:gap-8 lg:gap-10 hover:[animation-play-state:paused]">
                {/* FIRST SET */}
                {brands.map((brand) => (
                  <Link
                    key={`first-${brand.name}`}
                    href={brand.href}
                    aria-label={`Shop ${brand.name}`}
                    className="group flex h-28 w-28 shrink-0 items-center justify-center px-2 sm:h-32 sm:w-36 lg:h-36 lg:w-40"
                  >
                    <img
                      src={brand.image}
                      alt={`${brand.name} logo`}
                      className={`w-auto object-contain opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 ${
                        brand.name === "ASUS"
                          ? "h-[96px] sm:h-[112px] lg:h-[128px]"
                          : "h-12 sm:h-14 lg:h-16"
                      }`}
                      loading="lazy"
                    />
                  </Link>
                ))}

                {/* DUPLICATE SET FOR SEAMLESS LOOP */}
                {brands.map((brand) => (
                  <Link
                    key={`second-${brand.name}`}
                    href={brand.href}
                    aria-label={`Shop ${brand.name}`}
                    className="group flex h-28 w-28 shrink-0 items-center justify-center px-2 sm:h-32 sm:w-36 lg:h-36 lg:w-40"
                  >
                    <img
                      src={brand.image}
                      alt={`${brand.name} logo`}
                      className={`w-auto object-contain  transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 ${
                        brand.name === "ASUS"
                          ? "h-[96px] sm:h-[112px] lg:h-[128px]"
                          : "h-12 sm:h-14 lg:h-16"
                      }`}
                      loading="lazy"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="bg-[#06194a] text-white">
        <div className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* =========================================================
       FOOTER MAIN
    ========================================================= */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
            {/* BRAND */}
            <div>
              <Link
                href="/"
                className="inline-flex items-baseline text-2xl font-black tracking-[-0.06em]"
              >
                tech
                <span className="text-blue-400">vault</span>
                <span className="ml-0.5 text-cyan-300">+</span>
              </Link>

              <p className="mt-4 max-w-xs text-sm leading-6 text-blue-100/65">
                Better tech starts here. Built for curious minds, serious
                builders and everyone in between.
              </p>

              <Link
                href="/search"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition-all hover:border-white/25 hover:bg-white/10"
              >
                Explore the store
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* CUSTOMER CARE */}
            <FooterColumn
              title="Customer care"
              links={[
                ["Help center", "/help"],
                ["Track an order", "/account/orders"],
                ["Returns & refunds", "/help"],
              ]}
            />

            {/* MY ACCOUNT */}
            <FooterColumn
              title="My account"
              links={[
                ["Sign in / Register", "/login"],
                ["Order history", "/account/orders"],
                ["Wishlist", "/wishlist"],
              ]}
            />

            {/* ABOUT */}
            <FooterColumn
              title="About TechVault"
              links={[
                ["Our story", "/about"],
                ["Careers", "/careers"],
                ["Sell with us", "/sell"],
              ]}
            />

            {/* RESOURCES */}
            <FooterColumn
              title="Resources"
              links={[
                ["PC building guides", "/pc-builder"],
                ["Buying advice", "/search"],
                ["Community", "/community"],
              ]}
            />
          </div>

          {/* =========================================================
       FOOTER TRUST STRIP
    ========================================================= */}
          <div className="mt-12 grid gap-4 border-y border-white/10 py-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-blue-300">
                <ShieldCheck size={17} />
              </div>

              <div>
                <p className="text-xs font-bold text-white">Secure checkout</p>
                <p className="mt-0.5 text-[11px] text-blue-100/45">
                  Protected demo payments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-blue-300">
                <Truck size={17} />
              </div>

              <div>
                <p className="text-xs font-bold text-white">Clear delivery</p>
                <p className="mt-0.5 text-[11px] text-blue-100/45">
                  Delivery information at checkout
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-blue-300">
                <Headphones size={17} />
              </div>

              <div>
                <p className="text-xs font-bold text-white">Expert guidance</p>
                <p className="mt-0.5 text-[11px] text-blue-100/45">
                  Help choosing your next upgrade
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================
       BOTTOM BAR
    ========================================================= */}
          <div className="flex flex-col gap-4 pt-6 text-[11px] text-blue-100/45 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © 2026 TechVault. Demo marketplace catalog for frontend
              prototyping.
            </span>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/help" className="transition-colors hover:text-white">
                Privacy
              </Link>

              <Link href="/help" className="transition-colors hover:text-white">
                Terms
              </Link>

              <Link href="/help" className="transition-colors hover:text-white">
                Returns
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  href,
  linkText,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-600">
          {eyebrow}
        </span>

        <h2 className="mt-1.5 text-2xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl">
          {title}
        </h2>
      </div>

      {href && linkText && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-1.5 text-xs font-bold text-blue-700 transition hover:text-blue-900 sm:flex"
        >
          {linkText}
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   TRUST ITEM
========================================================= */

function TrustItem({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Truck;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 px-2 py-6 sm:px-6 lg:py-8">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <Icon size={19} />
      </div>

      <div>
        <h3 className="text-sm font-black text-slate-900">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
      </div>
    </div>
  );
}

/* =========================================================
   FOOTER COLUMN
========================================================= */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h3 className="text-xs font-black uppercase tracking-wider text-white">
        {title}
      </h3>

      <div className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <Link
            href={href}
            key={label}
            className="block text-xs text-blue-100/60 transition hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
