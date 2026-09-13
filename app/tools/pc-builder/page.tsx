"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Package,
  ShoppingCart,
  Trash2,
  Zap,
} from "lucide-react";

import { products } from "@/lib/catalog";
import { useStorefront } from "@/components/storefront-provider";

type ComponentType =
  | "CPU"
  | "GPU"
  | "Memory"
  | "Storage"
  | "Power Supply"
  | "Monitor";

type SelectedComponents = Partial<Record<ComponentType, string>>;

const componentTypes: {
  type: ComponentType;
  label: string;
  description: string;
  icon: typeof Cpu;
  category: string[];
}[] = [
  {
    type: "CPU",
    label: "Processor",
    description: "Choose the processor that powers your build.",
    icon: Cpu,
    category: ["cpu", "cpus", "processor", "processors"],
  },
  {
    type: "GPU",
    label: "Graphics Card",
    description: "Choose a GPU for gaming, design and demanding workloads.",
    icon: Zap,
    category: ["gpu", "gpus", "graphics-card", "graphics-cards"],
  },
  {
    type: "Memory",
    label: "Memory",
    description: "Add RAM for smooth multitasking and performance.",
    icon: MemoryStick,
    category: ["memory", "ram"],
  },
  {
    type: "Storage",
    label: "Storage",
    description: "Choose fast and reliable storage for your system.",
    icon: HardDrive,
    category: ["storage", "ssd", "ssds"],
  },
  {
    type: "Power Supply",
    label: "Power Supply",
    description: "Select a PSU to safely power your components.",
    icon: Zap,
    category: ["power-supply", "power-supplies", "psu"],
  },
  {
    type: "Monitor",
    label: "Monitor",
    description: "Complete your setup with the right display.",
    icon: Monitor,
    category: ["monitor", "monitors", "display", "displays"],
  },
];

export default function PCBuilderPage() {
  const { addToCart } = useStorefront();

  const [selected, setSelected] = useState<SelectedComponents>({});
  const [openType, setOpenType] = useState<ComponentType | null>("CPU");

  const findProductsForType = (type: ComponentType) => {
    const config = componentTypes.find((item) => item.type === type);

    if (!config) return [];

    return products.filter((product) => {
      const values = [
        String((product as any).category ?? ""),
        String((product as any).type ?? ""),
        String((product as any).name ?? ""),
      ].map((value) => value.toLowerCase());

      return config.category.some((keyword) =>
        values.some((value) => value.includes(keyword.toLowerCase())),
      );
    });
  };

  const getProduct = (id?: string) => {
    if (!id) return undefined;
    return products.find((product) => product.id === id);
  };

  const selectedProducts = useMemo(() => {
    return componentTypes
      .map((item) => ({
        type: item.type,
        product: getProduct(selected[item.type]),
      }))
      .filter(
        (
          item,
        ): item is {
          type: ComponentType;
          product: (typeof products)[number];
        } => Boolean(item.product),
      );
  }, [selected]);

  const buildTotal = selectedProducts.reduce(
    (sum, item) => sum + Number(item.product.price || 0),
    0,
  );

  const chooseProduct = (type: ComponentType, productId: string) => {
    setSelected((current) => ({
      ...current,
      [type]: productId,
    }));

    setOpenType(null);
  };

  const removeProduct = (type: ComponentType) => {
    setSelected((current) => {
      const updated = { ...current };
      delete updated[type];
      return updated;
    });
  };

  const addBuildToCart = () => {
    selectedProducts.forEach(({ product }) => {
      addToCart(product, 1);
    });
  };

  const completion = (selectedProducts.length / componentTypes.length) * 100;

  return (
    <main className="min-h-screen bg-[#f5f8fd] text-slate-950">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shopping
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#071c4d] via-[#103b91] to-[#145fd1]">
        <div className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-300">
              BUILD YOUR PC
            </p>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Build your dream PC
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Choose your components, create a system that fits your needs, and
              add your complete build to your cart when you're ready.
            </p>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_390px]">
          {/* Components */}
          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Choose your components
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select the hardware you want in your build.
                </p>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Build progress
                </p>

                <p className="mt-1 text-lg font-black text-blue-600">
                  {selectedProducts.length}/{componentTypes.length}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {componentTypes.map((item) => {
                const Icon = item.icon;
                const chosenProduct = getProduct(selected[item.type]);
                const isOpen = openType === item.type;
                const availableProducts = findProductsForType(item.type);

                return (
                  <div
                    key={item.type}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenType(isOpen ? null : item.type)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-black">{item.label}</h3>

                            {chosenProduct && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-extrabold text-emerald-600">
                                <Check className="h-3 w-3" />
                                Selected
                              </span>
                            )}
                          </div>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {chosenProduct
                              ? chosenProduct.name
                              : item.description}
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 p-5">
                        {availableProducts.length > 0 ? (
                          <div className="grid gap-3 sm:grid-cols-2">
                            {availableProducts.map((product) => {
                              const isSelected =
                                selected[item.type] === product.id;

                              return (
                                <button
                                  type="button"
                                  key={product.id}
                                  onClick={() =>
                                    chooseProduct(item.type, product.id)
                                  }
                                  className={`group rounded-xl border p-4 text-left transition-all ${
                                    isSelected
                                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                                      : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <h4 className="line-clamp-2 text-sm font-extrabold text-slate-900">
                                        {product.name}
                                      </h4>

                                      <p className="mt-2 text-lg font-black text-blue-600">
                                        $
                                        {Number(product.price).toLocaleString(
                                          "en-US",
                                          {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                          },
                                        )}
                                      </p>
                                    </div>

                                    {isSelected && (
                                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                                        <Check className="h-4 w-4" />
                                      </div>
                                    )}
                                  </div>

                                  <span className="mt-4 inline-flex text-xs font-bold text-slate-400 transition-colors group-hover:text-blue-600">
                                    Select component
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="rounded-xl bg-slate-50 p-6 text-center">
                            <Package className="mx-auto h-8 w-8 text-slate-300" />

                            <p className="mt-3 text-sm font-bold text-slate-700">
                              No products found
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Add products for this component category to your
                              catalog.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Build Summary */}
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-[#071c4d] p-6 text-white">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-200">
                  YOUR BUILD
                </p>

                <h2 className="mt-2 text-2xl font-black">Build summary</h2>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                    style={{ width: `${completion}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-blue-100">
                  {selectedProducts.length} of {componentTypes.length}{" "}
                  components selected
                </p>
              </div>

              <div className="p-5">
                {selectedProducts.length > 0 ? (
                  <div className="space-y-3">
                    {selectedProducts.map(({ type, product }) => (
                      <div
                        key={type}
                        className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 p-3"
                      >
                        <div className="min-w-0">
                          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                            {type}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs font-bold text-slate-800">
                            {product.name}
                          </p>

                          <p className="mt-1 text-sm font-black text-blue-600">
                            $
                            {Number(product.price).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeProduct(type)}
                          aria-label={`Remove ${type}`}
                          className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <ShoppingCart className="mx-auto h-10 w-10 text-slate-200" />

                    <p className="mt-3 text-sm font-bold text-slate-600">
                      Your build is empty
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Select components to start building your PC.
                    </p>
                  </div>
                )}

                <div className="my-5 border-t border-slate-200" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-500">
                    Estimated total
                  </span>

                  <span className="text-2xl font-black text-slate-950">
                    $
                    {buildTotal.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={selectedProducts.length === 0}
                  onClick={addBuildToCart}
                  className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add Build to Cart
                </button>

                <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
                  You can review and adjust your items in the cart before
                  checkout.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
