"use client";

import { useState } from "react";
import axios from "axios";
import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";

export default function SearchPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (filters: {
    location: string;
    type: string;
    mode: string;
    maxPrice: string;
  }) => {
    setLoading(true);
    setError("");
    try {
      // Aqui podrías llamar a tu backend Next.js o Node.js:
      // const { data } = await axios.post("/api/scraper", filters);
      // o usar tu backend local: axios.get("http://localhost:3001/scraper?...")

      const baseUrl = "https://www.inmopanama.com";
      let pathParts = [];
      if (filters.mode) pathParts.push(filters.mode.toLowerCase());
      if (filters.type) pathParts.push(filters.type.toLowerCase());
      if (filters.location) pathParts.push(filters.location.toLowerCase());
      const path = pathParts.join("-");

      let url = `${baseUrl}/${path}`;
      if (filters.maxPrice) {
        url += `?f_price=${filters.maxPrice}`;
      }

      const queryParams = new URLSearchParams({
        urls: url,
      }).toString();

      const { data } = await axios.get(
        `http://localhost:3001/scraper?${queryParams}`
      );
      setResults(data);
    } catch (err) {
      setError("Error obteniendo resultados. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          Busca Propiedades
        </h1>

        {/* Formulario de Búsqueda */}
        <SearchForm onSearch={handleSearch} loading={loading} />

        {/* Mensaje de Error */}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        {/* Resultados */}
        <div className="mt-6">
          {loading && <p className="text-center">Cargando resultados...</p>}

          {!loading && results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((property, index) => (
                <PropertyCard key={index} property={property} />
              ))}
            </div>
          ) : (
            !loading && (
              <p className="text-center text-gray-500">
                No se encontraron resultados
              </p>
            )
          )}
        </div>
      </div>
    </main>
  );
}
