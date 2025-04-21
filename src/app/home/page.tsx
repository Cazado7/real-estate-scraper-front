"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <img src="/logo.png" alt="logoEntidad" className="max-width: 1rem;" />
      </div>

      <h1 className="text-4xl font-bold mb-4">Encuentra tu propiedad Ideal</h1>
      <p className="max-w-xl text-center mb-6">
        Buscamos en tiempo real las mejores ofertas de propiedades en distintos
        portales inmobiliarios. Ahorra tiempo y dinero dejando que nuestro
        sistema recopile todo por ti.
      </p>
      <div className="flex space-x-4">
        <Link href="/login">
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Ingresar
          </button>
        </Link>
      </div>
    </main>
  );
}
