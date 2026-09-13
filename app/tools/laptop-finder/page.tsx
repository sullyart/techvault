"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Battery,
  Check,
  Gamepad2,
  Laptop,
  Palette,
  GraduationCap,
  BriefcaseBusiness,
  SlidersHorizontal,
  RotateCcw,
  Zap,
} from "lucide-react";

import { products } from "@/lib/catalog";
import { useStorefront } from "@/components/storefront-provider";

type UseCase = "Work" | "School" | "Gaming" | "Creative";

type Budget = "Under $700" | "$700–$1,000" | "$1,000–$1,500" | "$1,500+";

type Priority = "Performance" | "Battery life" | "Portability" | "Display";

const useCases: {
  value: UseCase;
  title: string;
  description: string;
  icon: typeof BriefcaseBusiness;
}[] = [
  {
    value: "Work",
    title: "Work",
    description: "Office apps, browsing and productivity.",
    icon: BriefcaseBusiness,
  },
  {
    value: "School",
    title: "School",
    description: "Study, research, documents and everyday use.",
    icon: GraduationCap,
  },
  {
    value: "Gaming",
    title: "Gaming",
    description: "Gaming, high performance and graphics.",
    icon: Gamepad2,
  },
  {
    value: "Creative",
    title: "Creative work",
    description: "Design, editing, content and demanding apps.",
    icon: Palette,
  },
];

const budgets: Budget[] = [
  "Under $700",
  "$700–$1,000",
  "$1,000–$1,500",
  "$1,500+",
];

const priorities: Priority[] = [
  "Performance",
  "Battery life",
  "Portability",
  "Display",
];

function getProductText(product: (typeof products)[number]) {
  return [
    String((product as any).name ?? ""),
    String((product as any).category ?? ""),
    String((product as any).type ?? ""),
    String((product as any).description ?? ""),
  ]
    .join(" ")
    .toLowerCase();
}

function isLaptop(product: (typeof products)[number]) {
  const text = getProductText(product);

  return (
    text.includes("laptop") ||
    text.includes("notebook") ||
    text.includes("macbook")
  );
}

function matchesBudget(price: number, budget: Budget) {
  if (budget === "Under $700") return price < 700;
  if (budget === "$700–$1,000") return price >= 700 && price <= 1000;
  if (budget === "$1,000–$1,500") return price > 1000 && price <= 1500;
  return price > 1500;
}

function scoreLaptop(
  product: (typeof products)[number],
  useCase: UseCase,
  budget: Budget,
  priority: Priority,
) {
  const text = getProductText(product);
  const price = Number(product.price || 0);

  let score = 0;

  // Budget match
  if (matchesBudget(price, budget)) {
    score += 5;
  } else {
    const budgetRanges = {
      "Under $700": 700,
      "$700–$1,000": 1000,
      "$1,000–$1,500": 1500,
      "$1,500+": 2500,
    };

    const target = budgetRanges[budget];
    const difference = Math.abs(price - target);

    if (difference < 300) score += 2;
  }

  // Use case
  if (useCase === "Gaming") {
    if (
      text.includes("gaming") ||
      text.includes("rtx") ||
      text.includes("geforce") ||
      text.includes("radeon") ||
      text.includes("gpu")
    ) {
      score += 6;
    }

    if (
      text.includes("16gb") ||
      text.includes("32gb") ||
      text.includes("core i7") ||
      text.includes("core i9") ||
      text.includes("ryzen 7") ||
      text.includes("ryzen 9")
    ) {
      score += 3;
    }
  }

  if (useCase === "Creative") {
    if (
      text.includes("creator") ||
      text.includes("studio") ||
      text.includes("oled") ||
      text.includes("4k") ||
      text.includes("rtx")
    ) {
      score += 5;
    }

    if (
      text.includes("16gb") ||
      text.includes("32gb") ||
      text.includes("core i7") ||
      text.includes("core i9") ||
      text.includes("ryzen 7") ||
      text.includes("ryzen 9")
    ) {
      score += 3;
    }
  }

  if (useCase === "Work") {
    if (
      text.includes("business") ||
      text.includes("thinkpad") ||
      text.includes("latitude") ||
      text.includes("elitebook") ||
      text.includes("office")
    ) {
      score += 5;
    }

    if (
      text.includes("battery") ||
      text.includes("ultrabook") ||
      text.includes("thin") ||
      text.includes("lightweight")
    ) {
      score += 2;
    }
  }

  if (useCase === "School") {
    if (
      text.includes("student") ||
      text.includes("education") ||
      text.includes("chromebook") ||
      text.includes("lightweight") ||
      text.includes("portable")
    ) {
      score += 5;
    }

    if (price < 1000) {
      score += 2;
    }
  }

  // Priority
  if (priority === "Performance") {
    if (
      text.includes("i7") ||
      text.includes("i9") ||
      text.includes("ultra 7") ||
      text.includes("ultra 9") ||
      text.includes("ryzen 7") ||
      text.includes("ryzen 9") ||
      text.includes("rtx") ||
      text.includes("32gb")
    ) {
      score += 5;
    }
  }

  if (priority === "Battery life") {
    if (
      text.includes("battery") ||
      text.includes("ultrabook") ||
      text.includes("macbook") ||
      text.includes("efficient")
    ) {
      score += 5;
    }
  }

  if (priority === "Portability") {
    if (
      text.includes("thin") ||
      text.includes("light") ||
      text.includes("portable") ||
      text.includes("ultrabook") ||
      text.includes("13") ||
      text.includes("14")
    ) {
      score += 5;
    }
  }

  if (priority === "Display") {
    if (
      text.includes("oled") ||
      text.includes("4k") ||
      text.includes("retina") ||
      text.includes("120hz") ||
      text.includes("144hz") ||
      text.includes("240hz")
    ) {
      score += 5;
    }
  }

  return score;
}

export default function LaptopFinderPage() {
  const { addToCart } = useStorefront();

  const [useCase, setUseCase] = useState<UseCase | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  const [showResults, setShowResults] = useState(false);

  const laptopProducts = useMemo(() => {
    return products.filter(isLaptop);
  }, []);

  const recommendations = useMemo(() => {
    if (!useCase || !budget || !priority) return [];

    return laptopProducts
      .map((product) => ({
        product,
        score: scoreLaptop(product, useCase, budget, priority),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [laptopProducts, useCase, budget, priority]);

  const canFindMatch = Boolean(useCase && budget && priority);

  const resetFinder = () => {
    setUseCase(null);
    setBudget(null);
    setPriority(null);
    setShowResults(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f8fd] text-slate-950">
      {/* Top navigation */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shopping
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-800 via-cyan-700 to-blue-700">
        <div className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
              <Laptop className="h-6 w-6" />
            </div>

            <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-100">
              LAPTOP FINDER
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find the right laptop for you
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-cyan-50 sm:text-base">
              Tell us how you plan to use your laptop, your budget, and what
              matters most. We'll narrow down the options from our catalog.
            </p>
          </div>
        </div>
      </section>

      {/* Finder */}
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {!showResults ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              {/* Step 1 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                    1
                  </div>

                  <div>
                    <h2 className="text-xl font-black">
                      What will you use it for?
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Choose the primary thing you need your laptop to do.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {useCases.map((item) => {
                    const Icon = item.icon;
                    const active = useCase === item.value;

                    return (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => setUseCase(item.value)}
                        className={`rounded-xl border p-4 text-left transition-all ${
                          active
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                              active
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          {active && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>

                        <h3 className="mt-4 text-sm font-black">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 2 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                    2
                  </div>

                  <div>
                    <h2 className="text-xl font-black">What's your budget?</h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Choose the price range you're comfortable with.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {budgets.map((item) => {
                    const active = budget === item;

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setBudget(item)}
                        className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                          active
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-sm font-black">{item}</span>

                        {active && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 3 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
                    3
                  </div>

                  <div>
                    <h2 className="text-xl font-black">What matters most?</h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Pick the feature you care about most.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {priorities.map((item) => {
                    const active = priority === item;

                    const Icon =
                      item === "Performance"
                        ? ZapIcon
                        : item === "Battery life"
                          ? Battery
                          : item === "Portability"
                            ? Laptop
                            : Palette;

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setPriority(item)}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                          active
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            active
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <span className="text-sm font-black">{item}</span>

                        {active && (
                          <Check className="ml-auto h-5 w-5 text-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              <button
                type="button"
                disabled={!canFindMatch}
                onClick={() => setShowResults(true)}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                Find My Laptop
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Side panel */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-xl font-black">Your preferences</h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Your selections will help us narrow down the best matches.
                </p>

                <div className="mt-6 space-y-4">
                  <Preference label="Use" value={useCase ?? "Not selected"} />

                  <Preference label="Budget" value={budget ?? "Not selected"} />

                  <Preference
                    label="Priority"
                    value={priority ?? "Not selected"}
                  />
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* Results */
          <div>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-600">
                  YOUR MATCHES
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Laptops we'd recommend
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Based on your preferences: <strong>{useCase}</strong>,{" "}
                  <strong>{budget}</strong>, with a focus on{" "}
                  <strong>{priority}</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={resetFinder}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <RotateCcw className="h-4 w-4" />
                Start over
              </button>
            </div>

            {recommendations.length > 0 ? (
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map(({ product, score }) => (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* Product image */}
                    <div className="flex h-56 items-center justify-center bg-slate-50 p-6">
                      {(product as any).image ? (
                        <img
                          src={(product as any).image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Laptop className="h-20 w-20 text-slate-200" />
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-600">
                          Recommended
                        </span>

                        <span className="text-[10px] font-bold text-slate-400">
                          Match score {score}
                        </span>
                      </div>

                      <h3 className="mt-4 line-clamp-2 text-base font-black leading-6">
                        {product.name}
                      </h3>

                      <p className="mt-3 text-xl font-black text-blue-600">
                        $
                        {Number(product.price).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>

                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-extrabold text-white transition-colors hover:bg-blue-700"
                      >
                        Add to cart
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <Laptop className="mx-auto h-12 w-12 text-slate-200" />

                <h3 className="mt-4 text-lg font-black">
                  No laptop matches found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  We couldn't find laptops in your current catalog that match
                  these preferences. Try adjusting your selections.
                </p>

                <button
                  type="button"
                  onClick={resetFinder}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-blue-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  Adjust preferences
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function Preference({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

function ZapIcon(props: React.ComponentProps<typeof Zap>) {
  return <Zap {...props} />;
}
