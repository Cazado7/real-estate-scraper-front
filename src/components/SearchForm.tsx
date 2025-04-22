"use client";

import React, { useState } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar en Google..."
        style={{ padding: "0.5rem", width: "300px" }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          marginLeft: "0.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#2563eb",
          color: "#fff",
          borderRadius: "4px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
