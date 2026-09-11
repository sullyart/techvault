"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Bitcoin,
  Check,
  ChevronLeft,
  CreditCard,
  Lock,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react";

import { Header, CartDrawer } from "@/components/marketplace";
import { useStorefront } from "@/components/storefront-provider";

const paymentMethods = [
  {
    id: "Visa",
    label: "Visa",
    description: "Pay securely with your Visa card",
    icon: CreditCard,
  },
  {
    id: "Mastercard",
    label: "Mastercard",
    description: "Pay securely with your Mastercard",
    icon: CreditCard,
  },
  {
    id: "Bitcoin",
    label: "Bitcoin",
    description: "Pay with Bitcoin",
    icon: Bitcoin,
  },
  {
    id: "USDT",
    label: "USDT",
    description: "Pay with Tether USDT",
    icon: Wallet,
  },
];

export default function CheckoutPage() {
  const { user, cart, subtotal, shipping, tax, total, placeOrder } =
    useStorefront();

  const [payment, setPayment] = useState("Visa");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const CRYPTO_WALLETS = {
    Bitcoin: {
      address: "bc1q6ag6hpywarh6hahwm3gwv77vs7d9s82eag5mjl",
      network: "Bitcoin",
    },
    USDT: {
      address: "0xefcF066663bFc3314c16c0223F32D93D7A4dFf5a",
      network: "TRC20",
    },
  };

  type CryptoPaymentStatus = "awaiting" | "detected" | "confirmed";

  type CryptoPayment = {
    method: "Bitcoin" | "USDT";
    address: string;
    network: string;
    status: CryptoPaymentStatus;
  };

  const [cryptoPayment, setCryptoPayment] = useState<CryptoPayment | null>(
    null,
  );

  function startCryptoPayment(method: "Bitcoin" | "USDT") {
    setError("");

    const wallet = CRYPTO_WALLETS[method];

    setCryptoPayment({
      method,
      address: wallet.address,
      network: wallet.network,
      status: "awaiting",
    });
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!user) {
      setError("Sign in or create an account to continue.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty. Add an item before checking out.");
      return;
    }

    if (
      (payment === "Visa" || payment === "Mastercard") &&
      (!cardNumber || !expiry || !cvv || !cardName)
    ) {
      setError("Please complete all card payment fields.");
      return;
    }

    if (payment === "Bitcoin" || payment === "USDT") {
      startCryptoPayment(payment);
      return;
    }

    setProcessing(true);

    window.setTimeout(() => {
      const order = placeOrder(payment);

      if (!order) {
        setProcessing(false);
        setError("Unable to place your order. Please try again.");
        return;
      }

      window.location.href = `/order-confirmation?order=${order.id}`;
    }, 700);
  }

  const isCardPayment = payment === "Visa" || payment === "Mastercard";
  const hasSufficientBalance =
    user?.balance !== undefined && user.balance >= total;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Breadcrumbs */}
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-blue-700">
              Home
            </Link>

            <span>/</span>

            <Link href="/cart" className="transition hover:text-blue-700">
              Cart
            </Link>

            <span>/</span>

            <span className="font-medium text-slate-600">Checkout</span>
          </div>

          {/* Checkout progress */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                  1
                </div>

                <span className="hidden text-sm font-bold text-slate-900 sm:inline">
                  Information
                </span>
              </div>

              <div className="h-px flex-1 bg-slate-200" />

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                  2
                </div>

                <span className="hidden text-sm font-medium text-slate-400 sm:inline">
                  Shipping
                </span>
              </div>

              <div className="h-px flex-1 bg-slate-200" />

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">
                  3
                </div>

                <span className="hidden text-sm font-medium text-slate-400 sm:inline">
                  Payment
                </span>
              </div>

              <div className="h-px flex-1 bg-slate-200" />

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400">
                  4
                </div>

                <span className="hidden text-sm font-medium text-slate-400 sm:inline">
                  Review
                </span>
              </div>
            </div>
          </div>

          <form
            className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]"
            onSubmit={submit}
          >
            {/* ============================================================
                MAIN CHECKOUT
            ============================================================ */}
            <section className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-slate-100 px-5 py-6 sm:px-8 sm:py-8">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-blue-700">
                  <ShieldCheck size={14} />
                  Secure demo checkout
                </div>

                <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  Complete your order
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Enter your delivery information and choose your preferred
                  payment method.
                </p>
              </div>

              <div className="space-y-0">
                {/* Account notice */}
                {!user && (
                  <div className="mx-5 mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:mx-8">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                      <ShieldCheck size={17} />
                    </div>

                    <div>
                      <strong className="text-sm font-bold text-amber-950">
                        Account required
                      </strong>

                      <p className="mt-1 text-xs leading-5 text-amber-800">
                        Please{" "}
                        <Link
                          href="/login"
                          className="font-bold underline underline-offset-2"
                        >
                          sign in
                        </Link>{" "}
                        or{" "}
                        <Link
                          href="/register"
                          className="font-bold underline underline-offset-2"
                        >
                          create an account
                        </Link>{" "}
                        before placing your order.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="mx-5 mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 sm:mx-8">
                    <p className="text-sm font-medium leading-6 text-red-700">
                      {error}{" "}
                      {!user && (
                        <Link
                          href="/login"
                          className="font-bold underline underline-offset-2"
                        >
                          Sign in
                        </Link>
                      )}
                    </p>
                  </div>
                )}

                {/* Contact information */}
                <div className="border-b border-slate-100 px-5 py-7 sm:px-8">
                  <div className="mb-5">
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-blue-700">
                      Step 1
                    </p>

                    <h2 className="text-lg font-bold text-slate-950">
                      Contact information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Who should we send your order updates to?
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">
                          First name
                        </span>

                        <input
                          required
                          defaultValue={user?.firstName}
                          autoComplete="given-name"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">
                          Last name
                        </span>

                        <input
                          required
                          defaultValue={user?.lastName}
                          autoComplete="family-name"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Email address
                      </span>

                      <input
                        required
                        type="email"
                        defaultValue={user?.email}
                        autoComplete="email"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                    </label>
                  </div>
                </div>

                {/* Shipping */}
                <div className="border-b border-slate-100 px-5 py-7 sm:px-8">
                  <div className="mb-5">
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-blue-700">
                      Step 2
                    </p>

                    <h2 className="text-lg font-bold text-slate-950">
                      Shipping address
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Where should we deliver your order?
                    </p>
                  </div>

                  <div className="space-y-5">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Street address
                      </span>

                      <input
                        required
                        placeholder="123 Main Street"
                        autoComplete="street-address"
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      />
                    </label>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">
                          City
                        </span>

                        <input
                          required
                          autoComplete="address-level2"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-slate-700">
                          Postal code
                        </span>

                        <input
                          required
                          autoComplete="postal-code"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Country
                      </span>

                      <select
                        defaultValue="United States"
                        className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition hover:border-slate-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Nigeria</option>
                        <option>Australia</option>
                      </select>
                    </label>
                  </div>
                </div>

                {/* Payment */}
                <div className="px-5 py-7 sm:px-8">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-blue-700">
                        Step 3
                      </p>

                      <h2 className="text-lg font-bold text-slate-950">
                        Payment method
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Choose how you would like to pay.
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <Lock size={16} />
                    </div>
                  </div>

                  {/* Payment options */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      const selected = payment === method.id;

                      return (
                        <button
                          type="button"
                          key={method.id}
                          onClick={() => {
                            setPayment(method.id);
                            setError("");
                          }}
                          className={`group relative flex min-h-[82px] items-center gap-3 rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-600"
                              : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                          }`}
                        >
                          {/* Selected check */}
                          <span
                            className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border ${
                              selected
                                ? "border-blue-700 bg-blue-700 text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {selected && <Check size={12} strokeWidth={3} />}
                          </span>

                          {/* Icon */}
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                              selected
                                ? "bg-white text-blue-700 shadow-sm"
                                : "bg-slate-100 text-slate-500 group-hover:text-blue-700"
                            }`}
                          >
                            <Icon size={19} />
                          </span>

                          {/* Copy */}
                          <span className="min-w-0 pr-5">
                            <strong
                              className={`block truncate text-sm font-bold ${
                                selected ? "text-blue-950" : "text-slate-800"
                              }`}
                            >
                              {method.label}
                            </strong>

                            <small className="mt-1 block text-xs leading-4 text-slate-400">
                              {method.description}
                            </small>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Card payment */}
                  {isCardPayment && (
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                      <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                          <CreditCard size={19} />
                        </div>

                        <div>
                          <strong className="block text-sm font-bold text-slate-900">
                            {payment} card payment
                          </strong>

                          <span className="text-xs text-slate-400">
                            Demo card interface
                          </span>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-slate-700">
                            Name on card
                          </span>

                          <input
                            value={cardName}
                            onChange={(event) =>
                              setCardName(event.target.value)
                            }
                            placeholder="John Doe"
                            autoComplete="cc-name"
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-semibold text-slate-700">
                            Card number
                          </span>

                          <input
                            value={cardNumber}
                            onChange={(event) =>
                              setCardNumber(event.target.value)
                            }
                            placeholder="4111 1111 1111 1111"
                            inputMode="numeric"
                            autoComplete="cc-number"
                            maxLength={19}
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm tracking-wide text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                          />
                        </label>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">
                              Expiry date
                            </span>

                            <input
                              value={expiry}
                              onChange={(event) =>
                                setExpiry(event.target.value)
                              }
                              placeholder="MM/YY"
                              autoComplete="cc-exp"
                              maxLength={5}
                              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            />
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-slate-700">
                              CVV
                            </span>

                            <input
                              value={cvv}
                              onChange={(event) => setCvv(event.target.value)}
                              placeholder="123"
                              inputMode="numeric"
                              autoComplete="cc-csc"
                              maxLength={4}
                              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            />
                          </label>
                        </div>
                      </div>

                      <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50 px-3.5 py-3">
                        <ShieldCheck
                          size={16}
                          className="mt-0.5 shrink-0 text-blue-700"
                        />

                        <p className="text-xs leading-5 text-blue-900">
                          This is a demo card interface. No real card payment is
                          processed.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* PayPal */}
                  {payment === "PayPal" && (
                    <div className="mt-5 flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                        <Wallet size={23} />
                      </div>

                      <div>
                        <strong className="text-sm font-bold text-slate-900">
                          PayPal checkout
                        </strong>

                        <p className="mt-1.5 text-sm leading-6 text-slate-500">
                          In production, customers will be redirected to PayPal
                          to authorize their payment.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Crypto */}
                  {(payment === "Bitcoin" || payment === "USDT") && (
                    <div className="mt-5 flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-slate-800 shadow-sm">
                        {payment === "Bitcoin" ? (
                          <Bitcoin size={27} />
                        ) : (
                          <span className="text-xl font-black">₮</span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <strong className="text-sm font-bold text-slate-900">
                          {payment} payment
                        </strong>

                        <p className="mt-1.5 text-sm leading-6 text-slate-500">
                          After continuing, your payment address and exact
                          payment amount would be displayed here.
                        </p>

                        <span className="mt-3 inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                          Awaiting payment
                        </span>
                      </div>
                    </div>
                  )}

                  {/* TechVault balance */}
                  {payment === "TechVault Balance" && (
                    <div
                      className={`mt-5 rounded-2xl border p-5 sm:p-6 ${
                        hasSufficientBalance
                          ? "border-emerald-200 bg-emerald-50/70"
                          : "border-red-200 bg-red-50/70"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${
                            hasSufficientBalance
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          <Wallet size={23} />
                        </div>

                        <div className="min-w-0">
                          <strong className="block text-sm font-bold text-slate-900">
                            TechVault Balance
                          </strong>

                          <div className="mt-2 space-y-1 text-sm text-slate-600">
                            <p>
                              Available balance:{" "}
                              <b className="text-slate-950">
                                ${(user?.balance ?? 0).toFixed(2)}
                              </b>
                            </p>

                            <p>
                              Order total:{" "}
                              <b className="text-slate-950">
                                ${total.toFixed(2)}
                              </b>
                            </p>
                          </div>

                          <span
                            className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                              hasSufficientBalance
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {hasSufficientBalance
                              ? "Balance available"
                              : "Insufficient balance"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit area */}
              <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-6 sm:px-8">
                <button
                  type="submit"
                  disabled={processing || !user}
                  className="group flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(29,78,216,0.18)] transition hover:bg-blue-800 hover:shadow-[0_10px_25px_rgba(29,78,216,0.24)] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  {processing
                    ? "Processing order..."
                    : `Place order · $${total.toFixed(2)}`}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={15} />
                  <span>
                    Secure demo checkout · Your information is protected
                  </span>
                </div>
              </div>
            </section>

            {/* ============================================================
                ORDER SUMMARY
            ============================================================ */}
            <aside className="sticky top-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-black tracking-tight text-slate-950">
                  Order summary
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {cart.length} {cart.length === 1 ? "item" : "items"} in your
                  order
                </p>
              </div>

              {/* Items */}
              <div className="max-h-[420px] overflow-y-auto px-5 py-4 sm:px-6">
                <div className="space-y-4">
                  {cart.map((line) => (
                    <div
                      className="flex items-start justify-between gap-4"
                      key={line.product.id}
                    >
                      <div className="min-w-0">
                        <strong className="line-clamp-2 text-sm font-semibold leading-5 text-slate-800">
                          {line.product.name}
                        </strong>

                        <span className="mt-1 block text-xs text-slate-400">
                          Qty: {line.quantity}
                        </span>
                      </div>

                      <b className="shrink-0 text-sm font-bold text-slate-900">
                        ${(line.product.price * line.quantity).toFixed(2)}
                      </b>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <b className="font-semibold text-slate-800">
                      ${subtotal.toFixed(2)}
                    </b>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Shipping</span>
                    <b className="font-semibold text-slate-800">
                      {shipping ? `$${shipping.toFixed(2)}` : "Free"}
                    </b>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Tax</span>
                    <b className="font-semibold text-slate-800">
                      ${tax.toFixed(2)}
                    </b>
                  </div>
                </div>

                <div className="my-5 h-px bg-slate-100" />

                <div className="flex items-end justify-between gap-4">
                  <span className="text-sm font-bold text-slate-900">
                    Total
                  </span>

                  <strong className="text-2xl font-black tracking-tight text-slate-950">
                    ${total.toFixed(2)}
                  </strong>
                </div>

                <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 px-3.5 py-3">
                  <div className="flex items-start gap-2">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <p className="text-xs leading-5 text-emerald-800">
                      Free standard shipping on qualifying orders.
                    </p>
                  </div>
                </div>

                <Link
                  href="/cart"
                  className="mt-4 flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  <ChevronLeft size={16} />
                  Return to cart
                </Link>
              </div>

              {/* Trust footer */}
              <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Lock size={14} />
                  <span>Secure checkout environment</span>
                </div>
              </div>
            </aside>
          </form>
        </div>
      </main>

      <CartDrawer />
      {cryptoPayment && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          onClick={() => setCryptoPayment(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    <Wallet size={13} />
                    Crypto payment
                  </div>

                  <h2 className="text-xl font-black tracking-tight text-slate-950">
                    Pay with {cryptoPayment.method}
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Send your payment to the wallet address below.
                  </p>
                </div>

                {/* CLOSE BUTTON */}
                <button
                  type="button"
                  onClick={() => setCryptoPayment(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Close payment modal"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="space-y-5 p-6">
              {/* Order total */}
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Order total
                </p>

                <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  ${total.toFixed(2)}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Pay using {cryptoPayment.method}
                </p>
              </div>

              {/* Network */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">Network</span>

                <span className="text-sm font-bold text-slate-900">
                  {cryptoPayment.network}
                </span>
              </div>

              {/* Wallet address */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {cryptoPayment.method} wallet address
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(cryptoPayment.address);
                    }}
                    className="text-xs font-bold text-blue-600 transition hover:text-blue-700"
                  >
                    Copy
                  </button>
                </div>

                <div className="break-all rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-800">
                  {cryptoPayment.address}
                </div>
              </div>

              {/* PAYMENT STATUS */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  {/* Awaiting */}
                  {cryptoPayment.status === "awaiting" && (
                    <>
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
                        <span className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Awaiting payment
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          We are waiting for your {cryptoPayment.method}{" "}
                          payment.
                        </p>
                      </div>
                    </>
                  )}

                  {/* Detected */}
                  {cryptoPayment.status === "detected" && (
                    <>
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <span className="h-3 w-3 animate-pulse rounded-full bg-blue-600" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-blue-900">
                          Payment detected
                        </p>

                        <p className="mt-1 text-xs leading-5 text-blue-700">
                          Your payment has been detected and is waiting for
                          blockchain confirmation.
                        </p>
                      </div>
                    </>
                  )}

                  {/* Confirmed */}
                  {cryptoPayment.status === "confirmed" && (
                    <>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                        <Check
                          size={19}
                          strokeWidth={3}
                          className="text-emerald-600"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-emerald-900">
                          Payment confirmed
                        </p>

                        <p className="mt-1 text-xs leading-5 text-emerald-700">
                          Your {cryptoPayment.method} payment has been confirmed
                          successfully.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Warning */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-amber-700"
                  />

                  <div>
                    <p className="text-sm font-bold text-amber-950">
                      Important
                    </p>

                    <p className="mt-1 text-xs leading-5 text-amber-800">
                      Send only {cryptoPayment.method} using the{" "}
                      {cryptoPayment.network} network to this address. Sending
                      another cryptocurrency or using the wrong network may
                      result in permanent loss of funds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() => setCryptoPayment(null)}
                className="h-12 w-full rounded-xl bg-blue-700 px-4 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
