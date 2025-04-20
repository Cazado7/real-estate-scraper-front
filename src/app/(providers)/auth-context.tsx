"use client";
import React, { createContext, useContext, useState } from "react";

export type User = {
  id: string;
  email: string;
  fullName: string;
  entity: string;
};

type AuthCtx = { user: User | null; setUser: (u: User | null) => void };

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
