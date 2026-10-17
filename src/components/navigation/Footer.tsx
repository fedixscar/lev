"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LevaniaLogo } from "@/components/brand/LevaniaLogo";
import { ArrowRight, Sparkles, Check, ShieldCheck, Briefcase } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#171715] border-t border-[#C7A66A]/20 pt-16 pb-12 text-[#E9DFCE] relative overflow-hidden">
      {/* Decorative ambient subtle wave in footer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#343B2B] via-[#C7A66A] to-[#542B32] opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#C7A66A]/15">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <LevaniaLogo size="lg" />
            <p className="text-sm text-[#89877F] leading-relaxed max-w-sm mt-3">
              Maison de haute parfumerie artisanale. Une onde olfactive singulière, façonnée entre noblesse méditerranéenne et accords d&apos;exception. Découvrez le parfum qui bouge avec vous.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-widest text-[#C7A66A] font-semibold mb-2">
                Le Cercle Privilège Lévania
              </h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/30">
                  <Check className="w-4 h-4" />
                  <span>Bienvenue dans notre cercle. Votre code bienvenue a été envoyé.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email privée..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#20271E] border border-[#C7A66A]/25 rounded-lg px-3.5 py-2 text-xs text-[#F6F1E8] placeholder:text-[#89877F] focus:outline-none focus:border-[#C7A66A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-semibold hover:opacity-95 transition-opacity flex items-center gap-1.5"
                  >
                    <span>Rejoindre</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif uppercase tracking-widest text-[#C7A66A] font-medium">
              Créations & Univers
            </h4>
            <ul className="space-y-2 text-xs text-[#89877F]">
              <li>
                <Link href="/shop" className="hover:text-[#F6F1E8] transition-colors">
                  Toutes les Fragrances
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#F6F1E8] transition-colors">
                  Les 3 Collections
                </Link>
              </li>
              <li>
                <Link href="/discover" className="hover:text-[#C7A66A] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C7A66A]" />
                  <span>Diagnostic Parfum IA</span>
                </Link>
              </li>
              <li>
                <Link href="/compose-box" className="hover:text-[#F6F1E8] transition-colors">
                  Composer Mon Coffret
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="hover:text-[#F6F1E8] transition-colors">
                  Offres & Coffrets du Mois
                </Link>
              </li>
              <li>
                <Link href="/mystery-box" className="hover:text-[#F6F1E8] transition-colors">
                  Mystery Box Prestige
                </Link>
              </li>
            </ul>
          </div>

          {/* Privileges & Loyalty */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif uppercase tracking-widest text-[#C7A66A] font-medium">
              Privilèges & Destin
            </h4>
            <ul className="space-y-2 text-xs text-[#89877F]">
              <li>
                <Link href="/account/luck" className="hover:text-[#C7A66A] transition-colors">
                  La Roue du Destin (Vagues)
                </Link>
              </li>
              <li>
                <Link href="/account/loyalty" className="hover:text-[#F6F1E8] transition-colors">
                  Programme Fidélité & Points
                </Link>
              </li>
              <li>
                <Link href="/account/referrals" className="hover:text-[#F6F1E8] transition-colors">
                  Parrainage d&apos;Amis (50% Points)
                </Link>
              </li>
              <li>
                <Link href="/p/sample-token" className="hover:text-[#F6F1E8] transition-colors">
                  Certificat Flacon QR
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Pro Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif uppercase tracking-widest text-[#C7A66A] font-medium">
              Espaces Professionnels
            </h4>
            <ul className="space-y-2.5 text-xs text-[#89877F]">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20271E] border border-amber-400/20 text-amber-200/90 hover:border-amber-400 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Administration Centrale</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/reseller"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#20271E] border border-emerald-400/20 text-emerald-200/90 hover:border-emerald-400 transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Réseau Revendeurs (6 Rangs)</span>
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-[#89877F]">
                Service Clientèle:
                <br />
                <span className="text-[#E9DFCE]">+216 71 800 900</span> (Tunisie)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#89877F] gap-4">
          <div>
            &copy; 2026 LÉVANIA PARFUMS. Tous droits réservés. Haute Parfumerie.
          </div>
          <div className="flex gap-6">
            <span>Paiement Sécurisé & Livraison en Tunisie</span>
            <span>Mentions Légales</span>
            <span>Confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
