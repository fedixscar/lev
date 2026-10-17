"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SignatureWave } from "@/components/brand/SignatureWave";
import { PRODUCTS } from "@/lib/catalogue";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface QRClientProps {
  token: string;
}

export function QRClient({ token }: QRClientProps) {
  // Map to product or default to N°1 Onde d'Or
  const product = PRODUCTS[0]; // Onde d'Or
  const serialNumber = `LEV-FLA-2026-${token.substring(0, 6).toUpperCase() || "7791A"}`;
  const batchCode = "LOT-2026-MEDIT-01";
  const bottlingDate = "Janvier 2026";

  return (
    <div className="min-h-screen flex flex-col bg-[#171715] text-[#F6F1E8]">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Certificate Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Flacon Authentifié & Scellé Lévania</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-gold-gradient font-light">
              Certificat Numérique d&apos;Authenticité
            </h1>
            <p className="text-xs text-[#89877F] mt-1 font-mono">
              Jeton : {token} &bull; {serialNumber}
            </p>
          </div>

          {/* Liquid Wave Reveal of the Bottle */}
          <div className="rounded-3xl bg-[#20271E]/80 border-2 border-[#C7A66A]/40 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden mb-8">
            <div className="h-28 overflow-hidden rounded-2xl mb-6 bg-black/40 border border-[#C7A66A]/20">
              <SignatureWave expression="signature" intensity="normal" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden bg-black/50 border border-[#C7A66A]/30">
                <Image
                  src={product.images.main}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#C7A66A] font-semibold">
                  {product.collection}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F6F1E8]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#89877F] italic">{product.subtitle}</p>

                <div className="p-3 rounded-xl bg-[#171715] border border-white/5 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#89877F]">N° de Série Flacon :</span>
                    <span className="font-mono text-[#F6F1E8] font-semibold">{serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#89877F]">Code Lot de Fabrication :</span>
                    <span className="font-mono text-[#C7A66A]">{batchCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#89877F]">Mise en Flacon :</span>
                    <span className="text-[#F6F1E8]">{bottlingDate}</span>
                  </div>
                </div>

                <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sceau monogrammé bordeaux et or validé par le laboratoire.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scent Notes & Guidance */}
          <div className="rounded-3xl bg-[#20271E]/50 border border-[#C7A66A]/20 p-6 sm:p-8 backdrop-blur-xl mb-8 space-y-4">
            <h3 className="font-serif text-xl text-[#F6F1E8]">Conseils d&apos;Application & Diffusion</h3>
            <p className="text-xs text-[#E9DFCE]/80 leading-relaxed">
              Pour sublimer le sillage d&apos;Onde d&apos;Or, vaporisez à 15 cm sur les points de pulsation : creux du cou, poignets et derrière les oreilles. Ne frottez pas le parfum pour préserver la délicatesse des molécules de tête de bergamote et safran.
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-[#C7A66A] font-semibold block mb-2">
                Accords Olfactifs Clés :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[...product.topNotes, ...product.heartNotes, ...product.baseNotes].map((n, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[#171715] border border-[#C7A66A]/20 text-[#E9DFCE]">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Shop Action */}
          <div className="text-center">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C7A66A] to-[#9E7D42] text-[#171715] text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg"
            >
              <span>Découvrir la Fiche Produit Complète</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
