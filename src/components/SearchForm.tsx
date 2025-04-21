"use client";

import { useState } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "1rem" }}>
      <input
        type="text"
        placeholder="Buscar"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: "1",
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#2563eb",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          cursor: "pointer",
          border: "none",
        }}
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
