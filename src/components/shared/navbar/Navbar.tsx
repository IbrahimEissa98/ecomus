"use client";
import React, { useMemo, useState, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  User2,
  Heart,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  Globe,
  Phone,
} from "lucide-react";
import { ClassValue } from "clsx";
import Link from "next/link";

/**
 * Ecomus-like responsive e‑commerce navbar
 * - Announcement bar (promo + language/currency)
 * - Sticky header with logo centered, search, account/wishlist/cart icons
 * - Category mega menu (hover on desktop, drawer on mobile)
 * - Subtle animations (Framer Motion)
 * - Currency switcher rewrites prices
 * - TailwindCSS utility classes
 */

// ---------- Context for Currency ----------
const CurrencyContext = createContext();

const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.78 },
  { code: "EGP", symbol: "ج.م", rate: 48 },
];

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
];

function classNames(...xs: ClassValue[]) {
  return xs.filter(Boolean).join(" ");
}

// ---------- Components ----------
const HeaderAnnouncement = ({ promo = "Free shipping on orders over $50" }) => {
  const [lang, setLang] = useState(languages[0].code);
  const { currency, setCurrency } = useContext(CurrencyContext);

  return (
    <div className="w-full bg-black text-white text-xs">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex h-9 items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 opacity-80" />
            <a
              href="tel:+201000000000"
              className="opacity-90 hover:opacity-100"
            >
              +20 100 000 0000
            </a>
            <span className="opacity-50">|</span>
            <span className="opacity-90">{promo}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 opacity-80" />
              <select
                aria-label="Language"
                className="bg-transparent text-white/90 outline-none hover:text-white"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                {languages.map((l) => (
                  <option className="text-black" key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <span className="opacity-80">
                {currencies.find((c) => c.code === currency)?.symbol}
              </span>
              <select
                aria-label="Currency"
                className="bg-transparent text-white/90 outline-none hover:text-white"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((c) => (
                  <option className="text-black" key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ onSearch }: { onSearch: () => void }) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const suggestions = useMemo(
    () => [
      "Hoodie",
      "Sneakers",
      "Dress",
      "Headphones",
      "Backpack",
      "Sunglasses",
    ],
    []
  );

  return (
    <div className="relative w-full max-w-xl">
      <div className="flex items-center rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-zinc-900">
        <Search className="mr-2 h-5 w-5" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(e.target.value.length > 0);
          }}
          placeholder="Search products…"
          className="w-full bg-transparent outline-none placeholder:text-zinc-400"
        />
        {q && (
          <button
            onClick={() => {
              setQ("");
              setOpen(false);
            }}
            aria-label="Clear"
            className="ml-2 rounded-full p-1 hover:bg-zinc-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl"
          >
            {suggestions
              .filter((s) => s.toLowerCase().includes(q.toLowerCase()))
              .slice(0, 6)
              .map((s) => (
                <li key={s}>
                  <button
                    onClick={() => {
                      setOpen(false);
                      onSearch?.(s);
                    }}
                    className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-zinc-50"
                  >
                    <span>{s}</span>
                    <ChevronRight className="h-4 w-4 opacity-60" />
                  </button>
                </li>
              ))}
            {suggestions.filter((s) =>
              s.toLowerCase().includes(q.toLowerCase())
            ).length === 0 && (
              <li className="px-4 py-3 text-sm text-zinc-500">No results</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------- Navbar Components (unchanged except responsive classes) ----------
const MegaMenu = ({ categories }) => (
  <nav className="hidden border-t border-zinc-100 bg-white/70 backdrop-blur lg:block sticky top-0 z-30">
    <div className="mx-auto max-w-7xl px-3 sm:px-6">
      <ul className="flex items-center gap-6">
        {categories.map((cat) => (
          <li key={cat.label} className="group relative py-3">
            <button className="flex items-center gap-1 text-sm font-medium text-zinc-800 hover:text-black">
              {cat.label}
              {cat.columns?.length ? (
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              ) : null}
            </button>
            {cat.columns?.length > 0 && (
              <div className="invisible absolute left-0 top-full z-30 w-[800px] translate-y-2 rounded-3xl border border-zinc-200 bg-white p-6 opacity-0 shadow-2xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid grid-cols-4 gap-6">
                  {cat.columns.map((col) => (
                    <div key={col.heading}>
                      <h4 className="mb-3 text-sm font-semibold text-zinc-900">
                        {col.heading}
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {col.links.map((l) => (
                          <li key={l}>
                            <a
                              href="#"
                              className="text-zinc-600 hover:text-zinc-900"
                            >
                              {l}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const MobileDrawer = ({ open, onClose, categories }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40"
          onClick={onClose}
        />
        <motion.aside
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-white p-4 shadow-2xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-semibold">Browse</span>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-zinc-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-4">
            <SearchBar onSearch={() => onClose?.()} />
          </div>
          <div className="space-y-1">
            {categories.map((cat) => (
              <details key={cat.label} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2 text-sm font-medium hover:bg-zinc-50">
                  <span>{cat.label}</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                {cat.columns?.length > 0 && (
                  <div className="px-3 pb-3 pl-5 text-sm text-zinc-700">
                    {cat.columns.map((col) => (
                      <div key={col.heading} className="py-2">
                        <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                          {col.heading}
                        </div>
                        <ul className="mt-1 space-y-1">
                          {col.links.map((l) => (
                            <li key={l}>
                              <a
                                href="#"
                                className="block py-1 hover:underline"
                              >
                                {l}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </details>
            ))}
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

const CartIcon = ({ count = 2 }) => (
  <button
    className="relative rounded-full p-2 hover:bg-zinc-100"
    aria-label="Cart"
  >
    <ShoppingBag className="h-6 w-6" />
    {count > 0 && (
      <span className="absolute right-1 top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-zinc-900 px-1 text-[11px] font-semibold text-white">
        {count}
      </span>
    )}
  </button>
);

interface iconButtonProps {
  children: React.ReactNode;
  label: string;
}

const IconButton = ({ children, label }: iconButtonProps) => (
  <button
    className="rounded-full p-2 hover:bg-zinc-100"
    aria-label={label}
    title={label}
  >
    {children}
  </button>
);

// ---------- Main Navbar ----------
export default function Navbar({ logo = "Ecomus", categories, promo }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <header className="sticky top-0 z-40">
        <HeaderAnnouncement promo={promo} />

        <div className="w-full border-b border-zinc-100 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-3 sm:px-6">
            <div className="grid h-20 grid-cols-3 items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  className="mr-1 rounded-2xl p-2 hover:bg-zinc-100 lg:hidden"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div className="lg:hidden w-full max-w-[200px]">
                  <SearchBar onSearch={() => {}} />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Link
                  href="/"
                  className="text-2xl font-extrabold tracking-tight"
                >
                  {logo}
                </Link>
              </div>

              <div className="ml-auto flex items-center justify-end gap-1 sm:gap-2">
                <IconButton label="Account">
                  <User2 className="h-6 w-6" />
                </IconButton>
                <IconButton label="Wishlist">
                  <Heart className="h-6 w-6" />
                </IconButton>
                <CartIcon count={2} />
              </div>
            </div>

            <div className="mb-4 hidden items-center justify-center lg:flex">
              <SearchBar onSearch={(s) => console.log("search:", s)} />
            </div>
          </div>
        </div>

        <MegaMenu categories={categories} />
        <MobileDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          categories={categories}
        />
      </header>
    </CurrencyContext.Provider>
  );
}

// ---------- DemoPage ----------
function useCurrencyPrice(basePrice) {
  const { currency } = useContext(CurrencyContext);
  const { rate, symbol } = currencies.find((c) => c.code === currency);
  return `${symbol}${(basePrice * rate).toFixed(2)}`;
}

export function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50">
      <EcommerceNavbar
        promo="Back to school: up to 40% off"
        categories={[{ label: "Men", columns: [] }]}
      />
      <main className="mx-auto max-w-7xl px-3 py-10 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold">Featured Products</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCard key={i} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}

function ProductCard({ index }) {
  const price = useCurrencyPrice(49);
  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-3 aspect-square w-full rounded-2xl bg-zinc-100" />
      <div className="text-sm font-medium">Product {index + 1}</div>
      <div className="text-sm text-zinc-500">{price}</div>
    </div>
  );
}
