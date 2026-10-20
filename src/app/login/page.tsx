"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { LevaniaLogo } from "@/components/brand/LevaniaLogo";
import { AmbientWaveBackdrop } from "@/components/brand/AmbientWaveBackdrop";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import {
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const { signIn, signUp, isAuthenticated, user, role } = useAuth();
  const { showToast } = useNotification();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, show current session status
  const handleRedirectAfterLogin = (userRole: string) => {
    if (redirectUrl) {
      router.push(redirectUrl);
      return;
    }
    if (userRole === "admin") {
      router.push("/admin");
    } else if (userRole === "reseller") {
      router.push("/reseller");
    } else {
      router.push("/account");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === "signin") {
        const res = await signIn(email, password);
        if (res.success && res.role) {
          showToast(
            "Connexion Réussie",
            `Bienvenue dans votre espace (${res.role === "admin" ? "Direction" : res.role === "reseller" ? "Revendeur" : "Client"})`,
            "luxury"
          );
          handleRedirectAfterLogin(res.role);
        } else {
          setErrorMessage(res.message || "Email ou mot de passe incorrect.");
        }
      } else {
        const res = await signUp(email, password, fullName, phone);
        if (res.success) {
          showToast("Compte Créé avec Succès", "Bienvenue chez Lévania Parfums", "luxury");
          router.push("/account");
        } else {
          setErrorMessage(res.message || "Erreur lors de la création du compte.");
        }
      }
    } catch {
      setErrorMessage("Une erreur imprévue est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#23181A] selection:bg-[#541B28] selection:text-[#FAF7F2] relative overflow-x-hidden">
      <AmbientWaveBackdrop expression="signature" opacity={0.22} />
      <Navbar />

      <main className="flex-1 pt-36 sm:pt-44 pb-28 sm:pb-36 flex items-center justify-center relative z-10">
        <div className="max-w-md w-full mx-auto px-4 sm:px-6">
          {/* Card Container */}
          <div className="rounded-3xl bg-white border border-[#541B28]/20 p-8 sm:p-10 shadow-2xl relative">
            {/* Top Logo Monogram */}
            <div className="flex flex-col items-center text-center mb-6">
              <LevaniaLogo size="md" />
              <h1 className="font-serif text-2xl sm:text-3xl text-burgundy-gradient font-light mt-4">
                {mode === "signin" ? "Connexion à Votre Espace" : "Créer Votre Compte Lévania"}
              </h1>
              <p className="text-xs text-[#756B6D] mt-1">
                Portail d&apos;authentification unifié (Client, Revendeur, Administration).
              </p>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-medium text-center">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <>
                  <div>
                    <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                      Nom & Prénom
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#756B6D]" />
                      <input
                        type="text"
                        required
                        placeholder="Ex: Yasmine Mansour"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#23181A] placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                      Téléphone (Tunisie)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#756B6D]" />
                      <input
                        type="tel"
                        placeholder="+216 XX XXX XXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#23181A] placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Adresse Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#756B6D]" />
                  <input
                    type="email"
                    required
                    placeholder="votre.email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#23181A] placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#756B6D] uppercase tracking-wider block mb-1 font-bold">
                  Mot de Passe
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#756B6D]" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#541B28]/20 rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#23181A] placeholder:text-[#756B6D] focus:outline-none focus:border-[#541B28]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#541B28] hover:bg-[#66182C] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#541B28]/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>{isSubmitting ? "Authentification..." : mode === "signin" ? "Accéder à Mon Espace" : "Créer Mon Compte"}</span>
                <ArrowRight className="w-4 h-4 text-[#DFC68B]" />
              </button>
            </form>

            {/* Toggle Signin / Signup */}
            <div className="mt-6 text-center text-xs text-[#756B6D]">
              {mode === "signin" ? (
                <>
                  Pas encore de compte ?{" "}
                  <button
                    onClick={() => {
                      setMode("signup");
                      setErrorMessage(null);
                    }}
                    className="text-[#541B28] font-bold hover:underline"
                  >
                    S&apos;inscrire gratuitement
                  </button>
                </>
              ) : (
                <>
                  Déjà membre Lévania ?{" "}
                  <button
                    onClick={() => {
                      setMode("signin");
                      setErrorMessage(null);
                    }}
                    className="text-[#541B28] font-bold hover:underline"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>

            {/* Security Guarantee Notice */}
            <div className="mt-8 pt-6 border-t border-[#541B28]/15 text-center">
              <span className="font-cinzel text-[10px] uppercase tracking-luxury text-[#756B6D] font-bold block">
                Session Chiffrée &bull; Haute Parfumerie Lévania
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
          <div className="w-8 h-8 border-2 border-[#541B28] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
