"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import {
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  X,
  UserRound,
  Trash2,
  Package,
  ShieldCheck,
  MapPin,
  ChevronRight,
  LogOut,
} from "lucide-react";

import { products, type Product } from "@/lib/catalog";
import { useStorefront } from "./storefront-provider";

/* =========================================================
   HEADER
========================================================= */

export function Header() {
  const router = useRouter();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);

  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
  });

  const handleSaveAddress = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !addressForm.fullName.trim() ||
      !addressForm.phone.trim() ||
      !addressForm.addressLine1.trim() ||
      !addressForm.city.trim() ||
      !addressForm.region.trim() ||
      !addressForm.postalCode.trim() ||
      !addressForm.country.trim()
    ) {
      return;
    }

    addAddress({
      fullName: addressForm.fullName.trim(),
      phone: addressForm.phone.trim(),
      addressLine1: addressForm.addressLine1.trim(),
      addressLine2: addressForm.addressLine2.trim() || undefined,
      city: addressForm.city.trim(),
      region: addressForm.region.trim(),
      postalCode: addressForm.postalCode.trim(),
      country: addressForm.country.trim(),
    });

    setAddressForm({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      region: "",
      postalCode: "",
      country: "",
    });

    setIsAddAddressModalOpen(false);
    setIsAddressModalOpen(true);
  };

  const {
    user,
    addresses,
    selectedAddress,
    selectAddress,
    addAddress,
    cartCount,
    drawerOpen,
    setDrawerOpen,
  } = useStorefront();
  const [query, setQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div className="w-full">
      {/* =====================================================
          TOP STRIP
      ===================================================== */}

      <div className="bg-[#071c4d] px-4 py-2 text-xs text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <span className="hidden sm:block">
            Free shipping on orders $49+ · Price match guarantee
          </span>

          <span className="sm:hidden">Free shipping on orders $49+</span>

          <div className="flex items-center gap-4">
            <Link
              href="/deals"
              className="whitespace-nowrap transition hover:text-cyan-300"
            >
              Deals
            </Link>

            <Link
              href="/help"
              className="hidden whitespace-nowrap transition hover:text-cyan-300 sm:block"
            >
              Help Center
            </Link>

            <Link
              href="/sell"
              className="hidden whitespace-nowrap transition hover:text-cyan-300 md:block"
            >
              Sell on TechVault
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[74px] items-center gap-2 sm:gap-3 lg:gap-5">
            {/* LOGO */}

            <Link
              href="/"
              aria-label="TechVault home"
              className="shrink-0 text-2xl font-black tracking-[-0.06em] text-[#071c4d] sm:text-3xl"
            >
              <span>tech</span>
              <span className="text-blue-700">vault</span>
              <span className="ml-0.5 text-cyan-500">+</span>
            </Link>

            {/* LOCATION */}

            <button
              type="button"
              onClick={() => setIsAddressModalOpen(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-left transition hover:bg-slate-50"
            >
              <MapPin size={19} className="shrink-0 text-slate-600" />

              <span className="hidden min-w-0 flex-col sm:flex">
                <span className="text-[11px] font-medium text-slate-500">
                  Deliver to
                </span>

                <span className="max-w-[150px] truncate text-xs font-bold text-slate-800">
                  {selectedAddress
                    ? `${selectedAddress.city}, ${selectedAddress.region}`
                    : "Select address"}
                </span>
              </span>

              {/* Mobile */}
              <span className="max-w-[90px] truncate text-xs font-bold text-slate-800 sm:hidden">
                {selectedAddress ? selectedAddress.city : "Address"}
              </span>
            </button>

            {isAddressModalOpen && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4"
                onClick={() => setIsAddressModalOpen(false)}
              >
                <div
                  className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                      <h2 className="text-lg font-black text-[#071c4d]">
                        Choose delivery address
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Select where you want your order delivered.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddressModalOpen(false)}
                      className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Addresses */}
                  <div className="max-h-[60vh] overflow-y-auto p-5">
                    {addresses.length > 0 ? (
                      <div className="space-y-3">
                        {addresses.map((address) => {
                          const isSelected = selectedAddress?.id === address.id;

                          return (
                            <button
                              key={address.id}
                              type="button"
                              onClick={() => {
                                selectAddress(address.id);
                                setIsAddressModalOpen(false);
                              }}
                              className={`w-full rounded-xl border p-4 text-left transition ${
                                isSelected
                                  ? "border-blue-600 bg-blue-50"
                                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <p className="text-sm font-bold text-slate-900">
                                    {address.fullName}
                                  </p>

                                  <p className="mt-1 text-sm text-slate-600">
                                    {address.addressLine1}
                                  </p>

                                  {address.addressLine2 && (
                                    <p className="text-sm text-slate-600">
                                      {address.addressLine2}
                                    </p>
                                  )}

                                  <p className="text-sm text-slate-600">
                                    {address.city}
                                    {address.region
                                      ? `, ${address.region}`
                                      : ""}
                                  </p>

                                  {address.postalCode && (
                                    <p className="text-sm text-slate-600">
                                      {address.postalCode}
                                    </p>
                                  )}

                                  {address.country && (
                                    <p className="text-sm font-medium text-slate-600">
                                      {address.country}
                                    </p>
                                  )}

                                  {address.phone && (
                                    <p className="mt-1 text-xs text-slate-500">
                                      {address.phone}
                                    </p>
                                  )}
                                </div>

                                {isSelected && (
                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                                    <Check size={14} />
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-300 px-5 py-8 text-center">
                        <MapPin size={30} className="mx-auto text-slate-400" />

                        <p className="mt-3 text-sm font-bold text-slate-800">
                          No delivery addresses yet
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Add an address to make checkout faster.
                        </p>
                      </div>
                    )}

                    {/* Add address */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddressModalOpen(false);
                        setIsAddAddressModalOpen(true);
                      }}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#071c4d] transition hover:bg-slate-50"
                    >
                      <Plus size={18} />
                      Add a new address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isAddAddressModalOpen && (
              <div
                className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4"
                onClick={() => setIsAddAddressModalOpen(false)}
              >
                <div
                  className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                      <h2 className="text-lg font-black text-[#071c4d]">
                        Add delivery address
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Enter your delivery details.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAddAddressModalOpen(false)}
                      className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handleSaveAddress}
                    className="max-h-[75vh] space-y-4 overflow-y-auto p-5"
                  >
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Full name
                      </label>

                      <input
                        type="text"
                        value={addressForm.fullName}
                        onChange={(e) =>
                          setAddressForm((current) => ({
                            ...current,
                            fullName: e.target.value,
                          }))
                        }
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Phone number
                      </label>

                      <input
                        type="tel"
                        value={addressForm.phone}
                        onChange={(e) =>
                          setAddressForm((current) => ({
                            ...current,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+1 555 123 4567"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Address
                      </label>

                      <input
                        type="text"
                        value={addressForm.addressLine1}
                        onChange={(e) =>
                          setAddressForm((current) => ({
                            ...current,
                            addressLine1: e.target.value,
                          }))
                        }
                        placeholder="123 Main Street"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                        Apartment, suite, unit
                        <span className="ml-1 font-normal text-slate-400">
                          (optional)
                        </span>
                      </label>

                      <input
                        type="text"
                        value={addressForm.addressLine2}
                        onChange={(e) =>
                          setAddressForm((current) => ({
                            ...current,
                            addressLine2: e.target.value,
                          }))
                        }
                        placeholder="Apartment 4B"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          City
                        </label>

                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) =>
                            setAddressForm((current) => ({
                              ...current,
                              city: e.target.value,
                            }))
                          }
                          placeholder="New York"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          State / Region
                        </label>

                        <input
                          type="text"
                          value={addressForm.region}
                          onChange={(e) =>
                            setAddressForm((current) => ({
                              ...current,
                              region: e.target.value,
                            }))
                          }
                          placeholder="California"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Postal / ZIP code
                        </label>

                        <input
                          type="text"
                          value={addressForm.postalCode}
                          onChange={(e) =>
                            setAddressForm((current) => ({
                              ...current,
                              postalCode: e.target.value,
                            }))
                          }
                          placeholder="10001"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          required
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                          Country
                        </label>

                        <input
                          type="text"
                          value={addressForm.country}
                          onChange={(e) =>
                            setAddressForm((current) => ({
                              ...current,
                              country: e.target.value,
                            }))
                          }
                          placeholder="United States"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddAddressModalOpen(false);
                          setIsAddressModalOpen(true);
                        }}
                        className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="w-full rounded-xl bg-[#071c4d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0b2b70]"
                      >
                        Save address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* SEARCH */}

            <form
              onSubmit={handleSearch}
              role="search"
              className="ml-auto flex min-w-0 flex-1 overflow-hidden rounded-lg border-2 border-blue-700 bg-white transition focus-within:ring-4 focus-within:ring-blue-100"
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search hardware, laptops, gaming and more"
                aria-label="Search products"
                className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 sm:px-4"
              />

              <button
                type="submit"
                aria-label="Search"
                className="flex h-auto w-11 shrink-0 items-center justify-center bg-blue-700 text-white transition hover:bg-blue-800 sm:w-12"
              >
                <Search size={19} />
              </button>
            </form>

            {/* ACCOUNT */}

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setAccountOpen((value) => !value)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-left transition hover:bg-slate-50"
              >
                <UserRound size={20} className="text-slate-700" />

                <span className="hidden min-w-0 lg:block">
                  <span className="block max-w-[125px] truncate text-[11px] text-slate-500">
                    {user ? `Hi, ${user.firstName}` : "Welcome"}
                  </span>

                  <span className="block max-w-[125px] truncate text-xs font-bold text-slate-800">
                    {user
                      ? `$${user.balance.toFixed(2)} credit`
                      : "Sign in / Register"}
                  </span>
                </span>
              </button>

              {accountOpen && (
                <AccountMenu
                  user={user}
                  onClose={() => setAccountOpen(false)}
                />
              )}
            </div>

            {/* CART */}

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label={`Open cart with ${cartCount} items`}
              className="relative flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-slate-800 transition hover:bg-slate-50"
            >
              <span className="relative">
                <ShoppingCart size={22} />

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </span>

              <span className="hidden text-sm font-bold sm:block">Cart</span>
            </button>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <nav className="hidden items-center gap-6 overflow-x-auto border-t border-slate-100 py-3 text-sm font-semibold text-slate-700 lg:flex">
            <Link
              href="/"
              className="whitespace-nowrap transition hover:text-blue-700"
            >
              All Categories
            </Link>

            <Link
              href="/pc-builder"
              className="whitespace-nowrap transition hover:text-blue-700"
            >
              PC Builder
            </Link>

            <Link
              href="/deals"
              className="whitespace-nowrap text-orange-600 transition hover:text-orange-700"
            >
              Deals
            </Link>

            <Link
              href="/category/laptops"
              className="whitespace-nowrap transition hover:text-blue-700"
            >
              Laptops
            </Link>

            <Link
              href="/category/graphics-cards"
              className="whitespace-nowrap transition hover:text-blue-700"
            >
              Graphics Cards
            </Link>

            <Link
              href="/category/gaming"
              className="whitespace-nowrap transition hover:text-blue-700"
            >
              Gaming
            </Link>

            <Link
              href="/category/monitors"
              className="whitespace-nowrap transition hover:text-blue-700"
            >
              Monitors
            </Link>

            <Link
              href="/category/pc-components"
              className="whitespace-nowrap transition hover:text-blue-700"
            >
              PC Components
            </Link>

            <span className="flex-1" />

            <Link
              href="/account/orders"
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap transition hover:text-blue-700"
            >
              <Package size={14} />
              Track an order
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

/* =========================================================
   ACCOUNT MENU
========================================================= */

function AccountMenu({ user, onClose }: { user: any; onClose: () => void }) {
  const router = useRouter();
  const { logout } = useStorefront();

  if (!user) {
    return (
      <div
        className="absolute right-0 top-full z-[100] mt-2 w-[300px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
        role="menu"
      >
        <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <UserRound size={21} />
          </div>

          <div className="min-w-0">
            <strong className="block text-sm font-bold text-slate-900">
              Welcome to TechVault
            </strong>

            <span className="mt-0.5 block text-xs text-slate-500">
              Sign in to manage your account
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/login");
            }}
            className="flex w-full items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
          >
            Sign in
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              router.push("/register");
            }}
            className="flex w-full items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            Create an account
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
          <Link
            href="/wishlist"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-center text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
          >
            Wishlist
          </Link>

          <Link
            href="/account/orders"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-center text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
          >
            Track an order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute right-0 top-full z-[100] mt-2 w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
      role="menu"
    >
      {/* USER */}

      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-black text-white">
          {user.firstName?.charAt(0)?.toUpperCase()}
        </div>

        <div className="min-w-0">
          <strong className="block truncate text-sm font-bold text-slate-900">
            {user.firstName} {user.lastName}
          </strong>

          <span className="block truncate text-xs text-slate-500">
            {user.email}
          </span>
        </div>
      </div>

      {/* CREDIT */}

      <div className="my-4 rounded-xl bg-gradient-to-r from-[#071c4d] to-blue-700 p-4 text-white">
        <span className="block text-[11px] font-medium text-blue-100">
          TechVault Store Credit
        </span>

        <strong className="mt-1 block text-2xl font-black">
          ${user.balance.toFixed(2)}
        </strong>
      </div>

      {/* LINKS */}

      <div className="space-y-1">
        <AccountMenuLink href="/account" label="My Account" onClick={onClose} />

        <AccountMenuLink
          href="/account/orders"
          label="My Orders"
          onClick={onClose}
        />

        <AccountMenuLink href="/wishlist" label="Wishlist" onClick={onClose} />

        <AccountMenuLink
          href="/account/addresses"
          label="Saved Addresses"
          onClick={onClose}
        />

        <AccountMenuLink
          href="/account/store-credit"
          label="Store Credit"
          onClick={onClose}
        />

        <AccountMenuLink
          href="/account/settings"
          label="Settings"
          onClick={onClose}
        />
      </div>

      {/* LOGOUT */}

      <button
        type="button"
        onClick={() => {
          logout();
          onClose();
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}

function AccountMenuLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
    >
      <span>{label}</span>

      <ChevronRight size={15} className="text-slate-400" />
    </Link>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } =
    useStorefront();

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl sm:p-4">
      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-slate-50">
        {/* WISHLIST */}

        <button
          type="button"
          className={`absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm transition ${
            wishlisted
              ? "border-red-200 text-red-500"
              : "border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-500"
          }`}
          onClick={() => toggleWishlist(product)}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart size={17} fill={wishlisted ? "currentColor" : "none"} />
        </button>

        {/* DISCOUNT */}

        {product.discount > 0 && (
          <span className="absolute left-2 top-2 z-10 rounded-md bg-orange-500 px-2 py-1 text-[10px] font-black tracking-wide text-white shadow-sm">
            SAVE {product.discount}%
          </span>
        )}

        {/* PRODUCT IMAGE */}

        <button
          type="button"
          className="flex h-full w-full cursor-pointer items-center justify-center p-5 sm:p-6"
          onClick={() => setQuickViewProduct(product)}
          aria-label={`Quick view ${product.name}`}
        >
          <img
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </button>
      </div>

      {/* =================================================
          BRAND
      ================================================= */}

      <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
        {product.brand}
      </div>

      {/* =================================================
          RATING
      ================================================= */}

      <div className="mb-2 flex items-center gap-1.5 text-xs">
        <span
          className="tracking-wide text-orange-400"
          aria-label={`${product.rating} out of 5 stars`}
        >
          ★★★★★
        </span>

        <span className="truncate text-slate-500">
          {product.rating} ({product.reviewCount})
        </span>
      </div>

      {/* =================================================
          PRODUCT NAME
      ================================================= */}

      <button
        type="button"
        className="mb-2 min-h-[40px] cursor-pointer text-left text-sm font-semibold leading-5 text-slate-800 transition hover:text-blue-700"
        onClick={() => setQuickViewProduct(product)}
      >
        <span className="line-clamp-2">{product.name}</span>
      </button>

      {/* =================================================
          PRICE
      ================================================= */}

      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <strong className="text-xl font-black tracking-tight text-slate-950 sm:text-[22px]">
          ${product.price.toFixed(2)}
        </strong>

        {product.originalPrice > product.price && (
          <span className="text-xs text-slate-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* =================================================
          STOCK + SHIPPING
      ================================================= */}

      <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
        In Stock
      </div>

      <div className="mt-1 text-xs text-slate-500">Free shipping</div>

      {/* =================================================
          ACTIONS
          
          IMPORTANT:
          These are intentionally stacked instead of using
          grid-cols-2. This prevents the buttons from being
          squeezed/distorted on narrow product cards.
      ================================================= */}

      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          className="flex min-h-10 w-full items-center justify-center whitespace-nowrap rounded-lg bg-blue-700 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-blue-800 active:scale-[0.99]"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={15} className="mr-1.5 shrink-0" />
          Add to cart
        </button>

        <button
          type="button"
          className="flex min-h-10 w-full items-center justify-center whitespace-nowrap rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99]"
          onClick={() => setQuickViewProduct(product)}
        >
          Quick view
        </button>
      </div>
    </article>
  );
}

/* =========================================================
/* =========================================================
   QUICK VIEW MODAL
   FUNCTIONALITY PRESERVED
========================================================= */

export function QuickView() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useStorefront();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (quickViewProduct) {
      setQuantity(1);
      setSelectedImage(quickViewProduct.image);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [quickViewProduct]);

  if (!quickViewProduct) {
    return null;
  }

  const product = quickViewProduct;
  const images = [product.image, ...(product.images ?? [])];

  const handleClose = () => {
    setQuickViewProduct(null);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4 md:p-6"
      role="presentation"
      onMouseDown={handleClose}
    >
      <section
        className="relative flex h-[96vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:h-auto sm:max-h-[94vh] sm:rounded-2xl md:flex-row"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* =================================================
            CLOSE
        ================================================= */}
        <button
          type="button"
          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition hover:bg-slate-100 hover:text-slate-900 sm:right-4 sm:top-4"
          onClick={handleClose}
          aria-label="Close product details"
        >
          <X size={22} />
        </button>

        {/* =================================================
            GALLERY
        ================================================= */}
        <div className="w-full shrink-0 border-b border-slate-200 bg-slate-50 p-3.5 sm:p-5 md:flex md:w-[48%] md:flex-col md:border-b-0 md:border-r md:p-8">
          <div className="flex h-[250px] items-center justify-center rounded-xl bg-white p-4 sm:h-[330px] sm:p-5 md:h-auto md:min-h-[400px] md:flex-1">
            <img
              src={selectedImage ?? product.image}
              alt={product.name}
              className="max-h-[225px] w-full object-contain sm:max-h-[300px] md:max-h-[420px]"
            />
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 sm:mt-4 sm:gap-3">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border-2 bg-white p-1.5 transition sm:h-16 sm:w-16 ${
                    selectedImage === image
                      ? "border-blue-700"
                      : "border-slate-200 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* =================================================
            PRODUCT INFORMATION
        ================================================= */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 pb-6 sm:p-6 sm:pb-7 md:p-8">
          <div className="pr-10 sm:pr-8">
            {/* BRAND / CATEGORY */}
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 sm:text-xs">
              {product.brand} · {product.category}
            </div>

            {/* NAME */}
            <h2
              id="quick-view-title"
              className="mt-2 text-xl font-black leading-tight tracking-tight text-slate-950 sm:text-2xl md:text-3xl"
            >
              {product.name}
            </h2>

            {/* RATING */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs sm:mt-3 sm:text-sm">
              <span className="tracking-wide text-orange-400">★★★★★</span>

              <span className="font-semibold text-slate-700">
                {product.rating}
              </span>

              <span className="text-slate-500">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-5 sm:gap-3">
              <strong className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                ${product.price.toFixed(2)}
              </strong>

              {product.originalPrice > product.price && (
                <del className="text-sm text-slate-400">
                  ${product.originalPrice.toFixed(2)}
                </del>
              )}

              {product.discount > 0 && (
                <span className="rounded-md bg-orange-100 px-2 py-1 text-[10px] font-black text-orange-700 sm:text-xs">
                  SAVE {product.discount}%
                </span>
              )}
            </div>

            {/* STOCK */}
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600 sm:mt-4 sm:text-sm">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
              In Stock · Ready to ship
            </div>

            {/* DESCRIPTION */}
            <p className="mt-4 text-sm leading-6 text-slate-600 sm:mt-5">
              {product.description}
            </p>

            {/* FEATURES */}
            {product.features && product.features.length > 0 && (
              <div className="mt-5 sm:mt-6">
                <h3 className="text-sm font-black text-slate-900">
                  Key features
                </h3>

                <ul className="mt-2.5 space-y-2 sm:mt-3">
                  {product.features.slice(0, 6).map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-sm leading-5 text-slate-600"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* META */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-y border-slate-100 py-3.5 text-[11px] text-slate-500 sm:mt-6 sm:gap-x-5 sm:py-4 sm:text-xs">
              {product.sku && <span>SKU: {product.sku}</span>}
              <span>Free shipping</span>
              <span>Secure checkout</span>
            </div>

            {/* QUANTITY */}
            <div className="mt-5 flex items-center justify-between gap-4 sm:mt-6">
              <span className="text-sm font-bold text-slate-800">Quantity</span>

              <div className="flex items-center overflow-hidden rounded-lg border border-slate-300">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-slate-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <strong className="flex h-10 w-10 items-center justify-center border-x border-slate-200 text-sm">
                  {quantity}
                </strong>

                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-slate-50"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 pb-1 sm:mt-5 sm:grid-cols-2 sm:gap-3">
              <button
                type="button"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800 active:scale-[0.99]"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
                Add to cart
              </button>

              <button
                type="button"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99]"
                onClick={() => toggleWishlist(product)}
              >
                <Heart
                  size={18}
                  fill={isWishlisted(product.id) ? "currentColor" : "none"}
                />
                {isWishlisted(product.id) ? "Saved" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   CART DRAWER
========================================================= */

export function CartDrawer() {
  const {
    cart,
    subtotal,
    shipping,
    tax,
    total,
    drawerOpen,
    setDrawerOpen,
    updateQuantity,
    removeFromCart,
  } = useStorefront();

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  if (!drawerOpen) {
    return null;
  }

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setDrawerOpen(false);
    router.push("/checkout");
  };

  return (
    <div
      className="fixed inset-0 z-[190] bg-slate-950/50 backdrop-blur-[2px]"
      onMouseDown={() => setDrawerOpen(false)}
    >
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="Shopping cart"
      >
        {/* HEADER */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-black text-slate-950">Your cart</h2>

            <small className="text-xs text-slate-500">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </small>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={21} />
          </button>
        </div>

        {/* EMPTY */}

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <ShoppingCart size={38} />
            </div>

            <h3 className="mt-5 text-lg font-black text-slate-900">
              Your cart is empty
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Find something great for your next setup.
            </p>

            <button
              type="button"
              className="mt-6 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              onClick={() => {
                setDrawerOpen(false);
                router.push("/");
              }}
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            {/* PRODUCTS */}

            <div className="min-h-0 flex-1 overflow-y-auto px-5">
              <div className="divide-y divide-slate-100">
                {cart.map((line) => (
                  <div className="flex gap-3 py-4" key={line.product.id}>
                    {/* IMAGE */}

                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2">
                      <img
                        src={line.product.image}
                        alt={line.product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* INFO */}

                    <div className="min-w-0 flex-1">
                      <button
                        type="button"
                        className="line-clamp-2 w-full text-left text-sm font-semibold leading-5 text-slate-800 transition hover:text-blue-700"
                        onClick={() => {
                          setDrawerOpen(false);
                        }}
                      >
                        {line.product.name}
                      </button>

                      <strong className="mt-1 block text-sm font-black text-slate-950">
                        ${line.product.price.toFixed(2)}
                      </strong>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        {/* QUANTITY */}

                        <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-slate-50"
                            onClick={() =>
                              updateQuantity(line.product.id, line.quantity - 1)
                            }
                            aria-label={`Decrease ${line.product.name} quantity`}
                          >
                            <Minus size={13} />
                          </button>

                          <span className="flex h-8 w-8 items-center justify-center border-x border-slate-200 text-xs font-bold">
                            {line.quantity}
                          </span>

                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-slate-50"
                            onClick={() =>
                              updateQuantity(line.product.id, line.quantity + 1)
                            }
                            aria-label={`Increase ${line.product.name} quantity`}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          className="flex items-center gap-1 text-xs font-semibold text-slate-400 transition hover:text-red-600"
                          onClick={() => removeFromCart(line.product.id)}
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}

            <div className="shrink-0 border-t border-slate-200 bg-white px-5 py-5">
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Subtotal</span>

                  <b className="text-slate-800">${subtotal.toFixed(2)}</b>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Shipping</span>

                  <b className="text-slate-800">
                    {shipping ? `$${shipping.toFixed(2)}` : "FREE"}
                  </b>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated tax</span>

                  <b className="text-slate-800">${tax.toFixed(2)}</b>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <strong className="text-base text-slate-950">Total</strong>

                  <strong className="text-xl font-black text-slate-950">
                    ${total.toFixed(2)}
                  </strong>
                </div>
              </div>

              {/* CHECKOUT */}

              <button
                type="button"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800"
                onClick={handleCheckout}
              >
                Proceed to checkout
                <ChevronRight size={17} />
              </button>

              {/* VIEW CART */}

              <button
                type="button"
                className="mt-2 flex w-full items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => {
                  setDrawerOpen(false);
                  router.push("/cart");
                }}
              >
                View cart
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
                <ShieldCheck size={14} />
                Secure checkout
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* =========================================================
   PRODUCT GRID
========================================================= */

export function ProductGrid({ items = products }: { items?: Product[] }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* ONE GLOBAL QUICK VIEW MODAL */}

      <QuickView />
    </>
  );
}
