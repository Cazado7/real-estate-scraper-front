"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/(providers)/auth-context";

export const Header: React.FC = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* cierra el menú al hacer clic fuera */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null); // limpia el contexto
    router.push("/login"); // redirige al login
  };

  return (
    <header className="flex items-center justify-between flex-wrap bg-[#005ba6] h-[4.6rem] px-1">
      {/* logo institucional */}
      <Link href="/dashboard">
        <div className="logoEntidad1">
          <Image
            src="/logo.png"
            alt="Home"
            width={130}
            height={60}
            className="logo"
            priority
          />
        </div>
      </Link>
    </header>
  );
};
