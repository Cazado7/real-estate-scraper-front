"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Aquí validarías el token o sesión
    // if (!checkIfUserIsLogged()) {
    //   router.push("/login");
    // } else {
    //   setIsLoggedIn(true);
    // }
    setIsLoggedIn(true); // Ejemplo
  }, [router]);

  if (!isLoggedIn) {
    return <p>Verificando sesión...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">
        Bienvenido a tu panel de control. Aquí podrías ver:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Historial de búsquedas</li>
        <li>Propiedades guardadas como “favoritas”</li>
        <li>Estadísticas de uso</li>
      </ul>
      {/* Agrega tu lógica para mostrar datos guardados, etc. */}
    </main>
  );
}
