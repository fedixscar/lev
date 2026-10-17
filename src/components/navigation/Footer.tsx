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
    <footer className="bg-[#2A0B12] border-t border-[#C7A66A]/30 pt-16 pb-12 text-[#FAF7F2] relative overflow-hidden">
      {/* Decorative ambient subtle wave in footer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#541B28] via-[#C7A66A] to-[#852538] opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#C7A66A]/20">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <LevaniaLogo size="lg" />
            <p className="text-sm text-[#D5C4C7] leading-relaxed max-w-sm mt-3">
              Maison de haute parfumerie artisanale. Une onde olfactive singulière, façonnée entre noblesse méditerranéenne et accords d&apos;exception. Découvrez le parfum qui bouge avec vous.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-widest text-[#DFC68B] font-semibold mb-2">
                Le Cercle Privilège Lévania
              </h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-amber-200 bg-amber-950/60 p-2.5 rounded-lg border border-[#C7A66A]/40">
                  <Check className="w-4 h-4 text-[#DFC68B]" />
                  <span>Bienvenue dans notre cercle. Votre code de bienvenue exclusif a été envoyé.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Votre adresse email privée..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#3B121C] border border-[#C7A66A]/30 rounded-lg px-3.5 py-2 text-xs text-[#FAF7F2] placeholder:text-[#C4B2B6] focus:outline-none focus:border-[#C7A66A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#C7A66A] to-[#DFC68B] text-[#2A0B12] text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md"
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
            <h4 className="text-xs font-serif uppercase tracking-widest text-[#DFC68B] font-semibold">
              Créations & Univers
            </h4>
            <ul className="space-y-2 text-xs text-[#D5C4C7]">
              <li>
                <Link href="/shop" className="hover:text-[#DFC68B] transition-colors">
                  Toutes les Fragrances
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-[#DFC68B] transition-colors">
                  Les 3 Collections
                </Link>
              </li>
              <li>
                <Link href="/discover" className="hover:text-[#DFC68B] transition-colors flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#DFC68B]" />
                  <span>Diagnostic Parfum IA</span>
                </Link>
              </li>
              <li>
                <Link href="/compose-box" className="hover:text-[#DFC68B] transition-colors">
                  Composer Mon Coffret
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="hover:text-[#DFC68B] transition-colors">
                  Offres & Coffrets du Mois
                </Link>
              </li>
              <li>
                <Link href="/mystery-box" className="hover:text-[#DFC68B] transition-colors">
                  Mystery Box Prestige
                </Link>
              </li>
            </ul>
          </div>

          {/* Privileges & Loyalty */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif uppercase tracking-widest text-[#DFC68B] font-semibold">
              Privilèges & Destin
            </h4>
            <ul className="space-y-2 text-xs text-[#D5C4C7]">
              <li>
                <Link href="/account/luck" className="hover:text-[#DFC68B] transition-colors">
                  La Roue du Destin (Vagues)
                </Link>
              </li>
              <li>
                <Link href="/account/loyalty" className="hover:text-[#DFC68B] transition-colors">
                  Programme Fidélité & Points
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#DFC68B] transition-colors">
                  Parrainage d&apos;Amis (50% Points)
                </Link>
              </li>
              <li>
                <Link href="/p/sample-token" className="hover:text-[#DFC68B] transition-colors">
                  Certificat Flacon QR
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Pro Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif uppercase tracking-widest text-[#DFC68B] font-semibold">
              Espaces Professionnels
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D5C4C7]">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B121C] border border-[#C7A66A]/30 text-[#FAF7F2] hover:border-[#C7A66A] transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DFC68B]" />
                  <span>Administration Centrale</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/reseller"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3B121C] border border-[#C7A66A]/30 text-[#FAF7F2] hover:border-[#C7A66A] transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#DFC68B]" />
                  <span>Réseau Revendeurs (6 Rangs)</span>
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-[#D5C4C7]">
                Service Clientèle:
                <br />
                <span className="text-[#FAF7F2] font-semibold">+216 71 800 900</span> (Tunisie)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D5C4C7] gap-4">
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
