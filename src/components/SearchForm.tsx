"use client";

import { useState } from "react";

interface SearchFormProps {
  onSearch: (filters: {
    location: string;
    type: string;
    mode: string;
    maxPrice: string;
  }) => void;
  loading: boolean;
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    mode: "",
    maxPrice: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
      <input
        type="text"
        name="location"
        placeholder="Ubicación (Ej: Betania)"
        className="border p-2 rounded"
        onChange={handleChange}
        value={filters.location}
      />
      <input
        type="text"
        name="type"
        placeholder="Tipo (Ej: Apartamento, Casa)"
        className="border p-2 rounded"
        onChange={handleChange}
        value={filters.type}
      />
      <input
        type="text"
        name="mode"
        placeholder="Modalidad (Ej: Alquiler, Venta)"
        className="border p-2 rounded"
        onChange={handleChange}
        value={filters.mode}
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Precio Máximo"
        className="border p-2 rounded"
        onChange={handleChange}
        value={filters.maxPrice}
      />
      <div className="col-span-2 text-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>
    </form>
  );
}
