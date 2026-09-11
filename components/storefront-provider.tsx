"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import type { Product } from "@/lib/catalog";

export type CartLine = {
  product: Product;
  quantity: number;
};

export type Address = {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
};

export type DemoUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  balance: number;
  wishlist: string[];
  orders: Order[];
  addresses: Address[];
  selectedAddressId: string | null;
  createdAt: string;
};

export type Order = {
  id: string;
  date: string;
  lines: CartLine[];
  total: number;
  payment: string;
  status: string;
};

type StorefrontContext = {
  /* =========================
     CART
  ========================= */

  cart: CartLine[];

  cartCount: number;

  subtotal: number;

  shipping: number;

  tax: number;

  total: number;

  addToCart: (product: Product, quantity?: number) => void;

  updateQuantity: (id: string, quantity: number) => void;

  removeFromCart: (id: string) => void;

  clearCart: () => void;

  /* =========================
     WISHLIST
  ========================= */

  wishlist: string[];

  toggleWishlist: (product: Product) => void;

  isWishlisted: (id: string) => boolean;

  /* =========================
     QUICK VIEW
  ========================= */

  quickViewProduct: Product | null;

  setQuickViewProduct: (product: Product | null) => void;

  /* =========================
     CART DRAWER
  ========================= */

  drawerOpen: boolean;

  setDrawerOpen: (open: boolean) => void;

  /* =========================
     AUTHENTICATION
  ========================= */

  user: DemoUser | null;

  register: (
    data: Omit<
      DemoUser,
      "id" | "balance" | "wishlist" | "orders" | "createdAt"
    >,
  ) => boolean;

  login: (email: string, password: string) => boolean;

  logout: () => void;

  /* =========================
     ACCOUNT / BALANCE
  ========================= */

  addFunds: (amount: number) => void;

  /* =========================
     DELIVERY ADDRESSES
  ========================= */

  addresses: Address[];

  selectedAddress: Address | null;

  addAddress: (address: Omit<Address, "id">) => void;

  updateAddress: (id: string, address: Omit<Address, "id">) => void;

  removeAddress: (id: string) => void;

  selectAddress: (id: string) => void;

  /* =========================
     ORDERS
  ========================= */

  placeOrder: (payment: string) => Order | null;

  /* =========================
     NOTIFICATIONS
  ========================= */

  toast: string | null;

  dismissToast: () => void;
};

const StorefrontContext = createContext<StorefrontContext | null>(null);

/* =========================================================
   LOCAL STORAGE HELPERS
========================================================= */

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

/* =========================================================
   PROVIDER
========================================================= */

export function StorefrontProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /* =========================
     STATE
  ========================= */

  const [cart, setCart] = useState<CartLine[]>([]);

  const [wishlist, setWishlist] = useState<string[]>([]);

  const [user, setUser] = useState<DemoUser | null>(null);

  const addresses = user?.addresses ?? [];

  const selectedAddress =
    addresses.find((address) => address.id === user?.selectedAddressId) ?? null;

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const [hydrated, setHydrated] = useState(false);

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    const savedCart = readStorage<CartLine[]>("tv-cart", []);

    const savedWishlist = readStorage<string[]>("tv-wishlist", []);

    const session = readStorage<DemoUser | null>("tv-session", null);

    const normalizedSession = session
      ? {
          ...session,
          addresses: session.addresses ?? [],
          selectedAddressId: session.selectedAddressId ?? null,
        }
      : null;

    setCart(savedCart);
    setWishlist(savedWishlist);
    setUser(normalizedSession);

    setHydrated(true);
  }, []);

  /* =========================
     PERSIST CART
  ========================= */

  useEffect(() => {
    if (!hydrated) return;

    writeStorage("tv-cart", cart);
  }, [cart, hydrated]);

  /* =========================
     PERSIST WISHLIST
  ========================= */

  useEffect(() => {
    if (!hydrated) return;

    writeStorage("tv-wishlist", wishlist);
  }, [wishlist, hydrated]);

  /* =========================
     PERSIST SESSION
  ========================= */

  useEffect(() => {
    if (!hydrated) return;

    if (user) {
      writeStorage("tv-session", user);
    } else {
      localStorage.removeItem("tv-session");
    }
  }, [user, hydrated]);

  /* =========================================================
     TOAST
  ========================================================= */

  const notify = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast(null);
    }, 2600);
  };

  /* =========================================================
     CART
  ========================================================= */

  const addToCart = (product: Product, quantity = 1) => {
    if (quantity < 1) {
      return;
    }

    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);

      if (existing) {
        return current.map((line) =>
          line.product.id === product.id
            ? {
                ...line,
                quantity: line.quantity + quantity,
              }
            : line,
        );
      }

      return [
        ...current,
        {
          product,
          quantity,
        },
      ];
    });

    notify(`${product.name} added to cart`);

    /*
      Automatically open the cart drawer
      after adding a product.
    */
    setDrawerOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((current) => {
      if (quantity < 1) {
        return current.filter((line) => line.product.id !== id);
      }

      return current.map((line) =>
        line.product.id === id
          ? {
              ...line,
              quantity,
            }
          : line,
      );
    });
  };

  const removeFromCart = (id: string) => {
    setCart((current) => current.filter((line) => line.product.id !== id));

    notify("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
  };

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = (product: Product) => {
    setWishlist((current) => {
      const alreadySaved = current.includes(product.id);

      if (alreadySaved) {
        return current.filter((id) => id !== product.id);
      }

      return [...current, product.id];
    });

    if (wishlist.includes(product.id)) {
      notify("Removed from wishlist");
    } else {
      notify("Saved to wishlist");
    }
  };

  const isWishlisted = (id: string) => {
    return wishlist.includes(id);
  };

  /* =========================================================
     USER DATABASE
  ========================================================= */

  const getUsers = (): DemoUser[] => {
    return readStorage<DemoUser[]>("tv-users", []);
  };

  const saveUsers = (users: DemoUser[]) => {
    writeStorage("tv-users", users);
  };

  /* =========================================================
     REGISTER
  ========================================================= */

  const register = (
    data: Omit<
      DemoUser,
      | "id"
      | "balance"
      | "wishlist"
      | "orders"
      | "addresses"
      | "selectedAddressId"
      | "createdAt"
    >,
  ) => {
    const users = getUsers();

    const emailExists = users.some(
      (existingUser) =>
        existingUser.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (emailExists) {
      notify("An account with this email already exists");

      return false;
    }

    const newUser: DemoUser = {
      ...data,

      id: crypto.randomUUID(),

      /*
      Demo starting balance.
      This is NOT real money.
    */
      balance: 100,

      wishlist: [],

      orders: [],

      addresses: [],

      selectedAddressId: null,

      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    saveUsers(users);

    setUser(newUser);

    notify("Welcome to TechVault");

    return true;
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const login = (email: string, password: string) => {
    const users = getUsers();

    const foundUser = users.find(
      (existingUser) =>
        existingUser.email.toLowerCase() === email.toLowerCase() &&
        existingUser.password === password,
    );

    if (!foundUser) {
      notify("Invalid email or password");

      return false;
    }

    setUser(foundUser);

    notify("Welcome back");

    return true;
  };

  /* =========================================================
     LOGOUT
  ========================================================= */

  const logout = () => {
    setUser(null);

    setQuickViewProduct(null);

    setDrawerOpen(false);

    notify("You have been signed out");
  };

  /* =========================================================
     UPDATE USER IN DATABASE
  ========================================================= */

  const persistUser = (updatedUser: DemoUser) => {
    const users = getUsers();

    const updatedUsers = users.map((existingUser) =>
      existingUser.id === updatedUser.id ? updatedUser : existingUser,
    );

    saveUsers(updatedUsers);

    setUser(updatedUser);
  };

  /* =========================================================
     ADD FUNDS
  ========================================================= */

  const addFunds = (amount: number) => {
    if (!user || amount <= 0) {
      return;
    }

    const updatedUser: DemoUser = {
      ...user,
      balance: user.balance + amount,
    };

    persistUser(updatedUser);

    notify(`$${amount.toFixed(2)} demo store credit added`);
  };

  /* =========================================================
     DELIVERY ADDRESSES
  ========================================================= */

  const addAddress = (address: Omit<Address, "id">) => {
    if (!user) {
      notify("Please sign in to add a delivery address");
      return false;
    }

    const newAddress: Address = {
      ...address,
      id: crypto.randomUUID(),
    };

    const updatedUser: DemoUser = {
      ...user,
      addresses: [...user.addresses, newAddress],
      selectedAddressId: newAddress.id,
    };

    persistUser(updatedUser);
    notify("Delivery address added");

    return true;
  };

  const updateAddress = (id: string, address: Omit<Address, "id">) => {
    if (!user) {
      return;
    }

    const updatedUser: DemoUser = {
      ...user,

      addresses: user.addresses.map((existingAddress) =>
        existingAddress.id === id
          ? {
              ...address,
              id,
            }
          : existingAddress,
      ),
    };

    persistUser(updatedUser);

    notify("Delivery address updated");
  };

  const removeAddress = (id: string) => {
    if (!user) {
      return;
    }

    const remainingAddresses = user.addresses.filter(
      (address) => address.id !== id,
    );

    const updatedUser: DemoUser = {
      ...user,

      addresses: remainingAddresses,

      selectedAddressId:
        user.selectedAddressId === id
          ? (remainingAddresses[0]?.id ?? null)
          : user.selectedAddressId,
    };

    persistUser(updatedUser);

    notify("Delivery address removed");
  };

  const selectAddress = (id: string) => {
    if (!user) {
      notify("Please sign in to select a delivery address");
      return;
    }

    const addressExists = user.addresses.some((address) => address.id === id);

    if (!addressExists) {
      return;
    }

    const updatedUser: DemoUser = {
      ...user,
      selectedAddressId: id,
    };

    persistUser(updatedUser);

    notify("Delivery address selected");
  };

  /* =========================================================
     PLACE ORDER
  ========================================================= */

  const placeOrder = (payment: string): Order | null => {
    if (!user) {
      notify("Please sign in before placing an order");

      return null;
    }

    if (cart.length === 0) {
      notify("Your cart is empty");

      return null;
    }

    /*
      Prevent spending more store credit
      than the user actually has.
    */
    if (payment === "TechVault Balance" && user.balance < total) {
      notify("Insufficient TechVault balance");

      return null;
    }

    const order: Order = {
      id: `TV-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 899999,
      )}`,

      date: new Date().toISOString(),

      lines: [...cart],

      total,

      payment,

      status: "Processing",
    };

    const updatedUser: DemoUser = {
      ...user,

      orders: [order, ...user.orders],

      balance:
        payment === "TechVault Balance" ? user.balance - total : user.balance,
    };

    persistUser(updatedUser);

    clearCart();

    setDrawerOpen(false);

    notify("Order placed successfully");

    return order;
  };

  /* =========================================================
     CALCULATIONS
  ========================================================= */

  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  const subtotal = cart.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );

  /*
    Free shipping on orders
    $49 or more.
  */
  const shipping = subtotal === 0 || subtotal >= 49 ? 0 : 8.99;

  /*
    Current demo tax rate.
    We'll make this configurable later
    if you connect a real backend.
  */
  const tax = subtotal * 0.0825;

  const total = subtotal + shipping + tax;

  /* =========================================================
     CONTEXT VALUE
  ========================================================= */

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      user,
      drawerOpen,
      toast,

      cartCount,
      subtotal,
      shipping,
      tax,
      total,

      quickViewProduct,
      setQuickViewProduct,

      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,

      toggleWishlist,
      isWishlisted,

      setDrawerOpen,

      register,
      login,
      logout,

      addFunds,

      addresses,
      selectedAddress,
      addAddress,
      updateAddress,
      removeAddress,
      selectAddress,

      placeOrder,

      dismissToast: () => setToast(null),
    }),
    [
      cart,
      wishlist,
      user,
      drawerOpen,
      toast,

      cartCount,
      subtotal,
      shipping,
      tax,
      total,

      quickViewProduct,

      addresses,
      selectedAddress,
    ],
  );

  /* =========================================================
     PROVIDER
  ========================================================= */

  return (
    <StorefrontContext.Provider value={value}>
      {children}

      {toast && (
        <button className="toast" onClick={() => setToast(null)}>
          {toast}
        </button>
      )}
    </StorefrontContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useStorefront() {
  const context = useContext(StorefrontContext);

  if (!context) {
    throw new Error("useStorefront must be used within StorefrontProvider");
  }

  return context;
}
