"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cpu,
  Laptop,
  Monitor,
  RotateCcw,
  Server,
  SlidersHorizontal,
  Zap,
} from "lucide-react";

import { products } from "@/lib/catalog";
import { useStorefront } from "@/components/storefront-provider";

type DeviceType = "Desktop PC" | "Laptop" | "Workstation" | "Server";

type MemoryType = "DDR4" | "DDR5" | "Any";

type Capacity = "8GB" | "16GB" | "32GB" | "64GB+" | "Any";

type Priority = "Maximum performance" | "Best value" | "More capacity";

const deviceTypes: {
  value: DeviceType;
  title: string;
  description: string;
  icon: typeof Cpu;
}[] = [
  {
    value: "Desktop PC",
    title: "Desktop PC",
    description: "Upgrade the memory in your desktop computer.",
    icon: Monitor,
  },
  {
    value: "Laptop",
    title: "Laptop",
    description: "Find memory suitable for compatible laptops.",
    icon: Laptop,
  },
  {
    value: "Workstation",
    title: "Workstation",
    description: "More memory for demanding professional workloads.",
    icon: Cpu,
  },
  {
    value: "Server",
    title: "Server",
    description: "Memory for server and high-capacity systems.",
    icon: Server,
  },
];

const memoryTypes: MemoryType[] = ["DDR4", "DDR5", "Any"];

const capacities: Capacity[] = ["8GB", "16GB", "32GB", "64GB+", "Any"];

const priorities: Priority[] = [
  "Maximum performance",
  "Best value",
  "More capacity",
];

function getProductText(product: (typeof products)[number]) {
  return [
    String((product as any).name ?? ""),
    String((product as any).category ?? ""),
    String((product as any).type ?? ""),
    String((product as any).description ?? ""),
    String((product as any).specifications ?? ""),
    String((product as any).specs ?? ""),
  ]
    .join(" ")
    .toLowerCase();
}

function isMemoryProduct(product: (typeof products)[number]) {
  const text = getProductText(product);

  return (
    text.includes("memory") ||
    text.includes("ram") ||
    text.includes("ddr4") ||
    text.includes("ddr5") ||
    text.includes("udimm") ||
    text.includes("sodimm") ||
    text.includes("so-dimm")
  );
}

function matchesMemoryType(
  product: (typeof products)[number],
  memoryType: MemoryType,
) {
  if (memoryType === "Any") return true;

  const text = getProductText(product);

  return text.includes(memoryType.toLowerCase());
}

function matchesCapacity(
  product: (typeof products)[number],
  capacity: Capacity,
) {
  if (capacity === "Any") return true;

  const text = getProductText(product);

  const gbMatch = text.match(/(\d+)\s*(?:gb|g)/i);

  if (!gbMatch) {
    return true;
  }

  const gb = Number(gbMatch[1]);

  if (capacity === "8GB") {
    return gb === 8;
  }

  if (capacity === "16GB") {
    return gb === 16;
  }

  if (capacity === "32GB") {
    return gb === 32;
  }

  if (capacity === "64GB+") {
    return gb >= 64;
  }

  return true;
}

function scoreMemory(
  product: (typeof products)[number],
  deviceType: DeviceType,
  memoryType: MemoryType,
  capacity: Capacity,
  priority: Priority,
) {
  const text = getProductText(product);

  let score = 0;

  /*
   * Memory type
   */
  if (memoryType !== "Any") {
    if (text.includes(memoryType.toLowerCase())) {
      score += 8;
    } else {
      score -= 5;
    }
  }

  /*
   * Capacity
   */
  if (capacity !== "Any") {
    if (matchesCapacity(product, capacity)) {
      score += 7;
    }
  }

  /*
   * Device type
   */
  if (deviceType === "Laptop") {
    if (
      text.includes("sodimm") ||
      text.includes("so-dimm") ||
      text.includes("laptop") ||
      text.includes("notebook")
    ) {
      score += 6;
    }

    if (text.includes("udimm")) {
      score -= 3;
    }
  }

  if (deviceType === "Desktop PC") {
    if (
      text.includes("udimm") ||
      text.includes("desktop") ||
      text.includes("pc")
    ) {
      score += 5;
    }

    if (text.includes("sodimm") || text.includes("so-dimm")) {
      score -= 3;
    }
  }

  if (deviceType === "Workstation") {
    if (
      text.includes("workstation") ||
      text.includes("ecc") ||
      text.includes("registered") ||
      text.includes("rdimm")
    ) {
      score += 5;
    }
  }

  if (deviceType === "Server") {
    if (
      text.includes("server") ||
      text.includes("ecc") ||
      text.includes("registered") ||
      text.includes("rdimm") ||
      text.includes("lrdimm")
    ) {
      score += 8;
    } else {
      score -= 2;
    }
  }

  /*
   * Priority
   */
  if (priority === "Maximum performance") {
    if (
      text.includes("6000") ||
      text.includes("6400") ||
      text.includes("7200") ||
      text.includes("7600") ||
      text.includes("8000") ||
      text.includes("cl30") ||
      text.includes("cl32")
    ) {
      score += 5;
    }
  }

  if (priority === "Best value") {
    if (
      text.includes("value") ||
      text.includes("3200") ||
      text.includes("3600") ||
      text.includes("4800") ||
      text.includes("5200")
    ) {
      score += 3;
    }
  }

  if (priority === "More capacity") {
    if (
      text.includes("32gb") ||
      text.includes("64gb") ||
      text.includes("128gb") ||
      text.includes("256gb")
    ) {
      score += 6;
    }
  }

  return score;
}

export default function MemoryFinderPage() {
  const { addToCart } = useStorefront();

  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);
  const [memoryType, setMemoryType] = useState<MemoryType | null>(null);
  const [capacity, setCapacity] = useState<Capacity | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  const [showResults, setShowResults] = useState(false);

  const memoryProducts = useMemo(() => {
    return products.filter(isMemoryProduct);
  }, []);

  const recommendations = useMemo(() => {
    if (!deviceType || !memoryType || !capacity || !priority) {
      return [];
    }

    return memoryProducts
      .map((product) => ({
        product,
        score: scoreMemory(product, deviceType, memoryType, capacity, priority),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [memoryProducts, deviceType, memoryType, capacity, priority]);

  const canFindMatch = Boolean(
    deviceType && memoryType && capacity && priority,
  );

  const resetFinder = () => {
    setDeviceType(null);
    setMemoryType(null);
    setCapacity(null);
    setPriority(null);
    setShowResults(false);
  };

  return (
    <main className="min-h-screen bg-[#f5f8fd] text-slate-950">
      {/* Navigation */}
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
      <section className="bg-gradient-to-br from-indigo-800 via-indigo-700 to-blue-700">
        <div className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
              <Zap className="h-6 w-6" />
            </div>

            <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.18em] text-indigo-100">
              MEMORY FINDER
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Find the right memory upgrade
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-50 sm:text-base">
              Tell us what device you're upgrading, the memory generation you
              want, your target capacity, and your priority. We'll show the
              closest matches in our catalog.
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
                <StepHeader
                  number="1"
                  title="What are you upgrading?"
                  description="Choose the type of system receiving the memory upgrade."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {deviceTypes.map((item) => {
                    const Icon = item.icon;
                    const active = deviceType === item.value;

                    return (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => setDeviceType(item.value)}
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
                <StepHeader
                  number="2"
                  title="Which memory generation?"
                  description="Select the RAM generation you want to use."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {memoryTypes.map((item) => {
                    const active = memoryType === item;

                    return (
                      <ChoiceButton
                        key={item}
                        active={active}
                        onClick={() => setMemoryType(item)}
                      >
                        {item}
                      </ChoiceButton>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-xl bg-amber-50 p-4 text-xs leading-5 text-amber-800">
                  <strong>Important:</strong> DDR4 and DDR5 are not
                  interchangeable. Your motherboard or laptop must support the
                  memory generation you select.
                </div>
              </section>

              {/* Step 3 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <StepHeader
                  number="3"
                  title="How much memory do you need?"
                  description="Choose your target total capacity."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {capacities.map((item) => {
                    const active = capacity === item;

                    return (
                      <ChoiceButton
                        key={item}
                        active={active}
                        onClick={() => setCapacity(item)}
                      >
                        {item}
                      </ChoiceButton>
                    );
                  })}
                </div>
              </section>

              {/* Step 4 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <StepHeader
                  number="4"
                  title="What's most important?"
                  description="Choose what you want to prioritize."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {priorities.map((item) => {
                    const active = priority === item;

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setPriority(item)}
                        className={`flex min-h-20 items-center justify-between rounded-xl border p-4 text-left transition-all ${
                          active
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-black">{item}</p>

                          <p className="mt-1 text-xs text-slate-500">
                            {item === "Maximum performance"
                              ? "Prioritize faster memory."
                              : item === "Best value"
                                ? "Balance price and performance."
                                : "Prioritize larger capacities."}
                          </p>
                        </div>

                        {active && (
                          <Check className="ml-3 h-5 w-5 shrink-0 text-blue-600" />
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
                Find Compatible Memory
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Preferences */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-xl font-black">Upgrade preferences</h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Your selections will determine which memory products receive
                  the highest match scores.
                </p>

                <div className="mt-6 space-y-4">
                  <Preference
                    label="Device"
                    value={deviceType ?? "Not selected"}
                  />

                  <Preference
                    label="Memory"
                    value={memoryType ?? "Not selected"}
                  />

                  <Preference
                    label="Capacity"
                    value={capacity ?? "Not selected"}
                  />

                  <Preference
                    label="Priority"
                    value={priority ?? "Not selected"}
                  />
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-black text-blue-900">
                  Need exact compatibility?
                </p>

                <p className="mt-2 text-xs leading-5 text-blue-800">
                  For a truly accurate recommendation, check your motherboard or
                  laptop model before purchasing RAM.
                </p>
              </div>
            </aside>
          </div>
        ) : (
          /* Results */
          <div>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-indigo-600">
                  YOUR MEMORY MATCHES
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Recommended memory
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Showing matches for a <strong>{deviceType}</strong> using{" "}
                  <strong>{memoryType}</strong>, targeting{" "}
                  <strong>{capacity}</strong> with <strong>{priority}</strong>{" "}
                  as the priority.
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
                    <div className="flex h-52 items-center justify-center bg-slate-50 p-6">
                      {(product as any).image ? (
                        <img
                          src={(product as any).image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Zap className="h-16 w-16 text-slate-200" />
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-600">
                          Good match
                        </span>

                        <span className="text-[10px] font-bold text-slate-400">
                          Score {score}
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

                      <div className="mt-4 rounded-xl bg-slate-50 p-3">
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          Why it matched
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          Matches your {memoryType} preference and is ranked
                          according to your {priority.toLowerCase()} priority.
                        </p>
                      </div>

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
                <Zap className="mx-auto h-12 w-12 text-slate-200" />

                <h3 className="mt-4 text-lg font-black">
                  No strong matches found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Your current catalog does not contain enough information to
                  confidently match a memory upgrade with these preferences. Try
                  selecting "Any" for memory generation or capacity.
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

function StepHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">
        {number}
      </div>

      <div>
        <h2 className="text-xl font-black">{title}</h2>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function ChoiceButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-14 items-center justify-between rounded-xl border px-4 text-left transition-all ${
        active
          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
      }`}
    >
      <span className="text-sm font-black">{children}</span>

      {active && <Check className="h-5 w-5 text-blue-600" />}
    </button>
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
