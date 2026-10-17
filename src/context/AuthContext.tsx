"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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

interface AuthContextType {
  role: UserRole;
  user: UserProfile | null;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const DEMO_USERS: Record<Exclude<UserRole, "guest">, UserProfile> = {
  customer: {
    id: "cust-001",
    name: "Elyes Ben Amor",
    email: "elyes.benamor@gmail.com",
    phone: "+216 98 123 456",
    role: "customer",
    avatar: "/brand/logo-emblem.jpg",
  },
  admin: {
    id: "admin-001",
    name: "Direction Générale — Lévania",
    email: "direction@levania-parfums.com",
    role: "admin",
    avatar: "/brand/logo-emblem.jpg",
  },
  reseller: {
    id: "res-001",
    name: "Amira Khemir",
    email: "amira.reseller@levania.com",
    phone: "+216 55 789 012",
    role: "reseller",
    resellerRank: "Master",
    resellerId: "RES-MASTER-77",
    avatar: "/brand/logo-emblem.jpg",
  },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("customer");
  const [user, setUser] = useState<UserProfile | null>(DEMO_USERS.customer);

  useEffect(() => {
    try {
      const storedRole = localStorage.getItem("levania_auth_role") as UserRole;
      if (storedRole && storedRole in DEMO_USERS) {
        setRole(storedRole);
        setUser(DEMO_USERS[storedRole as Exclude<UserRole, "guest">]);
      } else if (storedRole === "guest") {
        setRole("guest");
        setUser(null);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const loginAs = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === "guest") {
      setUser(null);
      localStorage.setItem("levania_auth_role", "guest");
    } else {
      setUser(DEMO_USERS[newRole]);
      localStorage.setItem("levania_auth_role", newRole);
    }
  };

  const logout = () => {
    loginAs("guest");
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        loginAs,
        logout,
        isAuthenticated: role !== "guest",
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
