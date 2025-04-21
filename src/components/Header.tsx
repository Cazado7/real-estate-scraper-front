"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/(providers)/auth-context";
import Button from "@mui/material/Button";

export const Header: React.FC = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer clic fuera
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
    setUser(null);
    router.push("/login");
  };

  const handleProfileSettings = () => {
    // Lógica para navegar a la página de ajustes de perfil
    router.push("/profile-settings");
  };

  /* Redirige a la página de búsqueda */
  const handleSearchRedirect = () => {
    router.push("/search");
  };

  return (
    <header className="header-container">
      {/* LOGO INSTITUCIONAL */}
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

      {/* MENÚ E ÍCONO DE PERFIL */}
      <div className="menuPerfil flex items-center gap-4">
        {/* BOTÓN DE BÚSQUEDA */}
        <div className="button">
          <Button
            variant="contained"
            size="small"
            onClick={handleSearchRedirect}
          >
            Buscar
          </Button>
        </div>

        {/* Ícono de Usuario */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-200 focus:outline-none"
          >
            {/* Ícono "User" (Heroicon) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-[#8d8e90]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9A3.75 3.75 0 1112 5.25 3.75 3.75 0 0115.75 9zM18 21a6 6 0 00-12 0h12z"
              />
            </svg>
          </button>

          {/* MENÚ DESPLEGABLE */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg animate-fade-in z-50">
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleProfileSettings}
                >
                  Ajustes de Perfil
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
