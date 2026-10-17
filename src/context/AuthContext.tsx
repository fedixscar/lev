"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type UserRole = "customer" | "admin" | "reseller" | "guest";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  resellerRank?: string;
  resellerId?: string;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  role?: UserRole;
}

interface AuthContextType {
  role: UserRole;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  loginAsTestAccount: (role: "admin" | "reseller" | "customer") => void;
}

// Default pre-configured accounts
export const DEFAULT_ACCOUNTS = {
  admin: {
    email: "admin@levania-parfums.com",
    password: "LevaniaAdmin2026!",
    name: "Direction Générale Lévania",
    role: "admin" as UserRole,
    phone: "+216 71 800 900",
  },
  reseller: {
    email: "revendeur@levania-parfums.com",
    password: "LevaniaReseller2026!",
    name: "Amira Khemir (Revendeur)",
    role: "reseller" as UserRole,
    phone: "+216 55 789 012",
    resellerRank: "Master",
    resellerId: "RES-MASTER-77",
  },
  customer: {
    email: "client@levania-parfums.com",
    password: "LevaniaClient2026!",
    name: "Client Privilège Lévania",
    role: "customer" as UserRole,
    phone: "+216 98 123 456",
  },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("guest");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    async function initAuth() {
      try {
        if (isSupabaseConfigured()) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Fetch profile role from database
            const { data: profile } = await supabase
              .from("profiles")
              .select("id, full_name, role, phone")
              .eq("id", session.user.id)
              .single();

            const userRole = (profile?.role as UserRole) || "customer";
            setRole(userRole);
            setUser({
              id: session.user.id,
              name: profile?.full_name || session.user.email?.split("@")[0] || "Client",
              email: session.user.email || "",
              role: userRole,
              phone: profile?.phone,
              avatar: "/brand/logo-emblem.jpg",
            });
            setIsLoading(false);
            return;
          }
        }

        // Check local storage for persistent session
        const savedUserStr = localStorage.getItem("levania_active_user");
        if (savedUserStr) {
          const savedUser = JSON.parse(savedUserStr);
          setUser(savedUser);
          setRole(savedUser.role);
        } else {
          setRole("guest");
          setUser(null);
        }
      } catch {
        setRole("guest");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    initAuth();

    // Listen to Supabase auth state changes if configured
    if (isSupabaseConfigured()) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("id, full_name, role, phone")
            .eq("id", session.user.id)
            .single();

          const userRole = (profile?.role as UserRole) || "customer";
          const activeUser: UserProfile = {
            id: session.user.id,
            name: profile?.full_name || session.user.email?.split("@")[0] || "Client",
            email: session.user.email || "",
            role: userRole,
            phone: profile?.phone,
            avatar: "/brand/logo-emblem.jpg",
          };
          setUser(activeUser);
          setRole(userRole);
          localStorage.setItem("levania_active_user", JSON.stringify(activeUser));
        } else {
          setUser(null);
          setRole("guest");
          localStorage.removeItem("levania_active_user");
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  // Unified Sign In handler
  const signIn = async (emailInput: string, passwordInput: string): Promise<AuthResponse> => {
    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    // 1. Try real Supabase auth if configured
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, full_name, role, phone")
          .eq("id", data.user.id)
          .single();

        const userRole = (profile?.role as UserRole) || "customer";
        const loggedUser: UserProfile = {
          id: data.user.id,
          name: profile?.full_name || email.split("@")[0],
          email,
          role: userRole,
          phone: profile?.phone,
          avatar: "/brand/logo-emblem.jpg",
        };

        setUser(loggedUser);
        setRole(userRole);
        localStorage.setItem("levania_active_user", JSON.stringify(loggedUser));
        return { success: true, role: userRole };
      }
    }

    // 2. Direct recognized credentials check (Admin, Reseller, Customer)
    if (email === DEFAULT_ACCOUNTS.admin.email && password === DEFAULT_ACCOUNTS.admin.password) {
      const adminUser: UserProfile = {
        id: "admin-master-001",
        name: DEFAULT_ACCOUNTS.admin.name,
        email: DEFAULT_ACCOUNTS.admin.email,
        role: "admin",
        phone: DEFAULT_ACCOUNTS.admin.phone,
        avatar: "/brand/logo-emblem.jpg",
      };
      setUser(adminUser);
      setRole("admin");
      localStorage.setItem("levania_active_user", JSON.stringify(adminUser));
      return { success: true, role: "admin" };
    }

    if (
      (email === DEFAULT_ACCOUNTS.reseller.email || email.includes("revendeur") || email.includes("reseller")) &&
      password === DEFAULT_ACCOUNTS.reseller.password
    ) {
      const resellerUser: UserProfile = {
        id: "res-master-001",
        name: DEFAULT_ACCOUNTS.reseller.name,
        email: DEFAULT_ACCOUNTS.reseller.email,
        role: "reseller",
        phone: DEFAULT_ACCOUNTS.reseller.phone,
        resellerRank: "Master",
        resellerId: "RES-MASTER-77",
        avatar: "/brand/logo-emblem.jpg",
      };
      setUser(resellerUser);
      setRole("reseller");
      localStorage.setItem("levania_active_user", JSON.stringify(resellerUser));
      return { success: true, role: "reseller" };
    }

    if (email === DEFAULT_ACCOUNTS.customer.email && password === DEFAULT_ACCOUNTS.customer.password) {
      const customerUser: UserProfile = {
        id: "cust-001",
        name: DEFAULT_ACCOUNTS.customer.name,
        email: DEFAULT_ACCOUNTS.customer.email,
        role: "customer",
        phone: DEFAULT_ACCOUNTS.customer.phone,
        avatar: "/brand/logo-emblem.jpg",
      };
      setUser(customerUser);
      setRole("customer");
      localStorage.setItem("levania_active_user", JSON.stringify(customerUser));
      return { success: true, role: "customer" };
    }

    // Generic customer fallback if valid email and min length
    if (email.includes("@") && password.length >= 6) {
      const genericUser: UserProfile = {
        id: `cust-${Date.now()}`,
        name: email.split("@")[0].replace(".", " "),
        email,
        role: "customer",
        avatar: "/brand/logo-emblem.jpg",
      };
      setUser(genericUser);
      setRole("customer");
      localStorage.setItem("levania_active_user", JSON.stringify(genericUser));
      return { success: true, role: "customer" };
    }

    return {
      success: false,
      message: "Identifiants invalides. Veuillez vérifier votre adresse email et votre mot de passe.",
    };
  };

  // Sign Up handler
  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    phone?: string
  ): Promise<AuthResponse> => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            role: "customer",
          },
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        // Create profile in public.profiles table
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName,
          email,
          phone,
          role: "customer",
        });

        // Initialize wallets
        await supabase.from("luck_wallets").upsert({
          customer_id: data.user.id,
          balance: 0,
          lifetime_earned: 0,
        });

        await supabase.from("loyalty_wallets").upsert({
          customer_id: data.user.id,
          points_balance: 0,
          lifetime_earned: 0,
        });
      }
    }

    // Local state creation
    const newUser: UserProfile = {
      id: `cust-${Date.now()}`,
      name: fullName,
      email,
      role: "customer",
      phone,
      avatar: "/brand/logo-emblem.jpg",
    };

    setUser(newUser);
    setRole("customer");
    localStorage.setItem("levania_active_user", JSON.stringify(newUser));

    return { success: true, role: "customer" };
  };

  // 1-Click Test Account Switcher
  const loginAsTestAccount = (testRole: "admin" | "reseller" | "customer") => {
    const acc = DEFAULT_ACCOUNTS[testRole];
    signIn(acc.email, acc.password);
  };

  // Sign Out
  const signOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setRole("guest");
    localStorage.removeItem("levania_active_user");
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        isAuthenticated: role !== "guest" && user !== null,
        isLoading,
        signIn,
        signUp,
        signOut,
        loginAsTestAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
