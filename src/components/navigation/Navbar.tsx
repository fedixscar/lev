"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  Compass,
  Gift,
  Flame,
  ShieldCheck,
  UserCheck,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { LevaniaLogo } from "@/components/brand/LevaniaLogo";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLoyalty } from "@/context/LoyaltyContext";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Navbar() {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { role, user, loginAs } = useAuth();
  const { luckBalance, currentTier } = useLoyalty();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/shop", label: "Boutique" },
    { href: "/collections", label: "Collections" },
    { href: "/discover", label: "Trouver Mon Parfum", highlight: true, icon: Compass },
    { href: "/compose-box", label: "Composer Mon Coffret", icon: Gift },
    { href: "/promotions", label: "Offres du Mois" },
    { href: "/mystery-box", label: "Mystery Box" },
    { href: "/account/luck", label: "Roue du Destin", badge: currentTier || "Roue", icon: Flame },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "bg-[#171715]/90 backdrop-blur-xl border-b border-[#C7A66A]/15 py-3 shadow-xl shadow-black/50"
            : "bg-gradient-to-b from-[#171715]/80 via-[#171715]/40 to-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#E9DFCE] hover:text-[#C7A66A] rounded-lg focus:outline-none"
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
                      "text-xs tracking-[0.14em] uppercase transition-colors relative py-1 flex items-center gap-1.5",
                      isActive
                        ? "text-[#C7A66A] font-medium"
                        : "text-[#E9DFCE]/80 hover:text-[#C7A66A]",
                      link.highlight && "text-[#C7A66A]"
                    )}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 text-[#C7A66A]" />}
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#542B32] text-rose-200 border border-[#C7A66A]/30">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C7A66A] animate-in fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Persona Switcher & Cart */}
            <div className="flex items-center gap-3">
              {/* Persona / Role Quick Switcher Pill (Crucial for testing all 3 panels) */}
              <div className="relative">
                <button
                  onClick={() => setPersonaMenuOpen(!personaMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#20271E] border border-[#C7A66A]/30 text-xs text-[#E9DFCE] hover:border-[#C7A66A] transition-colors"
                  title="Changer d'espace (Client / Admin / Revendeur)"
                >
                  {role === "admin" && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
                  {role === "reseller" && <Briefcase className="w-3.5 h-3.5 text-emerald-400" />}
                  {role === "customer" && <UserCheck className="w-3.5 h-3.5 text-[#C7A66A]" />}
                  <span className="hidden sm:inline font-medium capitalize">
                    {role === "customer" ? "Client" : role === "reseller" ? "Revendeur" : "Admin"}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#89877F]" />
                </button>

                {personaMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#171715] border border-[#C7A66A]/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="text-[10px] uppercase tracking-wider text-[#89877F] px-2 py-1 font-semibold">
                      Changer d&apos;espace de test
                    </div>

                    <button
                      onClick={() => {
                        loginAs("customer");
                        setPersonaMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors",
                        role === "customer"
                          ? "bg-[#C7A66A]/20 text-[#C7A66A] font-medium"
                          : "text-[#E9DFCE] hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-3.5 h-3.5 text-[#C7A66A]" />
                        <span>Espace Client (Elyes)</span>
                      </div>
                      <span className="text-[10px] text-[#C7A66A]">{luckBalance} Luck</span>
                    </button>

                    <Link
                      href="/reseller"
                      onClick={() => {
                        loginAs("reseller");
                        setPersonaMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors",
                        role === "reseller"
                          ? "bg-[#C7A66A]/20 text-[#C7A66A] font-medium"
                          : "text-[#E9DFCE] hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Espace Revendeur (Amira)</span>
                      </div>
                      <span className="text-[10px] text-emerald-400">Master</span>
                    </Link>

                    <Link
                      href="/admin"
                      onClick={() => {
                        loginAs("admin");
                        setPersonaMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors",
                        role === "admin"
                          ? "bg-[#C7A66A]/20 text-[#C7A66A] font-medium"
                          : "text-[#E9DFCE] hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Espace Administration</span>
                      </div>
                      <span className="text-[10px] text-amber-400">DG</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#20271E] border border-[#C7A66A]/30 text-[#E9DFCE] hover:text-[#C7A66A] hover:border-[#C7A66A] transition-all"
                aria-label="Ouvrir le panier"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-[10px] font-bold flex items-center justify-center shadow-md animate-in zoom-in">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-[#171715] border-r border-[#C7A66A]/20 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#C7A66A]/15">
                <LevaniaLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#89877F] hover:text-[#F6F1E8]"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm tracking-wider uppercase text-[#E9DFCE] hover:text-[#C7A66A] py-2 flex items-center justify-between border-b border-white/5"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#542B32] text-rose-200">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#C7A66A]/15 space-y-3">
                <p className="text-xs text-[#89877F] uppercase tracking-widest font-semibold">
                  Accès Espaces Dédiés
                </p>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#20271E] border border-amber-400/30 text-amber-200 text-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Panneau d&apos;Administration</span>
                </Link>
                <Link
                  href="/reseller"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#20271E] border border-emerald-400/30 text-emerald-200 text-xs"
                >
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>Portail Revendeur (Rangs & Ventes)</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-[#C7A66A]/10 text-xs text-[#89877F] text-center">
              LÉVANIA PARFUMS &bull; Haute Parfumerie Tunisienne
            </div>
          </div>
        </div>
      )}
    </>
  );
}
