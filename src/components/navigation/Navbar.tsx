"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  Compass,
  Gift,
  Flame,
  ShieldCheck,
  Briefcase,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { LevaniaLogo } from "@/components/brand/LevaniaLogo";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { role, user, isAuthenticated, signOut } = useAuth();
  const { currentTier } = useLoyalty();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/shop", label: "Boutique" },
    { href: "/collections", label: "Collections" },
    { href: "/discover", label: "Trouver Mon Parfum", highlight: true, icon: Compass },
    { href: "/compose-box", label: "Composer Mon Coffret", icon: Gift },
    { href: "/promotions", label: "Offres du Mois" },
    { href: "/mystery-box", label: "Mystery Box" },
    { href: "/account/luck", label: "Roue Cadeau", badge: currentTier || "Cadeaux", icon: Flame },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-[#FAF7F2]/95 dark:bg-[#0E0709]/95 backdrop-blur-2xl border-b border-[#C7A66A]/25 py-3 shadow-md shadow-[#541B28]/5 dark:shadow-black/50"
            : "bg-gradient-to-b from-[#FAF7F2]/95 dark:from-[#0E0709]/95 via-[#FAF7F2]/70 dark:via-[#0E0709]/70 to-transparent py-4 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#541B28] dark:text-[#DFC68B] hover:text-[#852538] dark:hover:text-[#FAF7F2] rounded-xl focus:outline-none transition-colors"
                aria-label="Menu Principal"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex items-center">
              <LevaniaLogo size="md" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-cinzel text-[11px] tracking-luxury uppercase transition-all duration-300 relative py-2 flex items-center gap-1.5 group",
                      isActive
                        ? "text-[#541B28] dark:text-[#DFC68B] font-bold"
                        : "text-[#4A3B3E] hover:text-[#541B28] dark:text-[#D8CCD0] dark:hover:text-[#DFC68B]",
                      link.highlight && "text-[#541B28] dark:text-[#DFC68B] font-semibold"
                    )}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 text-[#541B28] dark:text-[#DFC68B] group-hover:scale-110 transition-transform" />}
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="font-cinzel text-[9px] px-2 py-0.5 rounded-full bg-[#541B28] dark:bg-[#C7A66A]/20 text-[#FAF7F2] dark:text-[#DFC68B] border border-[#C7A66A]/40 font-bold tracking-wider shadow-xs">
                        {link.badge}
                      </span>
                    )}
                    {isActive ? (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full bg-[#541B28] dark:bg-[#DFC68B] shadow-[0_0_8px_rgba(84,27,40,0.5)] dark:shadow-[0_0_8px_rgba(223,198,139,0.5)] animate-in zoom-in-75 duration-300" />
                    ) : (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] rounded-full bg-[#C7A66A] transition-all duration-300 group-hover:w-4" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Theme Toggle, User Profile & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* Authentication Button or User Menu */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 text-xs text-[#541B28] dark:text-[#DFC68B] hover:border-[#541B28] dark:hover:border-[#DFC68B] transition-colors shadow-sm"
                  >
                    {role === "admin" && <ShieldCheck className="w-3.5 h-3.5 text-[#541B28] dark:text-[#DFC68B]" />}
                    {role === "reseller" && <Briefcase className="w-3.5 h-3.5 text-[#434B36] dark:text-[#DFC68B]" />}
                    {role === "customer" && <User className="w-3.5 h-3.5 text-[#541B28] dark:text-[#DFC68B]" />}

                    <span className="hidden sm:inline font-semibold">
                      {user.name.split(" ")[0]}
                    </span>

                    {role !== "customer" && (
                      <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded bg-[#541B28]/10 dark:bg-[#C7A66A]/20 text-[#541B28] dark:text-[#DFC68B] font-bold uppercase">
                        {role === "admin" ? "DG" : "Master"}
                      </span>
                    )}

                    <ChevronDown className="w-3 h-3 text-[#756B6D] dark:text-[#A8989C]" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-2 border-b border-[#541B28]/10 dark:border-[#C7A66A]/20">
                        <p className="text-xs font-semibold text-[#23181A] dark:text-[#FAF7F2] truncate">{user.name}</p>
                        <p className="text-[10px] text-[#756B6D] dark:text-[#A8989C] truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        {role === "admin" && (
                          <Link
                            href="/admin"
                            className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-[#541B28] dark:text-[#DFC68B] hover:bg-[#FAF7F2] dark:hover:bg-[#251019] font-semibold transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4 text-[#541B28] dark:text-[#DFC68B]" />
                            <span>Administration Centrale</span>
                          </Link>
                        )}

                        {role === "reseller" && (
                          <Link
                            href="/reseller"
                            className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-[#434B36] dark:text-[#DFC68B] hover:bg-[#FAF7F2] dark:hover:bg-[#251019] font-semibold transition-colors"
                          >
                            <Briefcase className="w-4 h-4 text-[#434B36] dark:text-[#DFC68B]" />
                            <span>Portail Revendeur</span>
                          </Link>
                        )}

                        <Link
                          href="/account"
                          className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-[#23181A] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#251019] font-medium transition-colors"
                        >
                          <User className="w-4 h-4 text-[#756B6D] dark:text-[#A8989C]" />
                          <span>Mon Espace Client</span>
                        </Link>

                        <Link
                          href="/account/luck"
                          className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-[#23181A] dark:text-[#FAF7F2] hover:bg-[#FAF7F2] dark:hover:bg-[#251019] font-medium transition-colors"
                        >
                          <Flame className="w-4 h-4 text-[#541B28] dark:text-[#DFC68B]" />
                          <span>La Roue du Destin</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-[#541B28]/10 dark:border-[#C7A66A]/20">
                        <button
                          onClick={() => {
                            signOut();
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Se Déconnecter</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  aria-label="Connexion"
                  className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white dark:bg-[#180B10] border border-[#541B28]/25 dark:border-[#C7A66A]/35 text-xs text-[#541B28] dark:text-[#DFC68B] font-cinzel font-bold tracking-wider hover:bg-[#FAF7F2] dark:hover:bg-[#251019] hover:border-[#541B28] dark:hover:border-[#DFC68B] transition-all shadow-xs active:scale-98"
                >
                  <User className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Connexion</span>
                </Link>
              )}

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={cn(
                  "relative p-2 sm:p-2.5 rounded-full bg-white dark:bg-[#180B10] border transition-all duration-300 shadow-xs active:scale-95 cursor-pointer",
                  totalItemsCount > 0
                    ? "border-[#C7A66A] shadow-md shadow-[#C7A66A]/25 text-[#541B28] dark:text-[#DFC68B]"
                    : "border-[#541B28]/20 dark:border-[#C7A66A]/30 text-[#541B28] dark:text-[#DFC68B] hover:border-[#541B28] dark:hover:border-[#DFC68B]"
                )}
                aria-label="Ouvrir le panier"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#541B28] to-[#7A263B] text-[#FAF7F2] text-[10px] font-bold flex items-center justify-center border border-[#DFC68B]/60 shadow-md animate-in zoom-in">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Gold Wave Accent Line when scrolled */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C7A66A]/80 to-transparent pointer-events-none" />
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#FAF7F2] dark:bg-[#0E0709] border-r border-[#541B28]/20 dark:border-[#C7A66A]/30 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#541B28]/15 dark:border-[#C7A66A]/20">
                <LevaniaLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#756B6D] hover:text-[#541B28] dark:hover:text-[#FAF7F2]"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme switcher pill in mobile drawer */}
              <div className="mt-5 p-3 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 flex items-center justify-between">
                <span className="font-cinzel text-[11px] uppercase tracking-wider text-[#541B28] dark:text-[#DFC68B] font-bold">
                  Thème Visuel
                </span>
                <ThemeToggle variant="pill" />
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-cinzel text-xs tracking-luxury uppercase text-[#23181A] dark:text-[#FAF7F2] hover:text-[#541B28] dark:hover:text-[#DFC68B] py-2.5 flex items-center justify-between border-b border-[#541B28]/10 dark:border-[#C7A66A]/20 font-bold"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="font-cinzel text-[9px] px-2 py-0.5 rounded-full bg-[#541B28] dark:bg-[#C7A66A]/20 text-white dark:text-[#DFC68B] font-bold tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* User Account / Auth Section in Mobile Menu */}
              <div className="mt-8 pt-6 border-t border-[#541B28]/15 dark:border-[#C7A66A]/25 space-y-3">
                {isAuthenticated && user ? (
                  <>
                    <div className="p-3 rounded-2xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 shadow-sm">
                      <p className="text-xs font-semibold text-[#23181A] dark:text-[#FAF7F2]">{user.name}</p>
                      <p className="text-[10px] text-[#756B6D] dark:text-[#A8989C]">{user.email}</p>
                    </div>

                    {role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#180B10] border border-[#541B28]/20 dark:border-[#C7A66A]/30 text-[#541B28] dark:text-[#DFC68B] text-xs font-semibold shadow-sm"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#541B28] dark:text-[#DFC68B]" />
                        <span>Panneau d&apos;Administration</span>
                      </Link>
                    )}

                    {role === "reseller" && (
                      <Link
                        href="/reseller"
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#180B10] border border-[#434B36]/20 dark:border-[#C7A66A]/30 text-[#434B36] dark:text-[#DFC68B] text-xs font-semibold shadow-sm"
                      >
                        <Briefcase className="w-4 h-4 text-[#434B36] dark:text-[#DFC68B]" />
                        <span>Portail Revendeur</span>
                      </Link>
                    )}

                    <Link
                      href="/account"
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#180B10] border border-[#541B28]/15 dark:border-[#C7A66A]/25 text-[#23181A] dark:text-[#FAF7F2] text-xs font-medium shadow-sm"
                    >
                      <User className="w-4 h-4 text-[#756B6D] dark:text-[#A8989C]" />
                      <span>Mon Compte Client</span>
                    </Link>

                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Se Déconnecter</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#541B28] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider shadow-md"
                  >
                    <User className="w-4 h-4 text-[#DFC68B]" />
                    <span>Se Connecter / S&apos;inscrire</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#541B28]/10 flex flex-col items-center gap-2">
              <WaveMonogram size="sm" variant="gold" withSeal={false} />
              <div className="text-[11px] text-[#756B6D] text-center tracking-wider">
                LÉVANIA PARFUMS • Haute Parfumerie Tunisienne
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
