"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  Building2,
  Wifi,
  Router,
  ShieldCheck,
  Server,
  SlidersHorizontal,
  RotateCcw,
  Network,
  Cable,
} from "lucide-react";

import { products } from "@/lib/catalog";
import { useStorefront } from "@/components/storefront-provider";

type NetworkType = "Home" | "Small Business" | "Gaming" | "Office";

type SpaceSize = "Small" | "Medium" | "Large" | "Multi-room";

type InternetSpeed =
  | "Up to 100 Mbps"
  | "100–500 Mbps"
  | "500 Mbps–1 Gbps"
  | "1 Gbps+";

type Priority =
  | "Maximum Wi-Fi coverage"
  | "Maximum speed"
  | "Security"
  | "Best value";

const networkTypes: {
  value: NetworkType;
  title: string;
  description: string;
  icon: typeof Home;
}[] = [
  {
    value: "Home",
    title: "Home",
    description: "Reliable Wi-Fi for everyday home use.",
    icon: Home,
  },
  {
    value: "Small Business",
    title: "Small Business",
    description: "Connect employees, devices and business systems.",
    icon: Building2,
  },
  {
    value: "Gaming",
    title: "Gaming",
    description: "Low-latency networking for gaming and streaming.",
    icon: Network,
  },
  {
    value: "Office",
    title: "Office",
    description: "Build a reliable network for a larger workspace.",
    icon: Server,
  },
];

const spaceSizes: SpaceSize[] = ["Small", "Medium", "Large", "Multi-room"];

const internetSpeeds: InternetSpeed[] = [
  "Up to 100 Mbps",
  "100–500 Mbps",
  "500 Mbps–1 Gbps",
  "1 Gbps+",
];

const priorities: Priority[] = [
  "Maximum Wi-Fi coverage",
  "Maximum speed",
  "Security",
  "Best value",
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

function isNetworkingProduct(product: (typeof products)[number]) {
  const text = getProductText(product);

  return (
    text.includes("router") ||
    text.includes("wifi") ||
    text.includes("wi-fi") ||
    text.includes("network") ||
    text.includes("switch") ||
    text.includes("ethernet") ||
    text.includes("access point") ||
    text.includes("mesh") ||
    text.includes("modem") ||
    text.includes("firewall") ||
    text.includes("networking")
  );
}

function isRouter(product: (typeof products)[number]) {
  const text = getProductText(product);

  return (
    text.includes("router") ||
    text.includes("mesh") ||
    text.includes("access point")
  );
}

function isSwitch(product: (typeof products)[number]) {
  const text = getProductText(product);

  return (
    text.includes("switch") ||
    text.includes("ethernet switch") ||
    text.includes("network switch")
  );
}

function isCable(product: (typeof products)[number]) {
  const text = getProductText(product);

  return (
    text.includes("ethernet") ||
    text.includes("cat5") ||
    text.includes("cat6") ||
    text.includes("cat7") ||
    text.includes("cat8")
  );
}

function isSecurityProduct(product: (typeof products)[number]) {
  const text = getProductText(product);

  return (
    text.includes("firewall") ||
    text.includes("security") ||
    text.includes("secure") ||
    text.includes("vpn")
  );
}

function scoreNetworkProduct(
  product: (typeof products)[number],
  networkType: NetworkType,
  spaceSize: SpaceSize,
  internetSpeed: InternetSpeed,
  priority: Priority,
) {
  const text = getProductText(product);

  let score = 0;

  /*
   * Network type
   */
  if (networkType === "Home") {
    if (
      text.includes("home") ||
      text.includes("mesh") ||
      text.includes("wifi 6") ||
      text.includes("wifi 7")
    ) {
      score += 5;
    }
  }

  if (networkType === "Small Business") {
    if (
      text.includes("business") ||
      text.includes("enterprise") ||
      text.includes("managed") ||
      text.includes("access point") ||
      text.includes("switch")
    ) {
      score += 6;
    }
  }

  if (networkType === "Gaming") {
    if (
      text.includes("gaming") ||
      text.includes("low latency") ||
      text.includes("qos") ||
      text.includes("wifi 6") ||
      text.includes("wifi 7")
    ) {
      score += 7;
    }

    if (
      text.includes("2.5g") ||
      text.includes("5g") ||
      text.includes("10g") ||
      text.includes("10 gb")
    ) {
      score += 3;
    }
  }

  if (networkType === "Office") {
    if (
      text.includes("office") ||
      text.includes("business") ||
      text.includes("enterprise") ||
      text.includes("managed") ||
      text.includes("switch")
    ) {
      score += 6;
    }
  }

  /*
   * Space size
   */
  if (spaceSize === "Small") {
    if (
      text.includes("router") ||
      text.includes("wifi") ||
      text.includes("compact")
    ) {
      score += 3;
    }
  }

  if (spaceSize === "Medium") {
    if (
      text.includes("mesh") ||
      text.includes("wifi 6") ||
      text.includes("wifi 7") ||
      text.includes("dual-band") ||
      text.includes("tri-band")
    ) {
      score += 5;
    }
  }

  if (spaceSize === "Large") {
    if (
      text.includes("mesh") ||
      text.includes("access point") ||
      text.includes("tri-band")
    ) {
      score += 7;
    }
  }

  if (spaceSize === "Multi-room") {
    if (
      text.includes("mesh") ||
      text.includes("access point") ||
      text.includes("whole home")
    ) {
      score += 8;
    }
  }

  /*
   * Internet speed
   */
  if (internetSpeed === "Up to 100 Mbps") {
    if (
      text.includes("100mbps") ||
      text.includes("100 mbps") ||
      text.includes("300mbps") ||
      text.includes("300 mbps")
    ) {
      score += 3;
    }
  }

  if (internetSpeed === "100–500 Mbps") {
    if (
      text.includes("500mbps") ||
      text.includes("500 mbps") ||
      text.includes("gigabit") ||
      text.includes("1gb")
    ) {
      score += 5;
    }
  }

  if (internetSpeed === "500 Mbps–1 Gbps") {
    if (
      text.includes("gigabit") ||
      text.includes("1gb") ||
      text.includes("1000mbps") ||
      text.includes("2.5g")
    ) {
      score += 6;
    }
  }

  if (internetSpeed === "1 Gbps+") {
    if (
      text.includes("2.5g") ||
      text.includes("5g") ||
      text.includes("10g") ||
      text.includes("10 gb") ||
      text.includes("multi-gig")
    ) {
      score += 8;
    }
  }

  /*
   * Priority
   */
  if (priority === "Maximum Wi-Fi coverage") {
    if (
      text.includes("mesh") ||
      text.includes("access point") ||
      text.includes("whole home") ||
      text.includes("tri-band")
    ) {
      score += 8;
    }
  }

  if (priority === "Maximum speed") {
    if (
      text.includes("wifi 7") ||
      text.includes("wifi 6e") ||
      text.includes("10g") ||
      text.includes("5g") ||
      text.includes("2.5g") ||
      text.includes("multi-gig")
    ) {
      score += 8;
    }
  }

  if (priority === "Security") {
    if (
      text.includes("firewall") ||
      text.includes("vpn") ||
      text.includes("security") ||
      text.includes("secure")
    ) {
      score += 8;
    }
  }

  if (priority === "Best value") {
    if (
      text.includes("value") ||
      text.includes("budget") ||
      text.includes("gigabit") ||
      text.includes("wifi 6")
    ) {
      score += 4;
    }
  }

  return score;
}

export default function NetworkBuilderPage() {
  const { addToCart } = useStorefront();

  const [networkType, setNetworkType] = useState<NetworkType | null>(null);

  const [spaceSize, setSpaceSize] = useState<SpaceSize | null>(null);

  const [internetSpeed, setInternetSpeed] = useState<InternetSpeed | null>(
    null,
  );

  const [priority, setPriority] = useState<Priority | null>(null);

  const [showResults, setShowResults] = useState(false);

  const networkingProducts = useMemo(() => {
    return products.filter(isNetworkingProduct);
  }, []);

  const recommendations = useMemo(() => {
    if (!networkType || !spaceSize || !internetSpeed || !priority) {
      return [];
    }

    return networkingProducts
      .map((product) => ({
        product,
        score: scoreNetworkProduct(
          product,
          networkType,
          spaceSize,
          internetSpeed,
          priority,
        ),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [networkingProducts, networkType, spaceSize, internetSpeed, priority]);

  const routerRecommendations = recommendations
    .filter(({ product }) => isRouter(product))
    .slice(0, 2);

  const switchRecommendations = recommendations
    .filter(({ product }) => isSwitch(product))
    .slice(0, 2);

  const cableRecommendations = recommendations
    .filter(({ product }) => isCable(product))
    .slice(0, 2);

  const securityRecommendations = recommendations
    .filter(({ product }) => isSecurityProduct(product))
    .slice(0, 2);

  const canBuild = Boolean(
    networkType && spaceSize && internetSpeed && priority,
  );

  const resetBuilder = () => {
    setNetworkType(null);
    setSpaceSize(null);
    setInternetSpeed(null);
    setPriority(null);
    setShowResults(false);
  };

  const addAllToCart = () => {
    const uniqueProducts = [
      ...routerRecommendations,
      ...switchRecommendations,
      ...cableRecommendations,
      ...securityRecommendations,
    ];

    const seen = new Set<string>();

    uniqueProducts.forEach(({ product }) => {
      if (!seen.has(product.id)) {
        seen.add(product.id);
        addToCart(product);
      }
    });
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
      <section className="bg-gradient-to-br from-teal-800 via-teal-700 to-blue-700">
        <div className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
              <Network className="h-6 w-6" />
            </div>

            <p className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-100">
              NETWORK BUILDER
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Build a better connected setup
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-teal-50 sm:text-base">
              Tell us what kind of network you're building, how much space you
              need to cover, your internet speed, and your top priority. We'll
              recommend networking equipment from our catalog.
            </p>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {!showResults ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              {/* Step 1 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <StepHeader
                  number="1"
                  title="What are you building?"
                  description="Choose the type of network you need."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {networkTypes.map((item) => {
                    const Icon = item.icon;
                    const active = networkType === item.value;

                    return (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => setNetworkType(item.value)}
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
                  title="How much space do you need to cover?"
                  description="This helps determine the type of Wi-Fi coverage you'll need."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {spaceSizes.map((item) => {
                    const active = spaceSize === item;

                    return (
                      <ChoiceButton
                        key={item}
                        active={active}
                        onClick={() => setSpaceSize(item)}
                      >
                        {item}
                      </ChoiceButton>
                    );
                  })}
                </div>
              </section>

              {/* Step 3 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <StepHeader
                  number="3"
                  title="What's your internet speed?"
                  description="Choose the speed of your internet connection."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {internetSpeeds.map((item) => {
                    const active = internetSpeed === item;

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setInternetSpeed(item)}
                        className={`flex min-h-16 items-center justify-between rounded-xl border px-4 text-left transition-all ${
                          active
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                              active
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <Wifi className="h-4 w-4" />
                          </div>

                          <span className="text-sm font-black">{item}</span>
                        </div>

                        {active && <Check className="h-5 w-5 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Step 4 */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <StepHeader
                  number="4"
                  title="What's most important?"
                  description="Choose the feature you want to prioritize."
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
                            {item === "Maximum Wi-Fi coverage"
                              ? "Prioritize wider and more consistent coverage."
                              : item === "Maximum speed"
                                ? "Prioritize high-speed networking hardware."
                                : item === "Security"
                                  ? "Prioritize network protection features."
                                  : "Balance useful features with cost."}
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
                disabled={!canBuild}
                onClick={() => setShowResults(true)}
                className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              >
                Build My Network
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Preferences sidebar */}
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-xl font-black">Network preferences</h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  We'll use these choices to rank the networking equipment
                  that's most relevant to your setup.
                </p>

                <div className="mt-6 space-y-4">
                  <Preference
                    label="Network"
                    value={networkType ?? "Not selected"}
                  />

                  <Preference
                    label="Coverage"
                    value={spaceSize ?? "Not selected"}
                  />

                  <Preference
                    label="Internet"
                    value={internetSpeed ?? "Not selected"}
                  />

                  <Preference
                    label="Priority"
                    value={priority ?? "Not selected"}
                  />
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50 p-5">
                <div className="flex items-center gap-2 text-teal-900">
                  <ShieldCheck className="h-5 w-5" />
                  <p className="text-sm font-black">Build with confidence</p>
                </div>

                <p className="mt-2 text-xs leading-5 text-teal-800">
                  Your final network should be checked against your ISP,
                  building layout, device count, and required networking
                  standards before installation.
                </p>
              </div>
            </aside>
          </div>
        ) : (
          /* Results */
          <div>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-teal-600">
                  YOUR NETWORK PLAN
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                  Recommended equipment
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Built for a <strong>{networkType}</strong> network covering a{" "}
                  <strong>{spaceSize}</strong> space with{" "}
                  <strong>{internetSpeed}</strong> internet, prioritizing{" "}
                  <strong>{priority}</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={resetBuilder}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <RotateCcw className="h-4 w-4" />
                Start over
              </button>
            </div>

            {recommendations.length > 0 ? (
              <>
                {/* Network overview */}
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <SummaryCard
                    icon={Router}
                    title="Router / Wi-Fi"
                    value={`${routerRecommendations.length} match${
                      routerRecommendations.length === 1 ? "" : "es"
                    }`}
                  />

                  <SummaryCard
                    icon={Network}
                    title="Switches"
                    value={`${switchRecommendations.length} match${
                      switchRecommendations.length === 1 ? "" : "es"
                    }`}
                  />

                  <SummaryCard
                    icon={Cable}
                    title="Cabling"
                    value={`${cableRecommendations.length} match${
                      cableRecommendations.length === 1 ? "" : "es"
                    }`}
                  />

                  <SummaryCard
                    icon={ShieldCheck}
                    title="Security"
                    value={`${securityRecommendations.length} match${
                      securityRecommendations.length === 1 ? "" : "es"
                    }`}
                  />
                </div>

                {/* Add complete setup */}
                <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-base font-black text-blue-950">
                      Build your complete setup
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-blue-800">
                      Add the recommended networking equipment to your cart and
                      review everything before checkout.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addAllToCart}
                    className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-extrabold text-white transition-colors hover:bg-blue-700"
                  >
                    Add setup to cart
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Products */}
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {recommendations.map(({ product, score }) => (
                    <div
                      key={product.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex h-48 items-center justify-center bg-slate-50 p-6">
                        {(product as any).image ? (
                          <img
                            src={(product as any).image}
                            alt={product.name}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <Router className="h-16 w-16 text-slate-200" />
                        )}
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-600">
                            Recommended
                          </span>

                          <span className="text-[10px] font-bold text-slate-400">
                            Score {score}
                          </span>
                        </div>

                        <h3 className="mt-4 line-clamp-2 text-sm font-black leading-6">
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
              </>
            ) : (
              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-10 text-center">
                <Network className="mx-auto h-12 w-12 text-slate-200" />

                <h3 className="mt-4 text-lg font-black">
                  No strong network matches found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Your current catalog does not contain enough networking
                  products that match these preferences. Try changing your
                  requirements and searching again.
                </p>

                <button
                  type="button"
                  onClick={resetBuilder}
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

function SummaryCard({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Router;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon className="h-5 w-5" />
        </div>

        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <p className="mt-1 text-sm font-black text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
