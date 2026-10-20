"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { SignatureWave } from "@/components/brand/SignatureWave";
import { WaveMonogram } from "@/components/brand/WaveMonogram";
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
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2]">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Certificate Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#541B28]/25 text-[#541B28] text-xs font-bold mb-3 shadow-sm">
              <WaveMonogram size="xs" variant="gold" />
              <span>Flacon Authentifié & Scellé Lévania</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-burgundy-gradient font-light">
              Certificat Numérique d&apos;Authenticité
            </h1>
            <p className="text-xs text-[#756B6D] mt-1 font-mono">
              Jeton : {token} • {serialNumber}
            </p>
          </div>

          {/* Liquid Wave Reveal of the Bottle */}
          <div className="rounded-3xl bg-white border-2 border-[#541B28] p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-8">
            <div className="h-28 overflow-hidden rounded-2xl mb-6 bg-[#FAF7F2] border border-[#541B28]/15">
              <SignatureWave expression="signature" intensity="normal" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#541B28]/20 shadow-sm">
                <Image
                  src={product.images.main}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-3">
                <span className="text-[10px] uppercase tracking-widest text-[#541B28] font-bold">
                  {product.collection}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#23181A] font-semibold">
                  {product.name}
                </h2>
                <p className="text-xs text-[#756B6D] italic">{product.subtitle}</p>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#541B28]/15 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#756B6D]">N° de Série Flacon :</span>
                    <span className="font-mono text-[#23181A] font-bold">{serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#756B6D]">Code Lot de Fabrication :</span>
                    <span className="font-mono text-[#541B28] font-bold">{batchCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#756B6D]">Mise en Flacon :</span>
                    <span className="text-[#23181A]">{bottlingDate}</span>
                  </div>
                </div>

                <div className="text-xs text-[#434B36] flex items-center gap-1.5 pt-1 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sceau monogrammé bordeaux et or validé par le laboratoire.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scent Notes & Guidance */}
          <div className="rounded-3xl bg-white border border-[#541B28]/15 p-6 sm:p-8 shadow-sm mb-8 space-y-4">
            <h3 className="font-serif text-xl text-[#23181A] font-semibold">Conseils d&apos;Application & Diffusion</h3>
            <p className="text-xs text-[#5A4B4E] leading-relaxed">
              Pour sublimer le sillage d&apos;Onde d&apos;Or, vaporisez à 15 cm sur les points de pulsation : creux du cou, poignets et derrière les oreilles. Ne frottez pas le parfum pour préserver la délicatesse des molécules de tête de bergamote et safran.
            </p>

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-[#541B28] font-bold block mb-2">
                Accords Olfactifs Clés :
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[...product.topNotes, ...product.heartNotes, ...product.baseNotes].map((n, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#541B28]/15 text-[#23181A] font-medium">
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              <span>Découvrir la Fiche Produit Complète</span>
              <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
